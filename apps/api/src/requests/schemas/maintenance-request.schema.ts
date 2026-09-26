import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  REQUEST_CATEGORIES,
  REQUEST_STATUSES,
  type RequestCategory,
  type RequestStatus,
} from '../request.constants';

export type MaintenanceRequestDocument = HydratedDocument<MaintenanceRequest>;

@Schema({ timestamps: true, versionKey: false })
export class MaintenanceRequest {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  location: string;

  @Prop({ required: true, enum: REQUEST_CATEGORIES, type: String })
  category: RequestCategory;

  @Prop({
    required: true,
    enum: REQUEST_STATUSES,
    type: String,
    default: 'open',
  })
  status: RequestStatus;

  createdAt: Date;
  updatedAt: Date;
}

export const MaintenanceRequestSchema =
  SchemaFactory.createForClass(MaintenanceRequest);
