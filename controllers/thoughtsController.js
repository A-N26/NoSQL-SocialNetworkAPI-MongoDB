const { Thoughts, Users } = require('../models');

const thoughtsController = {
    createThought({ params, body }, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate({ _id: params.userId }, { $push: { thoughts: _id } }, { new: true });
            })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id.' });
                    return;
                }
                res.json({ message: 'Thought was created successfully.' });
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

    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
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

    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
                res.json({ message: 'Thought updated successfully.' });
            })
            .catch(err => res.json(err));
    },

    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    return res.status(404).json({ message: 'No thoughts found with this id.' });
                }
                return Users.findOneAndUpdate({ thoughtsId: params.id }, { $pull: { thoughts: params.id } }, { new: true });
            })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    return res.status(404).json({ message: 'No user found with this id.' });
                }
                res.json({ message: 'Thought successfully deleted.' });
            })
            .catch(err => res.status(400).json(err));
    },

    createReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtsId }, { $push: { reactions: body } }, { new: true, runValidators: true })
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
                res.json({ message: 'Reaction created.' });
            })
            .catch(err => res.status(400).json(err))
    },

    deleteReaction({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.thoughtsId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({
                        message: 'No thoughts found with this id.'
                    });
                    return;
                }
                res.json({ message: 'Reaction deleted.' });
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtsController;
