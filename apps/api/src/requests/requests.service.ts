import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
