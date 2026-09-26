import { ApiProperty } from '@nestjs/swagger';
import {
  REQUEST_CATEGORIES,
  REQUEST_STATUSES,
  type RequestCategory,
  type RequestStatus,
} from '../request.constants';

/** Shape returned by the API for a maintenance request (Swagger contract). */
export class MaintenanceRequestResponseDto {
  @ApiProperty({ example: '66f5a1c2e4b0a1b2c3d4e5f6' })
  _id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  location: string;

  @ApiProperty({ enum: REQUEST_CATEGORIES, enumName: 'RequestCategory' })
  category: RequestCategory;

  @ApiProperty({ enum: REQUEST_STATUSES, enumName: 'RequestStatus' })
  status: RequestStatus;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: Date;
}
