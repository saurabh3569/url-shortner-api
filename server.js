require("dotenv").config();
const express = require("express");
const connectDB = require("./configs/db");
const urlRoute = require("./routes/url.route");

const app = express();

app.use(express.json());

app.use("/url", urlRoute);

app.listen(5000, async () => {
  await connectDB();
  console.log("server started..");
});
