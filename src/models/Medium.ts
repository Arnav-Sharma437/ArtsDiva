import mongoose, { Schema, Document } from 'mongoose';

export interface IMedium extends Document {
  name: string;
}

const MediumSchema: Schema = new Schema({
  name: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Medium || mongoose.model<IMedium>('Medium', MediumSchema);
