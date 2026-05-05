import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeadDocument } from './lead.schema';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel('Lead') private readonly leadModel: Model<LeadDocument>,
  ) {}

  create(data: Partial<LeadDocument>) {
    return this.leadModel.create(data);
  }

  findAll(query: Record<string, unknown>) {
    return this.leadModel.find(query);
  }

  findOne(id: string) {
    return this.leadModel.findById(id);
  }

  update(id: string, data: Partial<LeadDocument>) {
    return this.leadModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.leadModel.findByIdAndDelete(id);
  }
}
