const { User, Thought } = require('../models');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single user by its _id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a user by its _id
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a user by its _id
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json({ message: 'User deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single thought by id
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new thought
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a thought by its _id
const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought by its _id
const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json({ message: 'Thought deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
};