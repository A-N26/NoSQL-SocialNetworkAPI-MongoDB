const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/usersController');

// to create (post) and delete users
router.route('/').get(getAllUsers).post(createUsers);
router.route('/:userId').get(getUsersById).put(updateUsers).delete(deleteUsers);

// to create (post) and delete a friend by ID.
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
