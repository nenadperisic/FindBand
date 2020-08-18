const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

// Init func 
router.get('/init', async (req, res) => {
    const token = req.query.token;
    let user = null;
    let response;

    try {
        const userData = jwt.verify(token, 'app');
        user = await User.findById(userData.userId);
    } catch (e) {
        response = null;
    }

    if(user) {
       response = user;
    }

    res.send({user: response});
});


// Reg func 
router.post('/register', async (req, res) => {
    console.log("registracija...")
    // da li user vec postoji sa datim mail-om
    const user = await User.findOne({email: req.body.email});
    console.log(user)
    if(user){
        return res.status(400).send({
            message: "Email already exists"
        });
    }
    const newUser = User({
        accountType: req.body.accountType,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    });

    await newUser.save();
    res.send(newUser);

    return res.status(201);
});

//Login func
router.post('/login', async (req, res) => {
    // da li user  postoji sa datim mail-om
    const user = await User.findOne({email: req.body.email});
    console.log(user);
    if(!user){
        return res.status(400).send({
            message: "Email does not exist"
        });
    }

    //da li je sifra dobra
    const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
    if(!passwordIsEqual) {
        return res.status(401).send({
            message: "Wrong password"
        });
    }

    const token = jwt.sign({userId: user._id}, 'app');
    console.log("token iz log in");
    console.log(token);
    res.send({
        user,
        token
    });
});

// delete account
router.post('/profile/deleteAccount', async (req, res) => {
    console.log(req.body.email);
    try {
        await User.findOneAndDelete( { email: req.body.email });
        console.log("deleted account");
    } catch (e) {
        console.log("delete account failed");
    }
});

// update profile info
router.post('/configure/musician', async (req, res) => {
    // console.log("User:");
    // console.log(req.body);

    await User.updateOne (
        { email: req.body.email },
        {  
            dateOfBirth: req.body.dateOfBirth,
            genres: req.body.genres,
            instruments: req.body.instruments,
            location: req.body.location,
            description: req.body.description,
            professionalAccount: req.body.professionalAccount 
        }
    );

    return res.status(201);
});

router.post('/configure/band', async (req, res) => {
    await User.updateOne (
        { email: req.body.email },
        {  
            name: req.body.name,
            genres: req.body.genres,
            location: req.body.location,
            description: req.body.description,
            professionalAccount: req.body.professionalAccount
        }
    );

    return res.status(201);
});

router.post('/configure/tavern', async (req, res) => {
    await User.updateOne (
        { email: req.body.email },
        {
            name: req.body.name,
            tavernType: req.body.type,
            location: req.body.location,
            description: req.body.description,  
        }
    );

    return res.status(201);
});

module.exports = router;