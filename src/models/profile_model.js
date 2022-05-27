import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: "",
    // email: "",
    stressful: [],
    calm: [],
    pet: "",
    pet_name: "",

  },

);

const profileModel = mongoose.model('Profile', profileSchema);

export default profileModel;