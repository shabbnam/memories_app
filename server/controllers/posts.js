import PostMessage from "../models/postMessage.js";

//get all the posts
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json(error);
  }
};

//create a new post
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    const savedPost = await newPost.save();
    res.send(201).json(savedPost);
  } catch (error) {
    res.send(404).json({message:error.message});
  }
};
