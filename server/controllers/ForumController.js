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
        accountType: req.body.accountType,
        instruments: req.body.instruments,
        genres: req.body.genres,
        createdAt: Date.now()
   });
   console.log("Account type:")
   console.log(req.body.accountType);
   await newForum.save();
   res.send(newForum);
});

router.get('/getMusicians', async (req, res) => {
    console.log(req.query.accountType);
    /* use this to select based on checked filters */
    const query = await Forum.find({ accountType : "musician"}); /* .select({title: "rock"}); */
    // console.log(query);

    res.send(query);
 });

 router.get('/getMusiciansFilter', async (req, res) => {
    console.log(req.query.genres);
    console.log(req.query.instruments);
    /* use this to select based on checked filters */
    if (req.query.genres === undefined && req.query.instruments === undefined ) {
        console.log("nista nije stiklirano");
        const query = await Forum.find({ accountType : "musician"});
        res.send(query);
    } else if(req.query.genres === undefined) {
        console.log("samo instrumenti");
        const query = await Forum.find({ accountType : "musician", instruments: req.query.instruments});
        res.send(query);
    } else if(req.query.instruments === undefined) {
        console.log("samo zanrovi");
        const query = await Forum.find({ accountType : "musician", genres: req.query.genres});
        res.send(query);
    } else  {
        console.log("stiklirani instrumenti i zanrovi");
        const query = await Forum.find({ accountType : "musician", instruments: req.query.instruments, genres: req.query.genres});
        res.send(query);
    }

    // const query = await Forum.find({ accountType : req.query.accountType, instruments: req.query.instruments, genres: req.query.genres});
    

    // res.send(query);
 });



module.exports = router;