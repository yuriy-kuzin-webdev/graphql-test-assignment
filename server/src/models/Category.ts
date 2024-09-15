import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true },
}, { timestamps: true });

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
