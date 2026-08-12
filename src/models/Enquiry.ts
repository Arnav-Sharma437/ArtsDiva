import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  artworkId?: Types.ObjectId;
  type: 'PURCHASE' | 'LEASE' | 'GENERAL';
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
}

const EnquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  artworkId: { type: Schema.Types.ObjectId, ref: 'Artwork' },
  type: { type: String, enum: ['PURCHASE', 'LEASE', 'GENERAL'], required: true },
  status: { type: String, enum: ['NEW', 'CONTACTED', 'CLOSED'], default: 'NEW' },
}, { timestamps: true });

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
