import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import Profile from '../models/profile_model';

export async function getEmotion(jwtToken) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('Emotion not found');
    }
    return { title: foundUser.title, user: foundUser.user };
  } catch (error) {
    throw new Error(`Could not get emotions: ${error}`);
  }
}

export async function setEmotion(data) {
  try {
    const email = jwt.decode(data.token, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('Emotion not found');
    }
    if (data.title !== '') {
      foundUser.title = data.title;
    }
    if (data.user !== '') {
      foundUser.user = data.user;
    }

    const updatedUser = await foundUser.save();

    return { title: updatedUser.title, user: updatedUser.user };
  } catch (error) {
    throw new Error(`Could not set emotion: ${error}`);
  }
}

function tokenForUser(user) {
  return jwt.encode(user.email, process.env.AUTH_SECRET);
}