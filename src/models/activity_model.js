import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const activitySchema = new Schema(
  {
    title: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    //time and date

  },

);

// create PostModel class from schema
const activityModel = mongoose.model('Activity', activitySchema);

export default activityModel;