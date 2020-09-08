const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const randomstring = require("randomstring");

var secretToken;

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
    if (user) {
        return res.status(400).send({
            message: "Email already exists"
        });
    }

    const newUser = User({
        accountType: req.body.accountType,
        email: req.body.email,
        password: req.body.password,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        secretToken: '',
        active: false,
        role: 'user'
    });

    newUser.secretToken = secretToken;
    console.log(newUser)
    await newUser.save();
    res.send(newUser);

    return res.status(201);
});

//verify func
router.post('/verify', async (req, res) => {
    // da li user  postoji sa datim mail-om
    const user = await User.findOne({email: req.body.email});
    console.log(user);
    
    if (!user) {
        return res.status(400).send({
            message: "Email does not exist"
        });
    }
    console.log(req.body.email)

    if (user.secretToken === req.body.code){
        console.log("Verification complete!");
        
        await User.updateOne (
            { email: req.body.email },
            {  
                $set: { active: true }
            });
        
        const path = "/profile/" + user.accountType;
        console.log(path)
        return res.send({
            message: path
        });    
    } else {
        console.log("Bad verification code!");
        return res.status(401).send({
            message: "Bad verification code!"
        });
    }
});

// delete account
router.post('/profile/deleteAccount', async (req, res) => {
    console.log(req.body.email);
    try {
        await User.findOneAndDelete( { email: req.body.email });
        // console.log("Account deleted");
        return res.status(200).send({
            message: "Account deleted"
        });
    } catch (e) {
        console.log("Failed to delete", req.body.email);
        return res.status(500).send({
            message: "Failed to delete account"
        });
    }
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

// update profile info for musician
router.post('/configure/musician', async (req, res) => {
    await User.updateOne (
        { email: req.body.email },
        {  
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            genres: req.body.genres,
            instruments: req.body.instruments,
            location: req.body.location,
            description: req.body.description,
            professionalAccount: req.body.professionalAccount 
        }
    );

    return res.status(201).send({
        message: "configured!"
    });
});

// update profile info for band
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

    return res.status(201).send({
        message: "configured!"
    });
});

// update profile info for tavern
router.post('/configure/tavern', async (req, res) => {
    await User.updateOne (
        { email: req.body.email },
        {
            name: req.body.name,
            tavernType: req.body.tavernType,
            location: req.body.location,
            description: req.body.description,  
        }
    );

    return res.status(201).send({
        message: "configured!"
    });
});

router.post('/profile/musician', async(req, res) => {
    const query = await User.find({email: req.body.email});
    res.send(query);
});

router.post('/profile/band', async(req, res) => {
    const query = await User.find({email: req.body.email});
    res.send(query);
});

router.post('/profile/tavern', async(req, res) => {
    const query = await User.find({email: req.body.email});
    res.send(query);
});

router.post('/get/user/data', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    
    if (!user) {
        return res.status(400).send({
            message: "Email does not exist"
        });
    }

    res.send({user});
});

router.post('/get/bandMembers', async (req, res) => {
    let members = [];
    for (let e of req.body.bandMembers) {
        const user = await User.findOne({ email: e });
    
        if (!user) {
            members.push('Account deleted');
        } else {
            members.push(user.name);
        }
    }

    res.send({members});
    return res.status(200);
});


var smtpTransport = nodemailer.createTransport({    
    service: "Gmail",
    auth: {
        user: "shone9611@gmail.com",
        pass: "xdznmesueucetady"
    }
});

var mailOptions, link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

router.post('/send', function (req, res) {
    secretToken = randomstring.generate();
    mailOptions = {
        to: req.body.email,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please enter following verification code to finish registration.<br><p>" + secretToken + "</p>"
    }
    console.log("Salje mail")
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.send("error");
        } else {
            // res.send("sent");
            res.send("sent");
        }
    });
});

router.post("/update/member/list", async (req, res) => {
    await User.updateOne (
        { email: req.body.email },
        {
            bandMembers: req.body.bandMembers 
        }
    );

    return res.status(201).send({
        message: "member list updated!"
    });
});

router.post("/musician/exists/", async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (user && user.accountType === "musician") {
        return res.status(200).send({
            indicator: true
        });
    } else {
        return res.status(200).send({
            indicator: false
        });
    }
});

module.exports = router;