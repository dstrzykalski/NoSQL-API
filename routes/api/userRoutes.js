const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// GET all users
router.get('/', getUsers);

// GET a single user by its _id
router.get('/:id', getUserById);

// POST a new user
router.post('/', createUser);

// PUT to update a user by its _id
router.put('/:id', updateUser);

// DELETE a user by its _id
router.delete('/:id', deleteUser);

module.exports = router;