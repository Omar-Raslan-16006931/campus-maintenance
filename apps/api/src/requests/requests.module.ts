import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MaintenanceRequest,
  MaintenanceRequestSchema,
} from './schemas/maintenance-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MaintenanceRequest.name, schema: MaintenanceRequestSchema },
    ]),
  ],
})
export class RequestsModule {}
