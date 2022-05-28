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
      throw new Error('User or token invalid.');
    }
  } catch (error) {
    throw new Error(`Could not sign in: ${error}`);
  }
}

export async function signup(data) {
  if (!data.token) {
    throw new Error('You must provide email and password');
  }

  // See if a user with the given email exists
  const existingUser = await Profile.findOne({ email: data.email });
  if (existingUser) {
    // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  const verifiedUser = await verify(data.token);

  const user = new Profile();
  user.email = verifiedUser.email;
  user.name = data.name;
  user.stress = data.stress;
  user.calm = data.calm;
  user.pet = data.pet;
  user.petName = data.petName;
  await user.save();
  return tokenForUser(user);
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

function tokenForUser(user) {
  return jwt.encode(user.email, process.env.AUTH_SECRET);
}
