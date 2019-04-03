import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  unlikes: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
});

export default mongoose.model('Post', postSchema);
