import { Router } from 'express';
import * as ProfileController from './controllers/profile_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to well buddies api. this is proof that our data retrieval is working!' });
});

router.post('/signin', async (req, res) => {
  try {
    const jwt = await ProfileController.signin(req.body);
    res.json({ jwt });
  } catch (error) {
    console.log(error);
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const jwt = await ProfileController.signup(req.body);
    res.json({ jwt });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.get('/buddy/:token', async (req, res) => {
  try {
    console.log(req.params.token);
    const buddy = await ProfileController.getBuddy(req.params.token);
    res.json(buddy);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
}).patch('/buddy/:token', async (req, res) => {
  try {
    const buddy = await ProfileController.setBuddy(req.params);
    res.json(buddy);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

export default router;
