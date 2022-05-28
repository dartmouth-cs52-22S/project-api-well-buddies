import { Router } from 'express';
import * as ProfileController from './controllers/profile_controller';
import * as EmotionController from './controllers/emotion_controller';

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

// get day emotion
router.get('/emotion/:jwt/:date', async (req, res) => {
  try {
    const buddy = await ProfileController.setBuddy(req.params.jwt, req.params.date);
    res.json(buddy);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

// get all emotions or post (and get) today's emotion
router.route('/emotion/:jwt').get(async (req, res) => {
  try {
    const emotions = await EmotionController.getAllEmotions(req.params.jwt);
    res.json(emotions);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
}).post(async (req, res) => {
  try {
    const emotion = await EmotionController.getEmotion(req.params.jwt, req.body);
    res.json(emotion);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

export default router;
