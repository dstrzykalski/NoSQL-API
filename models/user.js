const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            max_length: 10,
            min_length: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts: {

        },
        friends: {

        }
    }
);

const User = model('user', userSchema);

module.exports = User;
