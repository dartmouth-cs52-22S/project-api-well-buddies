import mongoose, { Schema } from 'mongoose';

const eventsSchema = new Schema(
  {
    title: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },

);

const eventsModel = mongoose.model('Event', eventsSchema);

export default eventsModel;