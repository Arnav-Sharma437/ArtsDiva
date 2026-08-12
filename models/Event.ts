import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  coverImageUrl: string;
  description: string;
  eventDate: Date;
  startTime: string;
  endTime: string;
  location: string;
  tags: string[];
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  coverImageUrl: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  tags: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
