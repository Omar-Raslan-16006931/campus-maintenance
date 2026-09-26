import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RequestsService } from './requests.service';
import { MaintenanceRequest } from './schemas/maintenance-request.schema';
import { CreateRequestDto } from './dto/create-request.dto';

describe('RequestsService', () => {
  let service: RequestsService;
  const model = {
    create: jest.fn(),
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
});
