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

// to get and create (post) users.
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// to get single user, update(put) and delete.
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// to create (post) and delete a friends.
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
