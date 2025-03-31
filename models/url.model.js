const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  short: { type: String, required: true },
  long: { type: String, required: true },
});

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
