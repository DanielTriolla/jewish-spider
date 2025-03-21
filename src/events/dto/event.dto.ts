import { IsOptional, IsString, IsDateString } from 'class-validator';

export class GetEventsDto {
  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;
}
