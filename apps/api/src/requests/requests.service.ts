import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { RequestCategory } from './request.constants';
import { CreateRequestDto } from './dto/create-request.dto';
import {
  MaintenanceRequest,
  MaintenanceRequestDocument,
} from './schemas/maintenance-request.schema';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(MaintenanceRequest.name)
    private readonly requestModel: Model<MaintenanceRequest>,
  ) {}

  /** Creates a request. Status is always set by the backend. */
  async create(dto: CreateRequestDto): Promise<MaintenanceRequestDocument> {
    return this.requestModel.create({
      title: dto.title,
      description: dto.description,
      location: dto.location,
      category: dto.category,
      status: 'open',
    });
  }

  /** Lists requests newest first, optionally filtered by category. */
  async findAll(
    category?: RequestCategory,
  ): Promise<MaintenanceRequestDocument[]> {
    const filter = category ? { category } : {};
    return this.requestModel.find(filter).sort({ createdAt: -1 }).exec();
  }
}
