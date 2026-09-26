import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class RequestIdParamDto {
  @ApiProperty({ example: '66f5a1c2e4b0a1b2c3d4e5f6' })
  @IsMongoId({ message: 'id must be a valid request id' })
  id: string;
}
