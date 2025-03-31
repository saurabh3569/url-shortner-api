const express = require("express");
const Url = require("../models/url.model");
const redis = require("../configs/redis");
const router = express.Router();
const tinyUrl = "https://tinyurl.com/";
const alphaNumeric =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const shortLength = 6;

const isValidUrl = (url) => {
  const regex =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
  return regex.test(url);
};

const concatUrl = (short) => {
  return tinyUrl + short;
};

const generateShortUrl = () => {
  let short = "";

  for (let i = 0; i < shortLength; i++) {
    const random = Math.round(Math.random() * alphaNumeric.length);
    short += alphaNumeric[random];
  }

  return short;
};

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.send("Url Required");
    }

    if (!isValidUrl(url)) {
      return res.send("Invalid URL format");
    }

    const urlExist = await Url.findOne({ long: url });

    if (urlExist) {
      return res.send(concatUrl(urlExist.short));
    }

    let exists = false;

    let short = "";
    do {
      short = generateShortUrl();
      exists = await Url.exists({ short });
    } while (exists);

    const savedUrl = new Url({ long: url, short });
    await savedUrl.save();
    await redis.set(short, url, "EX", 60);
    return res.send(concatUrl(savedUrl.short));
  } catch (error) {
    return res.send("Invalid Url");
  }
});

router.get("/:short", async (req, res) => {
  const { short } = req.params;

  if (!short) {
    return res.send("Short Required");
  }

  let urlExist = await redis.get(short);

  if (urlExist) {
    return res.redirect(urlExist);
  }

  urlExist = await Url.findOne({ short });

  if (!urlExist) {
    return res.status(404).json("Url Not Found");
  }

  await redis.set(short, urlExist.long, "EX", 60);

  return res.redirect(urlExist.long);
});

module.exports = router;
