import React, { useState, useEffect } from "react";
import useStyles from "./styles.js";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

function Form({ currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const post = useSelector(({ posts }) =>
    currentId ? posts.find((p) => p._id === currentId) : null
  );

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const clear = (e) => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      creator: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Edit` : `Create`} a memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="creator"
          fullWidth
          value={postData.creator}
          onChange={handleChange}
        ></TextField>
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={handleChange}
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          color="primary"
          variant="contained"
          type="submit"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button color="secondary" variant="contained" onClick={clear} fullWidth>
          clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
