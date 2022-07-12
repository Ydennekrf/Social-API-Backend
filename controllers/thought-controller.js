const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('reactions')
            .then((user) => 
            !user
            ? res.status(404).json({ message: ' no user with that ID '})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    addThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                {new: true }
            );
        })
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'thought created but found no user with the ID'})
        : res.json('Created the post 🎉'))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            {runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'no thought with this ID! '})
        : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId }
        )
        .then((deletedThought) => 
        !deletedThought? res.status(404).json({ message: ' no thought with that ID! '})
        : User.findOneAndUpdate(
            { username: deletedThought.username },
            { $pull: { thoughts: req.params.thoughtId }},
            { new: true }
        ))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: {reactions: req.body }},
            { new: true, }
        )
        .then((reaction) => {
            !reaction ? res.status(404).json({ message: 'no no user found with that ID! '})
            : res.json('Created the reaction! 🎉')
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId },
            { $pull: {reactions: { reactionId: req.params.reactionId }}},
            { new: true }
        )
        .then((reaction) => res.json(reaction))
        .catch((err) => res.json(err));
    },
};

