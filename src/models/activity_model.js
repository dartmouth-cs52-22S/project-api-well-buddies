import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    title: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    //time and date

  },

);

const activityModel = mongoose.model('Activity', activitySchema);

export default activityModel;