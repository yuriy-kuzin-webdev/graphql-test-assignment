import mongoose, { Schema, Document } from 'mongoose';

export interface IRisk extends Document {
  name: string;
  description: string;
  categoryId: mongoose.Schema.Types.ObjectId;
  resolved: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const RiskSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  resolved: { type: Boolean, default: false },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Risk = mongoose.model<IRisk>('Risk', RiskSchema);
