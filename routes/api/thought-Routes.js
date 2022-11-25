const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// to create (post) and delete thoughts.
router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// to create (post) and delete reactions.
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
