const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    title: String,
    description: String,
    user: String,
    accountType: String,
    location: String,
    instrument: String,
    genre: String,
    type: String,
    averageAge: Array,
    createdAt: Date
});

const Forum = mongoose.model('Forum', ForumSchema);
module.exports = Forum;