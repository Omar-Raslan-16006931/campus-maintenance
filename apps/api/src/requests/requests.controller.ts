import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRequestDto } from './dto/create-request.dto';
import { ListRequestsQueryDto } from './dto/list-requests-query.dto';
import { RequestIdParamDto } from './dto/request-id-param.dto';
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

  @Get()
  @ApiOkResponse({ type: [MaintenanceRequestResponseDto] })
  @ApiBadRequestResponse({ description: 'Unsupported category' })
  findAll(
    @Query() query: ListRequestsQueryDto,
  ): Promise<MaintenanceRequestDocument[]> {
    return this.requestsService.findAll(query.category);
  }

  @Patch(':id/resolve')
  @ApiOkResponse({ type: MaintenanceRequestResponseDto })
  @ApiBadRequestResponse({ description: 'Malformed id' })
  @ApiNotFoundResponse({ description: 'Request not found' })
  resolve(
    @Param() params: RequestIdParamDto,
  ): Promise<MaintenanceRequestDocument> {
    return this.requestsService.resolve(params.id);
  }
}
