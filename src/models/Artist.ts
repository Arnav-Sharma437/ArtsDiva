import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  bio: { type: String },
  photoUrl: { type: String },
  nationality: { type: String },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Artist || mongoose.model('Artist', ArtistSchema);
