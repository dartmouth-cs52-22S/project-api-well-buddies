import jwt from 'jwt-simple';
import Event from '../models/events_model';
import Profile from '../models/profile_model';

export async function completeEvent(jwtToken, newEventId, newSummary, wellnessValue) {
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
    console.log(newEventId);
    console.log({ eventId: newEventId, summary: newSummary, wellness: wellnessValue });
    userEvents.completedEvents.push({ eventId: newEventId, summary: newSummary, wellness: wellnessValue });
    const savedEvent = await userEvents.save();
    console.log('savedevent', savedEvent);
    const allEvents = savedEvent.completedEvents.map(({ eventId, summary, wellness }) => { return { eventId, summary, wellness }; });
    console.log('all events', allEvents);
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
