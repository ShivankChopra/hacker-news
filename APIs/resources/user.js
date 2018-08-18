const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : String,
    password : String,
    upvotedPosts : [{
        id : String
    }]
});
const User = mongoose.model('User', UserSchema);

module.exports = User;