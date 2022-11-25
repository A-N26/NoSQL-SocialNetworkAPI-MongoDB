const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// to create (post) and delete users
router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// to create (post) and delete a friend by ID.
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
