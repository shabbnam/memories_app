import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

//get all the posts
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
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
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.send(404).json({ message: error.message });
  }
};

//update a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No record with that id");

  const post = req.body;
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No record with that id");
  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "post deleted successfully" });
};
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId(id))
    return res.status(404).json("no record with the ID ");
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};
