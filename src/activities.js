import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import Profile from './models/profile_model';

dotenv.config({ silent: true });

// const activities = {
//   // hard coding actions and durations
//   // where durations are in minutes
//   calling_parents: 15,
//   going_for_walk: 30,
//   gym: 60,
//   nap: 30,
//   catch_up_with_friend: 20,
//   new_song: 10,
//   meditate: 15,
//   homework: 120,
//   bake: 60,
//   cleaning_task: 20,
//   play_instrument: 45,
//   go_for_a_drive: 20,
//   bike: 40,
//   rollerblade: 25,
//   watch_episode: 45,
//   read_chapter: 15,
//   journal: 5,
//   listed_podcast: 30,
//   drink_water: 1,
//   stretch: 5,
//   article: 5,
// };

const activitiesList = [
  {
    title: 'Call your parents',
    duration: 15,
    icon: '&#9742;',
  },
  {
    title: 'Go for a walk',
    duration: 30,
    icon: '&#128694;',
  },
  {
    title: 'Go for a short walk',
    duration: 15,
    icon: '&#128694;',
  },
  {
    title: 'Go to the gym',
    duration: 60,
    icon: '&#127947;',
  },
  {
    title: 'Take a nap',
    duration: 15,
    icon: '&#128564;',
  },
  {
    title: 'Catch up with old friends',
    duration: 20,
    icon: '&#128150;',
  },
  {
    title: 'Listen to a new song',
    duration: 10,
    icon: '&#127926;',
  },
  {
    title: 'Meditate',
    duration: 15,
    icon: '&#129496;',
  },
  {
    title: 'Clean a space',
    duration: 20,
    icon: '&#129529;',
  },
  {
    title: 'Go for a drive',
    duration: 20,
    icon: '&#128663;',
  },
  {
    title: 'Go for a bike ride',
    duration: 30,
    icon: '&#128690;',
  },
  {
    title: 'Rollerblade',
    duration: 20,
    icon: '&#128764;',
  },
  {
    title: 'Read a chapter of a book',
    duration: 20,
    icon: '&#128214;',
  },
  {
    title: 'Journal',
    duration: 10,
    icon: '&#128214;',
  },
  {
    title: 'Listen to a podcast',
    duration: 30,
    icon: '&#127911;',
  },
  {
    title: 'Drink water',
    duration: 5,
    icon: '&#129380;',
  },
  {
    title: 'Stretch',
    duration: 5,
    icon: '&#129336;',
  },
  {
    title: 'Take a deep breath',
    duration: 5,
    icon: '&#128168;',
  },
  {
    title: 'Clean your desk space',
    duration: 20,
    icon: '&#129529;',
  },
  {
    title: 'Water your plants',
    duration: 5,
    icon: '&#129716;',
  },
  {
    title: 'Watch the sunrise',
    duration: 20,
    icon: '&#127748;',
  },
];

async function generateActivity(jwtToken, duration) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });

    const today = new Date(Date.now());
    console.log(foundUser.activity.lastSuggested);
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
