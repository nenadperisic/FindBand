const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    title: String,
    description: String,
    user: String,
    createdAt: Date
});

const Forum = mongoose.model('Forum', ForumSchema);
module.exports = Forum;