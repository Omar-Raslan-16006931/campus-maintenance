import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRequestDto } from './dto/create-request.dto';
import { MaintenanceRequestResponseDto } from './dto/maintenance-request-response.dto';
import { RequestsService } from './requests.service';
import { MaintenanceRequestDocument } from './schemas/maintenance-request.schema';

@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @ApiCreatedResponse({ type: MaintenanceRequestResponseDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() dto: CreateRequestDto): Promise<MaintenanceRequestDocument> {
    return this.requestsService.create(dto);
  }
}
