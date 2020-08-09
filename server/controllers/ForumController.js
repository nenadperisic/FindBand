const express = require("express");
const router = express.Router();
const Forum = require('../models/ForumModel');

router.post('/create', async (req, res) => {
   const title = req.body;
   console.log(title);
   const newForum = Forum({
       title: req.body.title,
       description: req.body.description,
       createdAt: Date.now(),
   });

   await newForum.save();
   res.send(newForum);
});



module.exports = router;