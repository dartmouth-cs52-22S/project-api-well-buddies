import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// POST `/posts`: `Posts.createPost`
// GET `/posts`: `Posts.getPosts`

router.route('/posts')
  .post(requireAuth, async (req, res) => {
    const posts = await Posts.createPost(req.body, req.user);
    res.json(posts);
  })
  .get(async (req, res) => {
    let posts = {};
    if ('keyword' in req.query) {
      posts = await Posts.search(req.query.keyword);
    } else {
      posts = await Posts.getPosts();
    }
    res.json(posts);
  });

// GET `/posts/:id`: `Posts.getPost`
// PUT `/posts/:id`: `Posts.updatePost`
// DELETE `/posts/:id`: `Posts.deletePost`

router.route('/posts/:id')
  .put(requireAuth, async (req, res) => {
    const updatedPost = await Posts.updatePost(req.params.id, req.body);
    res.json(updatedPost);
  })
  .patch(requireAuth, async (req, res) => {
    const updatedPost = await Posts.updatePost(req.params.id, req.body);
    res.json(updatedPost);
  })
  .get(async (req, res) => {
    try {
      const post = await Posts.getPost(req.params.id);
      res.json(post);
    } catch (error) {
      res.status(404).json({ error });
    }
  })
  .delete(requireAuth, async (req, res) => {
    try {
      const confirmation = await Posts.deletePost(req.params.id);
      res.json(confirmation);
    } catch (error) {
      res.status(404).json({ error });
    }
  });

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = UserController.signin(req.user);
    res.json({ token, email: req.user.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

export default router;
