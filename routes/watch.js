const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Watch = require("../models/Watch");

//Get title details
router.get("/:title_id", (req, res) => {
  Watch.findOne({ title_id: req.params.title_id })
    .then(title => {
      if (title) {
        res.json(title);
      } else {
        res.json({ titlenotfound: "Not available!" });
      }
    })
    .catch(err => {
      res.json({ msg: "Invalid title id passed" }).status(404);
    });
});

//Add titles to the db
router.post("/add", (req, res) => {
  Watch.findOne({ title_id: req.body.title_id })
    .then(title => {
      if (title) return res.status(400).json({ msg: "Title already added!" });
      else {
        const newTitle = new Watch({
          title_id: req.body.title_id,
          title_name: req.body.title_name,
          title_urls: req.body.title_urls,
          title_quality: req.body.title_quality
        });

        newTitle.save().then(addedTitle => {
          res.json(addedTitle).status(200);
        });
      }
    })
    .catch(err => res.json(err));
});

module.exports = router;
