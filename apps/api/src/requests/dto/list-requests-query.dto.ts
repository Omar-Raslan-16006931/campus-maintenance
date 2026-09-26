import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { REQUEST_CATEGORIES, type RequestCategory } from '../request.constants';

/** Query for GET /requests. Without `category`, all requests are returned. */
export class ListRequestsQueryDto {
  @ApiPropertyOptional({
    enum: REQUEST_CATEGORIES,
    enumName: 'RequestCategory',
  })
  @IsOptional()
  @IsIn(REQUEST_CATEGORIES, {
    message: `category must be one of: ${REQUEST_CATEGORIES.join(', ')}`,
  })
  category?: RequestCategory;
}
