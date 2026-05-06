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

  findAll(query: {
    status?: string;
    source?: string;
    assignedTo?: string;
    search?: string;
  }) {
    const filter: Record<string, any> = {};
    //Filter
    if (query.status) filter.status = query.status;
    if (query.source) filter.source = query.source;
    if (query.assignedTo) filter.assignedTo = query.assignedTo;   

    //Searcching
    if (typeof query.search === 'string' && query.search.length > 0) {
      filter.$or = [
        { leadName: { $regex: query.search, $options: 'i' } },
        { companyName: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
      ];
    }
    return this.leadModel.find(filter).sort({ createdAt: -1 });
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
