// get all users

//get user by id

//post new user

// put update user by id

// delete user by id

//bonus cascade delete user thoughts when user deleted

//post add new friend to friend list


const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find({})
        .sort({ _id: -1})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId})
        .select('-__v')
        .populate({
            path: 'friends',
        })
        .populate({
            path: 'thoughts',
        })
        .then((users) => 
        !users
        ? res.status(404).json({ message: 'no user with that ID'})
        : res.json(users)
        )
        .catch((err) => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },
    updateUser(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {runValidators: true, new: true }
            )
            .then((user) => 
            ! user
            ? res.status(404).json({ message: 'no user with this ID!'})
            : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteUser(req, res) {
        User.findByIdAndRemove(
            { _id: req.params.userId }
        )
        .then((users) => 
        !users
        ? res.status(404).json({ message: 'no users with that ID!'})
        : res.json(users)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $push: {friends: req.params.friendId }},
            { new: true, runValidators: true }
        )
        .then((users) =>
        !users
        ? res.status(404).json({ message: ' no users with that ID!'})
        : res.json(users)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            {new: true }
        )
        .then((users) => 
        !users
        ? res.status(404).json({ message: ' no users with that ID!'})
        : res.json(users)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

    },
}

