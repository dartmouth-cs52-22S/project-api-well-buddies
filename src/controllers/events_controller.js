import Event from '../models/events_model';
import jwt from 'jwt-simple';

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
    return savedEvent;
  } catch (error) {
    throw new Error(`create event error: ${error}`);
  }
}

export async function deleteEvent(res, req) {
  Event.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      throw new Error(`delete event error: ${error}`);
    });
}

export async function findEvent(res, req, completed) {
  Event.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      throw new Error(`find event error: ${error}`);
    });
}