import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RequestsService } from './requests.service';
import { MaintenanceRequest } from './schemas/maintenance-request.schema';
import { CreateRequestDto } from './dto/create-request.dto';

describe('RequestsService', () => {
  let service: RequestsService;
  const model = {
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        RequestsService,
        { provide: getModelToken(MaintenanceRequest.name), useValue: model },
      ],
    }).compile();
    service = moduleRef.get(RequestsService);
  });

  describe('create', () => {
    const dto: CreateRequestDto = {
      title: 'Broken projector',
      description: 'Does not turn on',
      location: 'C3.201',
      category: 'equipment',
    };

    it('stores the request with status open', async () => {
      model.create.mockResolvedValue({ _id: '1', ...dto, status: 'open' });

      const created = await service.create(dto);

      expect(model.create).toHaveBeenCalledWith({ ...dto, status: 'open' });
      expect(created.status).toBe('open');
    });

    it('never forwards a client-supplied status', async () => {
      const sneaky = { ...dto, status: 'resolved' } as CreateRequestDto;
      model.create.mockResolvedValue({});

      await service.create(sneaky);

      expect(model.create).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'open' }),
      );
    });

    it('propagates database errors', async () => {
      model.create.mockRejectedValue(new Error('db down'));
      await expect(service.create(dto)).rejects.toThrow('db down');
    });
  });

  describe('findAll', () => {
    function mockFind(result: unknown[]) {
      const exec = jest.fn().mockResolvedValue(result);
      const sort = jest.fn().mockReturnValue({ exec });
      model.find.mockReturnValue({ sort });
      return { sort, exec };
    }

    it('returns all requests newest first when no category is given', async () => {
      const { sort } = mockFind([{ title: 'a' }, { title: 'b' }]);

      const result = await service.findAll();

      expect(model.find).toHaveBeenCalledWith({});
      expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(result).toHaveLength(2);
    });

    it('filters by category', async () => {
      mockFind([{ title: 'sparks', category: 'electrical' }]);

      const result = await service.findAll('electrical');

      expect(model.find).toHaveBeenCalledWith({ category: 'electrical' });
      expect(result[0].category).toBe('electrical');
    });

    it('returns an empty list when nothing matches', async () => {
      mockFind([]);
      await expect(service.findAll('plumbing')).resolves.toEqual([]);
    });
  });

  describe('resolve', () => {
    const id = '66f5a1c2e4b0a1b2c3d4e5f6';

    it('sets status to resolved and returns the updated request', async () => {
      const exec = jest.fn().mockResolvedValue({ _id: id, status: 'resolved' });
      model.findByIdAndUpdate.mockReturnValue({ exec });

      const result = await service.resolve(id);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        { status: 'resolved' },
        expect.objectContaining({ returnDocument: 'after' }),
      );
      expect(result.status).toBe('resolved');
    });

    it('throws NotFoundException when the request does not exist', async () => {
      model.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.resolve(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
