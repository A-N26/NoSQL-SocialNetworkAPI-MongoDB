const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// to create (post) and delete thoughts.
router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtsId').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

// to create (post) and delete reactions.
router.route('/:thoughtsId/reactions').post(createReaction);
router.route('/:thoughtsId/reactions/:reactionsId').delete(deleteReaction);

module.exports = router;
