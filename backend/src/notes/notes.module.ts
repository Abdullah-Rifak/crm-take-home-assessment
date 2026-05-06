import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NoteSchema } from './note.schema';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
})
export class NotesModule {}
