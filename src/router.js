import { Router } from 'express';
import * as ProfileController from './controllers/profile_controller';
import * as EmotionController from './controllers/emotion_controller';
import * as Activity from './activities';
import * as ActivityController from './controllers/activity_controller'

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to well buddies api. this is proof that our data retrieval is working!' });
});

router.post('/signin', async (req, res) => {
  try {
    const jwt = await ProfileController.signin(req.body);
    res.json(jwt);
  } catch (error) {
    console.log(error);
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const jwt = await ProfileController.signup(req.body);
    res.json(jwt);
  } catch (error) {
    console.log(`error ${error}`);
    res.status(422).send({ error: error.toString() });
  }
});

router.get('/buddy/:jwt', async (req, res) => {
  try {
    const buddy = await ProfileController.getBuddy(req.params.jwt);
    res.json(buddy);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
}).patch('/buddy/:jwt', async (req, res) => {
  try {
    const buddy = await ProfileController.setBuddy(req.params.jwt);
    res.json(buddy);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

// get all emotions
router.get('/emotions/:jwt').get(async (req, res) => {
  try {
    const emotions = await EmotionController.getAllEmotions(req.params.jwt);
    res.json(emotions);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

// get all emotions or post (and get) today's emotion
router.route('/emotion/:jwt').get(async (req, res) => {
  try {
    const emotions = await EmotionController.getTodayEmotion(req.params.jwt);
    console.log('got here');
    res.json(emotions);
  } catch (error) {
    console.log(`get emotion error ${error}`);
    res.status(422).send({ error: error.toString() });
  }
}).post(async (req, res) => {
  try {
    const emotion = await EmotionController.createEmotion(req.params.jwt, req.body);
    res.json(emotion);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
}).patch(async (req, res) => {
  try {
    const emotion = await EmotionController.setEmotion(req.params.jwt, req.body);
    res.json(emotion);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.route('/profile/:jwt').get(async (req, res) => {
  try {
    const user = await ProfileController.getUser(req.params.jwt);
    res.json(user);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
}).patch(async (req, res) => {
  try {
    const user = await ProfileController.updateName(req.params.jwt, req.body);
    res.json(user);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.get('/activity/:jwt/:duration', async (req, res) => {
  try {
    const activities = await ActivityController.getActivities(req.params.jwt);
    res.json(activities);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
}).patch('/activity/:jwt', async (req, res) => {
  try {
    const activity = await Activity.generateActivity(req.params.jwt);
    res.json(activity);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

export default router;
