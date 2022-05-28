import mongoose, { Schema } from 'mongoose';

const emotionSchema = new Schema(
  {
    title: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },  //not sure if this is necessary
    date:{type:Date, default:Date.now()},

  },

);

const emotionModel = mongoose.model('Emotion', emotionSchema);

export default emotionModel;