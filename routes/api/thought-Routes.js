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

// to create(post) thoughts.
router.route('/:userId')
    .post(createThought);

// to get all thoughts.
router.route('/')
    .get(getAllThoughts)

// to get single thought, update(put) and delete.
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// to create (post) and delete reactions.
router
    .route('/:thoughtId/reactions')
    .post(createReaction);
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
