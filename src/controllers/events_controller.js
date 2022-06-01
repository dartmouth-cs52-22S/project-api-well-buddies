import jwt from 'jwt-simple';
import Event from '../models/events_model';

export async function createEvent(jwtToken, data) {
  const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
  const foundUser = await Profile.findOne({ email });
  if (foundUser === null) {
    throw new Error('User not found');
  }
  const event = new Event();
  event.completed = data.completed;
  event.user = event.foundUser;
  try {
    const savedEvent = await event.save();
    return { completed: savedEvent.completed };
  } catch (error) {
    throw new Error(`create event error: ${error}`);
  }
}

export async function deleteEvent(jwtToken) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
    const event = await Event.findByIdAndDelete({ user: foundUser });
    return event;
  } catch (error) {
    throw new Error(`Could not delete event: ${error}`);
  }
}

export async function findEvent(jwtToken, completed) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
    const event = await Event.findOne({ completed, user: foundUser });

    if (event === null) {
      console.log('event not located');
      return { title: '' };
    }

    return { title: event.title };
  } catch (error) {
    throw new Error(`Could not get event: ${error}`);
  }
}
