import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema(
  {
    user: String,
    name: String,
    token: String,
    stress: [String],
    calm: [String],
    pet: String,
    petName: String,
  },

);

const profileModel = mongoose.model('Profile', profileSchema);

export default profileModel;
