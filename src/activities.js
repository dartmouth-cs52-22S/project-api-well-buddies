import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import Profile from './models/profile_model';

dotenv.config({ silent: true });

const activitiesList = [
  {
    title: 'Call your parents',
    duration: 15,
    icon: '☎️',
  },
  {
    title: 'Go for a walk',
    duration: 30,
    icon: '🚶‍♂️',
  },
  {
    title: 'Go for a short walk',
    duration: 15,
    icon: '🚶‍♂️',
  },
  {
    title: 'Go to the gym',
    duration: 60,
    icon: '🏋️‍♂️',
  },
  {
    title: 'Take a nap',
    duration: 15,
    icon: '😴',
  },
  {
    title: 'Catch up with old friends',
    duration: 20,
    icon: '💗',
  },
  {
    title: 'Listen to a new song',
    duration: 10,
    icon: '🎧',
  },
  {
    title: 'Meditate',
    duration: 15,
    icon: '🧘‍♂️',
  },
  {
    title: 'Clean a space',
    duration: 20,
    icon: '🧹',
  },
  {
    title: 'Go for a drive',
    duration: 20,
    icon: '🚗',
  },
  {
    title: 'Go for a bike ride',
    duration: 30,
    icon: '🚲',
  },
  {
    title: 'Rollerblade',
    duration: 20,
    icon: '🛼',
  },
  {
    title: 'Read a chapter of a book',
    duration: 20,
    icon: '📖',
  },
  {
    title: 'Journal',
    duration: 10,
    icon: '📖',
  },
  {
    title: 'Listen to a podcast',
    duration: 30,
    icon: '🎧',
  },
  {
    title: 'Drink water',
    duration: 5,
    icon: '🥤',
  },
  {
    title: 'Stretch',
    duration: 5,
    icon: '🤸‍♂️',
  },
  {
    title: 'Take a deep breath',
    duration: 5,
    icon: '💨',
  },
  {
    title: 'Clean your desk space',
    duration: 20,
    icon: '🧹',
  },
  {
    title: 'Water your plants',
    duration: 5,
    icon: '🪴',
  },
  {
    title: 'Go outside',
    duration: 15,
    icon: '🌷',
  },
];

async function generateActivity(jwtToken, duration) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });

    const today = new Date(Date.now());
    if (foundUser.activity.lastSuggested) {
      if (foundUser.activity.lastSuggested.toDateString() === today.toDateString()) {
        throw new Error('Already suggested an activity today!');
      }
    } else {
      foundUser.activity = {};
      foundUser.activity.lastSuggested = Date.now();
      foundUser.activity.activityName = '';
    }

    let goodActivity = false;
    let activity = null;

    while (!goodActivity) {
      activity = activitiesList[Math.floor(Math.random() * activitiesList.length)];
      if (activity.duration < duration || !foundUser.stress.includes(activity.title)) {
        goodActivity = true;
      }
    }

    foundUser.activity.lastSuggested = Date.now();
    foundUser.activity.activityName = activity.title;
    await foundUser.save();

    return activity; // for activity and duration
  } catch (error) {
    throw new Error(error);
  }
}

export default generateActivity;
