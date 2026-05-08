import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LeadsService } from './leads.service';
import { LeadDocument } from './lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@UseGuards(JwtAuthGuard)
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() body: CreateLeadDto) {
    return this.leadsService.create(body as Partial<LeadDocument>);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateLeadDto) {
    return this.leadsService.update(id, body as Partial<LeadDocument>);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadsService.delete(id);
  }
}
