import jwt from 'jwt-simple';
import Event from '../models/events_model';
import Profile from '../models/profile_model';

export async function completeEvent(jwtToken, newEventId, wellnessValue) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
    let userEvents = await Event.findOne({ user: foundUser });
    if (userEvents === null) {
      userEvents = new Event();
      userEvents.user = foundUser;
    }
    userEvents.completedEvents.push({ eventId: newEventId, wellness: wellnessValue });
    if (wellnessValue) {
      foundUser.recentCompletedWellness = new Date(Date.now());
    }
    const savedUser = await foundUser.save();
    const savedEvent = await userEvents.save();
    const allEvents = savedEvent.completedEvents.map(({ eventId, wellness }) => { return eventId; });
    return allEvents;
  } catch (error) {
    throw new Error(`create event error: ${error}`);
  }
}

export async function completedEvents(jwtToken) {
  try {
    const email = jwt.decode(jwtToken, process.env.AUTH_SECRET);
    const foundUser = await Profile.findOne({ email });
    if (foundUser === null) {
      throw new Error('User not found');
    }
    const userEvents = await Event.findOne({ user: foundUser });
    if (userEvents === null) {
      return [];
    }
    const allEvents = userEvents.completedEvents.map(({ eventId, wellness }) => { return eventId; });
    return allEvents;
  } catch (error) {
    throw new Error(`Could not delete event: ${error}`);
  }
}
