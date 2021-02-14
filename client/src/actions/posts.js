import * as api from "../api";

//action creators

//get all posts
export const getPosts = () => async (dispatch, state) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: "FETCH_ALL",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

//create a post
export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);
    dispatch({
      type: "CREATE",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

//update a post
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({
      type: "UPDATE",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
