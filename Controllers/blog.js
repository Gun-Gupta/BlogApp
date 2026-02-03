import { Blog } from '../models/index.js';

/* HOME PAGE */
export const gethome = (req, res) => {
  res.render('home');
};

/* ALL BLOGS (LOGGED-IN USER) */
export const getblogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { userId: req.user.id },
      raw: true
    });

    res.render('bloghome', { blogs });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching blogs');
  }
};

/* SINGLE / ALL POSTS VIEW */
export const getposts = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { userId: req.user.id },
      raw: true
    });

    if (!blogs.length) {
      return res.status(404).send('No posts found');
    }

    res.render('blogPost', { blog: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error loading posts');
  }
};

/* SHOW CREATE BLOG PAGE */
export const showCreateBlog = (req, res) => {
  res.render('createBlog');
};

/* CREATE BLOG */
export const createBlog = async (req, res) => {
  try {
    const { title, slug, content } = req.body;

    await Blog.create({
      title,
      slug,
      content,
      userId: req.user.id
    });

    res.redirect('/blog');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating blog');
  }
};

/* EDIT BLOG PAGE */
export const editBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      raw: true
    });

    if (!blog) return res.status(404).send('Post not found');

    res.render('editBlog', { blog });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error loading edit page');
  }
};

/* UPDATE BLOG */
export const updateBlog = async (req, res) => {
  try {
    const { title, slug, content } = req.body;

    await Blog.update(
      { title, slug, content },
      {
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      }
    );

    res.redirect('/blog');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating blog');
  }
};

/* DELETE BLOG */
export const deleteBlog = async (req, res) => {
  try {
    await Blog.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    res.redirect('/blog');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting blog');
  }
};
