const { mongoose } = require('mongoose').Types;
const { router } = require('express');
const { Thought, User } = require('../models');

const headCount = async () => {
  const numberOfThoughts = await Thought.aggregate()
    .count('thoughtCount');
  return numberOfThoughts;
}

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'Error' })
      }

      res.json({
        thought
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Error' });
      }

      const checkThought = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!checkThought) {
        return res.status(404).json({
          message: 'Error',
        });
      }

      res.json({ message: 'Success' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {
        $set: req.body
      });

      if (!thought) {
        return res.status(404).json({ message: 'Error' });
      }

      res.json({ message: 'Success' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No Thought Found' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
