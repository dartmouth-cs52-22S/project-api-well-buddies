import Activity from '../models/activity_model';
import Profile from '../models/profile_model';

import jwt from 'jwt-simple';
// import Activity from '../models/activity_model'

export async function newActivity(data) {
  const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
  const activity = await Activity.findOne({ title: data.title, user: foundUser});

  try {
    const savedActivity = await activity.save();
    return {title: savedActivity.title};
  } catch (error) {
    throw new Error(`new activity error: ${error}`);
  }
}

export async function getActivities(jwtToken) {
  const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
  const foundUser = await Profile.findOne({ email });

  // code adapted from https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
  Activity.find({ user: foundUser })
    .then((err, user) => {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
        throw new Error(`Could not get activites ${err}`);
      }
      // return all users in JSON format
      console.log(user);
      return JSON.parse(user);
    });
}

export async function getActivity(jwtToken) {
  try{
  const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
  const activity = await Activity.findOne({  user: foundUser});

  if (activity === null) {
    console.log('activity not located');
    return { title: '' };
  }

  return { title: activity.title };

  } catch (error) {
    throw new Error(`Could not get activity: ${error}`);
  }
  
}

export async function deleteActivity(jwtToken) {
  try{
  const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
  const activity = await Activity.findByIdAndDelete({  user: foundUser});
  return activity;
  } catch (error) {
    throw new Error(`Could not delete activity: ${error}`);
  }
}

export async function updateActivity(jwtToken, data) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
    const activity = await Activity.findOne({ user: foundUser });

    if (activity === null) {
      throw new Error('Cannot update if activity does not exist');
    }

    activity.title = data.title;

    const savedActivity = await activity.save();

    return { activity: savedActivity.title };
  } catch (error) {
    throw new Error(`Could not set activity: ${error}`);
  }
}
