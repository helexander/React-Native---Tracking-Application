const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

userSchema.pre('save', function (next) {
    // User would be equal to this user we are CURRENTLY OPERATING on
    // If an arrow function is used instead, the value of 'this' would be equivalent to the context of the file
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }

            if (!isMatch) {
                return reject(false);
            }

            resolve(true);
        });
    });
}

// To associate with mongoose library
mongoose.model('User', userSchema);