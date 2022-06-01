import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import Emotion from '../models/emotion_model';
import Profile from '../models/profile_model';

dotenv.config({ silent: true });

export async function createEmotion(jwtToken, body) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
    const today = new Date();
    const emotion = await Emotion.findOne({ user: foundUser, date: today.toDateString() });

    // no emotion input and no emotion given
    if (emotion === null && body == null) {
      throw new Error('No emotion for today');
    }
    // emotion being made
    if (emotion === null && body.title !== null) {
      const todayEmotion = new Emotion();
      todayEmotion.user = foundUser;
      todayEmotion.title = body.title;
      todayEmotion.date = today.toDateString();
      const savedEmotion = await todayEmotion.save();
      return { title: savedEmotion.title };
    }

    // emotion already exists
    return { title: emotion.title };
  } catch (error) {
    throw new Error(`Could not get emotion: ${error}`);
  }
}

export async function getTodayEmotion(jwtToken) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
    const today = new Date();
    const emotion = await Emotion.findOne({ user: foundUser, date: today.toDateString() });

    // no emotion input and no emotion given
    if (emotion === null) {
      console.log('today emotion not found');
      return { title: '' };
    }
    // emotion already exists
    return { title: emotion.title };
  } catch (error) {
    throw new Error(`Could not get emotion: ${error}`);
  }
}

export async function setEmotion(jwtToken, body) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
    const emotion = await Emotion.findOne({ user: foundUser });

    if (emotion === null) {
      throw new Error('Emotion log does not exist for today');
    }

    emotion.title = body.title;

    const savedEmotion = await emotion.save();

    // emotion already exists
    return { title: savedEmotion.title };
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
