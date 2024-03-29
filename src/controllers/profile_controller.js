import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import Profile from '../models/profile_model';
import { verify } from '../services/googleVerification';

dotenv.config({ silent: true });

export async function signin(data) {
  try {
    const verifiedUser = await verify(data.token);
    console.log(verifiedUser);
    const user = await Profile.findOne({ email: verifiedUser.email });
    if (user) {
      return tokenForUser(user);
    } else {
      throw new Error('An account for this email does not exist.');
    }
  } catch (error) {
    throw new Error(`Sign in error: ${error}`);
  }
}

export async function signup(data) {
  try {
    if (!data.token) {
      throw new Error('You must provide email and password');
    }

    const verifiedUser = await verify(data.token);

    // See if a user with the given email exists
    const existingUser = await Profile.findOne({ email: verifiedUser.email });
    if (existingUser !== null) {
      // If a user with email does exist, return an error
      throw new Error('Email is in use');
    }

    const user = new Profile();
    user.email = verifiedUser.email;
    user.name = data.name;
    user.stress = data.stress;
    user.calm = data.calm;
    user.pet = data.pet;
    user.petName = data.petName;
    user.star = 0;
    user.activity.lastSuggested = new Date(0);
    user.recentCompletedWellness = new Date(0);
    user.activity.activityName = '';
    await user.save();
    return tokenForUser(user);
  } catch (error) {
    throw new Error(`Sign up error: ${error}`);
  }
}

export async function getStar(jwtToken) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('Star not found');
    }
    if (foundUser.star) {
      return { pet: foundUser.pet, star: foundUser.star };
    } else {
      throw new Error('star not found');
    }
  } catch (error) {
    throw new Error(`Could not get star: ${error}`);
  }
}

export async function updateStar(jwtToken, body) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('Buddy not found');
    }

    if (body.star !== null) {
      foundUser.star = body.star;
    }

    const updatedUser = await foundUser.save();

    return updatedUser;
  } catch (error) {
    throw new Error(`Could not update star: ${error}`);
  }
}

export async function getBuddy(jwtToken) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('Buddy not found');
    }
    return { pet: foundUser.pet, petName: foundUser.petName };
  } catch (error) {
    throw new Error(`Could not save profile: ${error}`);
  }
}

export async function setBuddy(data) {
  try {
    const email = jwt.decode(data.token, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('Buddy not found');
    }
    if (data.pet !== '') {
      foundUser.pet = data.pet;
    }
    if (data.petName !== '') {
      foundUser.petName = data.petName;
    }

    const updatedUser = await foundUser.save();

    return { pet: updatedUser.pet, petName: updatedUser.petName };
  } catch (error) {
    throw new Error(`Could not save profile: ${error}`);
  }
}

export async function getUser(jwtToken) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('Buddy not found');
    }

    return foundUser;
  } catch (error) {
    throw new Error(`Could not find user: ${error}`);
  }
}

export async function updateName(jwtToken, body) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('Buddy not found');
    }

    if (body.name !== null) {
      foundUser.name = body.name;
    }

    const updatedUser = foundUser.save();

    return updatedUser;
  } catch (error) {
    throw new Error(`Could not update name: ${error}`);
  }
}

export async function completedToday(jwtToken) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('Buddy not found');
    }
    const today = new Date(Date.now());
    if (foundUser.recentCompletedWellness) {
      return (foundUser.recentCompletedWellness.toDateString() === today.toDateString());
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error);
  }
}

function tokenForUser(user) {
  return jwt.encode(user.email, process.env.AUTH_SECRET);
}
