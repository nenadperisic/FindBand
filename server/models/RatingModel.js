const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = mongoose.Schema({
   raterId: {
       type: Schema.Types.String,
       ref: 'User'
   },
   ratedId: {
       type: Schema.Types.String,
       ref: 'Forum'
   },
   rating: Number

}, { timestamps: true })


const Rating = mongoose.model('Rating', ratingSchema);

module.exports = { Rating }