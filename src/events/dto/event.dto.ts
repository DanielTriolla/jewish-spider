import { IsEnum, isEnum, IsOptional, IsString } from 'class-validator';

export enum EventPrice {
  FREE = 'free',
  PAID = 'paid',
}

export enum EventDate {
  THIS_MONTH = 'events--this-month',
  NEXT_MONTH = 'events--next-month',
  ALL_TIME = 'events--all-time',
}

export class GetEventsDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  @IsEnum(EventPrice)
  price?: string;

  @IsOptional()
  @IsString()
  @IsEnum(EventDate)
  date?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
