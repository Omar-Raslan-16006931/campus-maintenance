import { ApiProperty } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { REQUEST_CATEGORIES, type RequestCategory } from '../request.constants';

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

/**
 * Input for POST /requests.
 * `status` is intentionally absent: the backend always starts requests as `open`,
 * and the global ValidationPipe (forbidNonWhitelisted) rejects unknown fields.
 */
export class CreateRequestDto {
  @ApiProperty({ example: 'Broken projector', maxLength: 120 })
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @ApiProperty({
    example: 'The projector in C3.201 does not turn on.',
    maxLength: 2000,
  })
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @ApiProperty({ example: 'Building C, room 3.201', maxLength: 120 })
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  location: string;

  @ApiProperty({ enum: REQUEST_CATEGORIES, enumName: 'RequestCategory' })
  @IsIn(REQUEST_CATEGORIES, {
    message: `category must be one of: ${REQUEST_CATEGORIES.join(', ')}`,
  })
  category: RequestCategory;
}
