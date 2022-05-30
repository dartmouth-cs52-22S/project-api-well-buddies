import Activity from '../models/activity_model';

export async function newActivity(data) {
  const activity = new Activity();
  activity.title = data.title;
  activity.user = data.id;
  try {
    const savedActivity = await activity.save();
    return savedActivity;
  } catch (error) {
    throw new Error(`new activity error: ${error}`);
  }
}

export async function getActivities(res, req) {
  Activity.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      throw new Error(`get all activities error: ${error}`);
    });
}

export async function getActivity(res, req) {
  Activity.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      throw new Error(`get activity error: ${error}`);
    });
}

export async function deleteActivity(res, req) {
  Activity.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      throw new Error(`delete activity error: ${error}`);
    });
}

export async function updateActivity(req, res) {
  Activity.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      throw new Error(`update activity error: ${error}`);
    });
}
