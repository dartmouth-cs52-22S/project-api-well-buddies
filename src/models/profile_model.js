import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema(
  {
    email: String,
    name: String,
    stress: [String],
    calm: [String],
    pet: String,
    petName: String,
    star: Number,
  },

);

const profileModel = mongoose.model('Profile', profileSchema);

export default profileModel;
