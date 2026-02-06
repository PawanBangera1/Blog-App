const router = require('express').Router();
const User = require('../models/user');
import {
    handleGetAllUsers,
    handleGetUserById,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser
} from '../controllers/user';

router.get('/', handleGetAllUsers);
router.get('/:id', handleGetUserById);
router.post('/', handleCreateUser);
router.put('/:id', handleUpdateUser);
router.delete('/:id', handleDeleteUser);
router.put('/password/:id', handleUpdateUser); // Separate route for password update> {
    handleUpdatePassword

module.exports = router;

