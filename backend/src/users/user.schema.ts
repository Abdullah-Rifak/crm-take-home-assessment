import { Document, Schema } from 'mongoose';

export interface User {
  email: string;
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);
