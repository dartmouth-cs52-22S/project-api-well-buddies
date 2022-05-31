import Event from '../models/events_model';

export async function createEvent(data) {
  const event = new Event();
  event.name = data.name;
  event.user = data.id;
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

export async function findEvent(res, req) {
  Event.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      throw new Error(`find event error: ${error}`);
    });
}