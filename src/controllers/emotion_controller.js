import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import Emotion from '../models/emotion_model';
import Profile from '../models/profile_model';

dotenv.config({ silent: true });

export async function getEmotion(jwtToken, body) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
    const today = Date.now();
    const emotion = await Emotion.findOne({ user: foundUser, date: today });

    // no emotion input and no emotion given
    if (emotion === null && body.emotion === null) {
      throw new Error('No emotion for today');
    }
    // emotion being made
    if (emotion === null && body.emotion !== null) {
      const todayEmotion = new Emotion();
      todayEmotion.user = foundUser;
      todayEmotion.title = body.emotion;
      todayEmotion.date = today;
      const savedEmotion = await todayEmotion.save();
      return { title: savedEmotion.title };
    }

    // emotion already exists
    if (emotion !== null) {
      return { title: emotion.title };
    }
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

    return { title: updatedUser.title, user: updatedUser.user, date: updatedUser.date };
  } catch (error) {
    throw new Error(`Could not set emotion: ${error}`);
  }
}

export async function getAllEmotions(jwtToken) {
  const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
  const foundUser = await Profile.findOne({ email });

  // code adapted from https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
  Emotion.find({ user: foundUser })
    .then((err, user) => {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
        throw new Error(`Could not get emotions ${err}`);
      }
      // return all users in JSON format
      console.log(user);
      return JSON.parse(user);
    });
}
