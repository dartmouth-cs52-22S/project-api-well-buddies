import { Router } from 'express';
import * as ProfileController from './controllers/profile_controller';
import * as EmotionController from './controllers/emotion_controller';
import * as EventController from './controllers/events_controller';
import generateActivity from './activities';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to well buddies api. this is proof that our data retrieval is working!' });
});

router.post('/signin', async (req, res) => {
  try {
    const jwt = await ProfileController.signin(req.body);
    res.json(jwt);
  } catch (error) {
    if (error.message === 'Sign in error: Error: An account for this email does not exist.') {
      res.status(409).send('A user with this email already exists!');
    } else {
      res.status(422).send({ error: error.toString() });
    }
  }
});

router.post('/signup', async (req, res) => {
  try {
    const jwt = await ProfileController.signup(req.body);
    res.json(jwt);
  } catch (error) {
    if (error.message === 'Sign up error: Error: Email is in use') {
      res.status(409).send('A user with this email already exists!');
    } else {
      res.status(422).send({ error: error.toString() });
    }
  }
});

router.get('/buddy/:jwt', async (req, res) => {
  try {
    const buddy = await ProfileController.getBuddy(req.params.jwt);
    res.json(buddy);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
}).patch('/buddy', async (req, res) => {
  try {
    const buddy = await ProfileController.setBuddy(req.body);
    res.json(buddy);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

// get all emotions
router.route('/emotions/:jwt').get(async (req, res) => {
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

router.get('/star/:jwt', async (req, res) => {
  try {
    const star = await ProfileController.getStar(req.params.jwt);
    res.json(star);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
}).patch('/star/:jwt', async (req, res) => {
  try {
    const star = await ProfileController.updateStar(req.params.jwt, req.body);
    res.json(star);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.get('/activity/:jwt', async (req, res) => {
  try {
    const activity = await generateActivity(req.params.jwt, req.query.duration);
    res.json(activity);
  } catch (error) {
    console.log(error);
    res.status(422).send({ error: error.toString() });
  }
});

router.get('/activity/today/:jwt', async (req, res) => {
  try {
    const activity = await ProfileController.completedToday(req.params.jwt);

    res.json(activity);
  } catch (error) {
    console.log(error);
    res.status(422).send({ error: error.toString() });
  }
});

router.route('/event/:jwt').get(async (req, res) => {
  try {
    const events = await EventController.completedEvents(req.params.jwt);
    res.json(events);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
}).post(async (req, res) => {
  try {
    let event = '';
    if (req.body.wellness !== '') {
      event = await EventController.completeEvent(req.params.jwt, req.body.event, true);
    } else {
      event = await EventController.completeEvent(req.params.jwt, req.body.event, false);
    }
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(422).send({ error: error.toString() });
  }
});

export default router;
