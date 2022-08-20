import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import validate from "./validate";
import userSchema from "./user-schema";

dotenv.config();

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.json("Welcome to validation app!");
});

app.post("/user", validate(userSchema), (req, res) => {
  console.log("passed schema validation and inside actual controller");
  res.json({body: req.body});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
