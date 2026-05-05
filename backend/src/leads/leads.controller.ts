import { Controller, Post, Get, Put, Delete, Body, Query, Param } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadDocument } from './lead.schema';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() body: Partial<LeadDocument>) {
    return this.leadsService.create(body);
  }

  @Get()
  findAll(@Query() query: Record<string, unknown>) {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<LeadDocument>) {
    return this.leadsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadsService.delete(id);
  }
}
