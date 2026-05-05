import { Document, Schema } from 'mongoose';

export interface Lead {
  leadName: string;
  companyName: string;
  email: string;
  phone: string;
  source: string;
  assignedTo: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost';
  dealValue: number;
}

export type LeadDocument = Lead & Document;

export const LeadSchema = new Schema<LeadDocument>(
  {
    leadName: String,
    companyName: String,
    email: String,
    phone: String,
    source: String,
    assignedTo: String,
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
      default: 'New',
    },
    dealValue: Number,
  },
  { timestamps: true },
);
