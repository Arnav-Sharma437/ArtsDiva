import mongoose, { Schema, Document } from 'mongoose';

export interface IExhibition extends Document {
  title: string;
  slug: string;
  coverImageUrl: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  city: string;
  country: string;
  status: 'UPCOMING' | 'ONGOING' | 'PAST';
}

const ExhibitionSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  coverImageUrl: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  status: { type: String, enum: ['UPCOMING', 'ONGOING', 'PAST'], required: true },
}, { timestamps: true });

export default mongoose.models.Exhibition || mongoose.model<IExhibition>('Exhibition', ExhibitionSchema);
