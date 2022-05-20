import Post from '../models/post_model';

export async function createPost(postFields, author) {
  const post = new Post();
  post.title = postFields.title;
  if ('content' in postFields) {
    post.content = postFields.content;
  }
  if ('coverUrl' in postFields) {
    post.coverUrl = postFields.coverUrl;
  }
  if ('tags' in postFields) {
    post.tags = postFields.tags;
  }
  post.author = author.userName;
  try {
    const savedpost = await post.save();
    return savedpost;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
}
export async function getPosts() {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    throw new Error(`get post error: ${error}`);
  }
}
export async function getPost(id) {
  try {
    const post = await Post.findById({ _id: id });
    if (post == null) {
      throw new Error('get post error');
    }
    return post;
  } catch (error) {
    throw new Error(`get post error: ${error}`);
  }
}
export async function deletePost(id) {
  try {
    const confirmation = await Post.deleteOne({ _id: id });
    return confirmation;
  } catch (error) {
    throw new Error(`delete post error: ${error}`);
  }
}
export async function updatePost(id, postFields) {
  const post = await Post.findOne({ _id: id });
  if (post == null) {
    throw new Error('get post error');
  }
  if ('title' in postFields) {
    post.title = postFields.title;
  }
  if ('content' in postFields) {
    post.content = postFields.content;
  }
  if ('coverUrl' in postFields) {
    post.coverUrl = postFields.coverUrl;
  }
  if ('tags' in postFields) {
    post.tags = postFields.tags;
  }
  try {
    const updatedPost = await post.save();
    return updatedPost;
  } catch (error) {
    throw new Error(`update post error: ${error}`);
  }
}

export async function search(query) {
  try {
    const searchedObjects = await Post.find({ $text: { $search: query } });
    return searchedObjects;
  } catch (error) {
    throw new Error(`search post error: ${error}`);
  }
}
