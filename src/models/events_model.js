import mongoose, { Schema } from 'mongoose';

const eventsSchema = new Schema(
  {
    completedEvents: [{ eventId: String, wellness: Boolean }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },

);

const eventModel = mongoose.model('Event', eventsSchema);

export default eventModel;
