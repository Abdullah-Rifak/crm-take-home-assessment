import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

type AggregateTotal = { total?: number };

@Injectable()
export class DashboardService {
  constructor(@InjectModel('Lead') private readonly leadModel: Model<any>) {}

  async getStats() {
    const totalLeads = await this.leadModel.countDocuments();

    const newLeads = await this.leadModel.countDocuments({ status: 'New' });
    const qualifiedLeads = await this.leadModel.countDocuments({
      status: 'Qualified',
    });
    const wonLeads = await this.leadModel.countDocuments({ status: 'Won' });
    const lostLeads = await this.leadModel.countDocuments({ status: 'Lost' });

    const totalValue = await this.leadModel.aggregate<AggregateTotal>([
      { $group: { _id: null, total: { $sum: '$dealValue' } } },
    ]);

    const wonValue = await this.leadModel.aggregate<AggregateTotal>([
      { $match: { status: 'Won' } },
      { $group: { _id: null, total: { $sum: '$dealValue' } } },
    ]);

    return {
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      lostLeads,
      totalEstimatedValue: totalValue[0]?.total ?? 0,
      totalWonValue: wonValue[0]?.total ?? 0,
    };
  }
}
