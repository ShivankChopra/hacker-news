const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    articleId : String,
    score : Number
});
const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;