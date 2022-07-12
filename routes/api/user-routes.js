
const router = require('express').Router();

const{getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/user-controller');

// /api/users

router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;




module.exports = router;