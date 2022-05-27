import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: String,
    stressful: [],
    calm: [],

  },

);

const profileModel = mongoose.model('Profile', profileSchema);

export default profileModel;