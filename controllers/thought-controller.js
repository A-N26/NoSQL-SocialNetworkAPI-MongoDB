const { Thoughts, User } = require('../models');

const thoughtController = {
    createThought(req, res) {
        Thoughts.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: req.params.id }, { $push: { Thoughts: _id } }, { new: true });
            })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id.' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },

    // to get all available thoughts.
    getAllThoughts(req, res) {
        Thoughts.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getThoughtById(req, res) {
        Thoughts.findOne({ _id: req.params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id.' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    updateThought(req, res) {
        Thoughts.findOneAndUpdate({ _id: req.params.id }, {$addToSet: req.body}, { new: true, runValidators: true })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id.' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },

    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.id })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    return res.status(404).json({ message: 'No thoughts found with this id.' });
                }
                return User.findOneAndUpdate({ Thoughts: req.params.thoughtId }, { $pull: { Thoughts: req.params.thoughtId } }, { new: true });
            })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    return res.status(404).json({ message: 'No user found with this id.' });
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },

    createReaction(req, res) {
        Thoughts.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { reactions: req.body } }, { new: true, runValidators: true })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id.' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err))
    },

    deleteReaction(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.id }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true, runValidators: true})
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({
                        message: 'No thoughts found with this id.'
                    });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;
