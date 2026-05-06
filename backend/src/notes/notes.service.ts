import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<any>) {}

  create(data: any) {
    return this.noteModel.create(data);
  }

  findByLead(leadId: string) {
    return this.noteModel.find({ leadId }).sort({ createdAt: -1 });
  }
}
