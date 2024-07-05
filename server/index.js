import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import admin from "./firebase.js";
import UserModel from "./models/user.js";
import smmryRoutes from "./routes/smmryRoutes.js";

const app = express();
//enable us to send post req
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
); //enables cross origin req
app.use(express.json());

app.use("/smmries", smmryRoutes);

config(); //access to env
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
}

app.post("/api/protected", verifyToken, async (req, res) => {
  const { uid, name, email, picture } = req.user;

  let user = await UserModel.findOne({ uid });

  if (!user) {
    user = new UserModel({ uid, name, email, picture });
    await user.save();
  }

  res.send(user);
});

//connect database
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json("hello");
});
