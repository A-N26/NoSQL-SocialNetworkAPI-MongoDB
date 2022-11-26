const { User, Thoughts } = require('../models');

const userController = {
    createUser({body}, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, {$set: req.body}, { new: true, runValidators: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((dbUserData)=> {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id.' });
                }
                return Thoughts.deleteMany({ _id: { $in: dbUserData.thoughts } });
            })
            .then(() => {
                res.json({ message: 'the user and their associated thoughts have been deleted.' });
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { friends: req.params.friendId } }, { new: true, runValidators: true })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: req.params.friendId } }, { new: true })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;
