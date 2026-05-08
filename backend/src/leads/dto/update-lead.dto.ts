import { IsEmail, IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateLeadDto {
  @IsString()
  @IsOptional()
  leadName?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;

  @IsString()
  @IsOptional()
  @IsIn(['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'])
  status?: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost';

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  dealValue?: number;
}
