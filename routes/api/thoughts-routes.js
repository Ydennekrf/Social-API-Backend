const router = require('express').Router();
const {getThoughts, getThoughtById, addThought, updateThought, deleteThought, createReaction, deleteReaction} = require('../../controllers/thought-controller');

// api/thoughts/

router.route('/').get(getThoughts).post(addThought);

//api/thoughts/:id

router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions

router.route('/:thoughtId/reactions').post(createReaction);

// api/thought/:thoughtId/reactions/:reactionId

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router