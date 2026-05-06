import { Schema, Types } from 'mongoose';

export const NoteSchema = new Schema(
  {
    leadId: {
      type: Types.ObjectId,
      ref: 'Lead',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      default: 'admin@example.com',
    },
  },
  { timestamps: true },
);
