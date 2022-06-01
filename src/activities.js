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
  },
  {
    title: 'Go for a walk',
    duration: 30,
  },
  {
    title: 'Go for a short walk',
    duration: 15,
  },
  {
    title: 'Go to the gym',
    duration: 60,
  },
  {
    title: 'Take a nap',
    duration: 15,
  },
  {
    title: 'Catch up with old friends',
    duration: 20,
  },
  {
    title: 'Listen to a new song',
    duration: 10,
  },
  {
    title: 'Meditate',
    duration: 15,
  },
  {
    title: 'Clean a space',
    duration: 20,
  },
  {
    title: 'Go for a drive',
    duration: 20,
  },
  {
    title: 'Go for a bike ride',
    duration: 30,
  },
  {
    title: 'Rollerblade',
    duration: 20,
  },
  {
    title: 'Read a chapter of a book',
    duration: 20,
  },
  {
    title: 'Journal',
    duration: 10,
  },
  {
    title: 'Listen to a podcast',
    duration: 30,
  },
  {
    title: 'Drink water',
    duration: 5,
  },
  {
    title: 'Stretch',
    duration: 5,
  },
  {
    title: 'Take a deep breath',
    duration: 5,
  },
  {
    title: 'Clean your desk space',
    duration: 20,
  },
];

async function generateActivity(jwtToken, duration) {
  const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
  const foundUser = await Profile.findOne({ email });

  let goodActivity = false;
  let activity = null;

  while (!goodActivity) {
    activity = activitiesList[Math.floor(Math.random() * activitiesList.length)];
    if (activity.duration < duration || !foundUser.stress.includes(activity.title)) {
      goodActivity = true;
    }
  }

  return activity; // for activity and duration
}

export default generateActivity;
