import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  leadName: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  assignedTo: string;

  @IsString()
  @IsIn(['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'])
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost';

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  dealValue: number;
}
