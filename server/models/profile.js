import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  headline: { type: String, required: true, max: 40 },
  location: { type: String },
  bio: { type: String },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Profile', profileSchema);
