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

@UseGuards(JwtAuthGuard)
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
