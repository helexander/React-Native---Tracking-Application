const mongoose = require('mongoose');

// The schema is to communicate to mongoose the structure that every user should have
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        // This flag indicates to mongoose that every email in the user's collection is unique
        // An error message would appear if the user's email already exists 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// To associate with mongoose library
mongoose.model('User', userSchema);