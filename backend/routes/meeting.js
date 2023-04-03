// routing for meeting

const express = require("express");
const router = express.Router();

const {
    createMeeting,
    deleteMeeting,
    updateMeeting,
    getMeetings,
    getMeetingById,
} = require("../controllers/meeting");

const {
    getUserById,
    read,
    update
} = require('../controllers/user');

const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controllers/auth');

router.param("meetingId", getMeetingById);
router.param("userId", getUserById);

router.post(
    "/meeting/create/:userId",
    requireSignin,
    isAuth,
    createMeeting
);

router.get(
    "/meeting/all/:userId",
    requireSignin,
    isAuth,
    getMeetings
);

router.put(
    "/meeting/update/:meetingId/:userId",
    requireSignin,
    isAuth,
    updateMeeting
);

router.delete(
    "/meeting/delete/:meetingId/:userId",
    requireSignin,
    isAuth,
    deleteMeeting
);



module.exports = router;