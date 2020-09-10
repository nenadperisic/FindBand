const express = require('express');
const router = express.Router();
const { Rating } = require("../models/RatingModel");

const User = require('../models/UserModel');

router.post("/getRatings", async (req, res) => {
    
    const ratings =  await User.findOne({email: req.body.ratedId});
    console.log("Get ratings: ")
    console.log(ratings.rating)
    
    if(ratings.rating.length === 0){
        return res.status(201).send({result: 0});
    }else {
        const average = ratings.rating.reduce((a, b) => (a + b)) / ratings.rating.length;
        console.log(average)
        return res.status(201).send({result: average});
    }
    
    
});

router.post("/rate", async (req, res) => {
    console.log(req.body.ratedId)
    console.log(req.body.raterId)
    console.log(req.body.rating)
    variable = { ratedId: req.body.ratedId, raterId: req.body.raterId, rating: req.body.rating }
    const checkIsRated = await Rating.findOne({ratedId: req.body.ratedId, raterId: req.body.raterId});
    // console.log(checkIsRated)
    if(checkIsRated !== null){
        return res.status(401).send({result: "You have already rated this profile."});
    }else {
        console.log("not rated") 
        const rating = new Rating(variable)
        rating.save();
        await User.update({email :req.body.ratedId}, { $push: { rating: req.body.rating } });
    }
    
    res.send();
});



module.exports = router;