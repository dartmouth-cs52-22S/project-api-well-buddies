import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  content: String,
  coverUrl: String,
  tags: String,
  author: String, // { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

PostSchema.index({
  title: 'text', tags: 'text', content: 'text', author: 'text',
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
