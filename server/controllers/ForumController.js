const express = require("express");
const router = express.Router();
const Forum = require('../models/ForumModel');

router.post('/create', async (req, res) => {

    const token = req.query.token;
    console.log(token);
    const newForum = Forum({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        createdAt: Date.now(),
   });

   await newForum.save();
   res.send(newForum);
});

router.get('/:id', async (req, res) => {
    const forum = await Forum.findById("5f3251e1acb00a0d20a5d88b");
    if (!forum) {
        console.log("forum not found")
    }
    res.send(forum);
 });



module.exports = router;