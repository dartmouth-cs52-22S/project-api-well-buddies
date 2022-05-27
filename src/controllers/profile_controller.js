import Profile from '../models/profile_model'

export async function createProfile(data) {
  const profile = new Profile();
  profile.user = data.id;
  profile.name = data.name;
  // profile.email = data.email;
  profile.stressful = data.stressful;
  profile.calm = data.calm;
  profile.pet = data.pet;
  profile.pet_name = data.pet_name;
  try {
    const savedProfile = await profile.save();
    return savedProfile;
  } catch (error) {
    throw new Error(`Could not save profile: ${error}`);
  }
}

export async function updateProfile(req, res) {
  Post.findByIdAndUpdate(req.params.id, req.email, req.name, req.pet, req.pet_name)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      throw new Error(`Failed to update profile: ${error}`);
    });
}