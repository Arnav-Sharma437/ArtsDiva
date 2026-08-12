import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPublication extends Document {
  title: string;
  slug: string;
  artistId: Types.ObjectId;
  coverImageUrl: string;
  excerpt: string;
  body: string;
  publishedAt: Date;
}

const PublicationSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  artistId: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  coverImageUrl: { type: String, required: true },
  excerpt: { type: String, required: true },
  body: { type: String, required: true },
  publishedAt: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Publication || mongoose.model<IPublication>('Publication', PublicationSchema);
