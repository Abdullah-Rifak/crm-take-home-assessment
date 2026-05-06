import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadSchema } from '../leads/lead.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Lead', schema: LeadSchema }])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
