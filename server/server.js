const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use('/api/user', require('./controllers/UserController')); 
app.use('/api/forum', require('./controllers/ForumController')); 
// app.use('/api/bands', require('./controllers/BandController')); 


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/build/index.html"));
});


app.listen(5000, () => console.log("Server started on port 5000"));