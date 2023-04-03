const express = require('express');
const router = express.Router();

const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controllers/auth');

const {
    getUserByToken,
    getUserById,
    read,
    update,
    getAllUsers
} = require('../controllers/user');

router.get('/secret', requireSignin, (req, res) => {
    res.json({
        user: 'User routing works'
    });
});

router.get('/user/info', getUserByToken);
router.get('/users/:userId', requireSignin, isAuth, getAllUsers);
router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);


router.param('userId', getUserById);

module.exports = router;
