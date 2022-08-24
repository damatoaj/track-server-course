const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//keyword function is to scope the function to the user 'this'
userSchema.pre('save', function() {
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err,salt) => {
        if (err) {
            return next(err);
        };

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            };

            user.password = hash;
            next();
        });
    });
});

mongoose.model('User', userSchema);

