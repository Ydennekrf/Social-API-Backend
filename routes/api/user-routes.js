// get all users

//get user by id

//post new user

// put update user by id

// delete user by id

//bonus cascade delete user thoughts when user deleted

//post add new friend to friend list

// delete remove a friend from friends list
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