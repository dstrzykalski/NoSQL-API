const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require('../controllers/thoughtController');

// GET all thoughts
router.get('/', getThoughts);

// GET a single thought by its _id
router.get('/:id', getThoughtById);

// POST a new thought
router.post('/', createThought);

// PUT to update a thought by its _id
router.put('/:id', updateThought);

// DELETE a thought by its _id
router.delete('/:id', deleteThought);

module.exports = router;