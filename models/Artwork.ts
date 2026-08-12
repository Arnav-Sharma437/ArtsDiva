import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IArtwork extends Document {
  title: string;
  slug: string;
  artistId: Types.ObjectId;
  categoryId: Types.ObjectId;
  mediumId: Types.ObjectId;
  description: string;
  price?: number;
  isForLease: boolean;
  isForSale: boolean;
  availabilityStatus: 'AVAILABLE' | 'LEASED' | 'SOLD';
  dimensions: string;
  yearCreated: number;
  isFeatured: boolean;
  images: Array<{ url: string; sortOrder: number }>;
}

const ArtworkSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  artistId: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  mediumId: { type: Schema.Types.ObjectId, ref: 'Medium', required: true },
  description: { type: String, required: true },
  price: { type: Number },
  isForLease: { type: Boolean, default: false },
  isForSale: { type: Boolean, default: true },
  availabilityStatus: { type: String, enum: ['AVAILABLE', 'LEASED', 'SOLD'], default: 'AVAILABLE' },
  dimensions: { type: String, required: true },
  yearCreated: { type: Number, required: true },
  isFeatured: { type: Boolean, default: false },
  images: [{
    url: { type: String, required: true },
    sortOrder: { type: Number, default: 0 }
  }]
}, { timestamps: true });

ArtworkSchema.index({ categoryId: 1, mediumId: 1, artistId: 1, availabilityStatus: 1, price: 1 });
ArtworkSchema.index({ title: 'text' });

export default mongoose.models.Artwork || mongoose.model<IArtwork>('Artwork', ArtworkSchema);
