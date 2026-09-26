import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { setupApp } from '../setup-app';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

/** HTTP-level tests: real controller + global ValidationPipe, mocked service. */
describe('RequestsController (HTTP)', () => {
  let app: INestApplication<App>;
  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const valid = {
    title: 'Broken projector',
    description: 'Does not turn on',
    location: 'C3.201',
    category: 'equipment',
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [{ provide: RequestsService, useValue: service }],
    }).compile();
    app = moduleRef.createNestApplication();
    setupApp(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /requests', () => {
    it('creates a request (201)', async () => {
      service.create.mockResolvedValue({
        _id: 'abc',
        ...valid,
        status: 'open',
      });

      const res = await request(app.getHttpServer())
        .post('/requests')
        .send(valid)
        .expect(201);

      expect(res.body).toMatchObject({ status: 'open', title: valid.title });
      expect(service.create).toHaveBeenCalledWith(valid);
    });

    it('trims whitespace before saving', async () => {
      service.create.mockResolvedValue({});
      await request(app.getHttpServer())
        .post('/requests')
        .send({ ...valid, title: '  Leaking tap  ' })
        .expect(201);
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Leaking tap' }),
      );
    });

    it('returns 400 when title is missing', async () => {
      const { title: _omit, ...noTitle } = valid;
      void _omit;
      const res = await request(app.getHttpServer())
        .post('/requests')
        .send(noTitle)
        .expect(400);
      expect(JSON.stringify(res.body)).toContain('title');
      expect(service.create).not.toHaveBeenCalled();
    });

    it('returns 400 when title is only whitespace', async () => {
      await request(app.getHttpServer())
        .post('/requests')
        .send({ ...valid, title: '   ' })
        .expect(400);
    });

    it('returns 400 for an invalid category', async () => {
      const res = await request(app.getHttpServer())
        .post('/requests')
        .send({ ...valid, category: 'spaceship' })
        .expect(400);
      expect(JSON.stringify(res.body)).toContain('category must be one of');
    });

    it.each(['description', 'location', 'category'])(
      'returns 400 when %s is missing',
      async (field) => {
        await request(app.getHttpServer())
          .post('/requests')
          .send({ ...valid, [field]: undefined })
          .expect(400);
      },
    );

    it('returns 400 when the client tries to set status', async () => {
      await request(app.getHttpServer())
        .post('/requests')
        .send({ ...valid, status: 'resolved' })
        .expect(400);
      expect(service.create).not.toHaveBeenCalled();
    });

    it('returns 400 for unknown properties', async () => {
      await request(app.getHttpServer())
        .post('/requests')
        .send({ ...valid, priority: 'high' })
        .expect(400);
    });
  });

  describe('GET /requests', () => {
    it('lists all requests (200)', async () => {
      service.findAll.mockResolvedValue([{ ...valid, status: 'open' }]);

      const res = await request(app.getHttpServer())
        .get('/requests')
        .expect(200);

      expect(res.body).toHaveLength(1);
      expect(service.findAll).toHaveBeenCalledWith(undefined);
    });

    it('passes a valid category filter to the service', async () => {
      service.findAll.mockResolvedValue([]);

      await request(app.getHttpServer())
        .get('/requests?category=electrical')
        .expect(200);

      expect(service.findAll).toHaveBeenCalledWith('electrical');
    });

    it('returns 400 for an unsupported category', async () => {
      await request(app.getHttpServer())
        .get('/requests?category=spaceship')
        .expect(400);
      expect(service.findAll).not.toHaveBeenCalled();
    });

    it('returns 400 for unknown query parameters', async () => {
      await request(app.getHttpServer())
        .get('/requests?status=open')
        .expect(400);
    });
  });
});
