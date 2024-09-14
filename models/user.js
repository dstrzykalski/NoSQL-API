const { Schema, model } = require('mongoose');

// Builds the user schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// Counts User's friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Create the User model
const User = model('User', userSchema);

module.exports = User;