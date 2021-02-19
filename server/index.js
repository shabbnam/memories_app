import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import PostRoute from "./routes/posts.js";
import dotenv from "dotenv"

const app = express();
dotenv.config()
app.use(cors());
app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use("/posts", PostRoute);

const CONNECTION_URL ="mongodb+srv://shabnam:shabnam@cluster0.tvbfg.gcp.mongodb.net/memories?retryWrites=true&w=majority";
const PORT = process.env.port || 4000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(4000, () => {
      console.log(`app listening on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
