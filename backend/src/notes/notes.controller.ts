import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body: any) {
    return this.notesService.create(body);
  }

  @Get(':leadId')
  getNotes(@Param('leadId') leadId: string) {
    return this.notesService.findByLead(leadId);
  }
}
