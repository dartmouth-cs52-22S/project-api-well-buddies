import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  content: String,
  coverUrl: String,
  tags: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

PostSchema.index({ title: 'text', tags: 'text', content: 'text' });

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
