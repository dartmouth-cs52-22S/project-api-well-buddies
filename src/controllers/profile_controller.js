import Profile from '../models/profile_model';

export async function signin(data) {
  try {
    const user = await Profile.findOne({ token: data.token });
    return { token: data.token.slice(0, 100) };
  } catch (error) {
    throw new Error(`Could not save profile: ${error}`);
  }
}

export async function signup(data) {
  if (!data.token) {
    throw new Error('You must provide email and password');
  }

  // See if a user with the given email exists
  const existingUser = await Profile.findOne({ token: data.token });
  if (existingUser) {
    // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  const user = new Profile();
  user.user = data.googleUser;
  user.token = data.token.slice(0, 100);
  user.name = data.name;
  user.stress = data.stress;
  user.calm = data.calm;
  user.pet = data.pet;
  user.petName = data.petName;
  await user.save();
  return { token: data.token.slice(0, 100) };
}

export async function getBuddy(idToken) {
  try {
    const temp = await Profile.findOne({ pet: 'Panda' });
    console.log('temp', temp);
    const user = await Profile.findOne({ token: idToken });
    console.log('user', user);
    if (user === null) {
      console.log('buddynotfound');
      throw new Error('Buddy not found');
    }
    return { pet: user.pet, petName: user.petName };
  } catch (error) {
    throw new Error(`Could not save profile: ${error}`);
  }
}

export async function setBuddy(data) {
  try {
    const user = await Profile.findOne({ token: data.idToken });
    if (user === null) {
      throw new Error('Buddy not found');
    }
    if (data.pet !== '') {
      user.pet = data.pet;
    }
    if (data.petName !== '') {
      user.petName = data.petName;
    }
    // TODO: look at lab to see if check to make sure user is saved
    return user;
  } catch (error) {
    throw new Error(`Could not save profile: ${error}`);
  }
}
