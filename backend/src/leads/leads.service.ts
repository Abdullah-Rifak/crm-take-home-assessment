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

  async findAll(query: {
    status?: string;
    source?: string;
    assignedTo?: string;
    search?: string;
    page?: string | number;
    limit?: string | number;
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
    // Optional server-side pagination
    const page = query.page ? Number(query.page) : undefined;
    const limit = query.limit ? Number(query.limit) : undefined;

    // if page+limit provided, return { items, total }
    if (page && limit && Number.isFinite(page) && Number.isFinite(limit)) {
      const skip = (Math.max(1, page) - 1) * Math.max(1, limit);
      const [items, total] = await Promise.all([
        this.leadModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Math.max(1, limit)).exec(),
        this.leadModel.countDocuments(filter),
      ]);

      return { items, total };
    }

    // otherwise return full list
    return this.leadModel.find(filter).sort({ createdAt: -1 }).exec();
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
