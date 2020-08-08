const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs")

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
    console.log("ne postoji taj user");
    const newUser = User({
        accountType: req.body.accountType,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    });

    await newUser.save();

    return res.status(201);    
});

//Login func
router.post('/login', async (req, res) => {
    // da li user  postoji sa datim mail-om
    const user = await User.findOne({email: req.body.email});
    console.log(user)
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

    res.send({
        user,
        token
    });
});
 
module.exports = router;