const express = require("express");
const router = express.Router();

const { getBoardById } = require("../controllers/board");
const {
    getUserById
} = require('../controllers/user');

const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controllers/auth');

const { createTicket, getAllTickets, deleteTicket, getTicketById, updateTicket, getUnassignedTickets, toggleSprint, getAssignedTickets } = require("../controllers/ticket");

router.param("boardId", getBoardById);
router.param("userId", getUserById);

router.post("/ticket/create/:userId", requireSignin, isAuth, createTicket);
router.get("/ticket/all/:userId", requireSignin, isAuth, getAllTickets);
router.put("/ticket/:ticketId/:userId", requireSignin, isAuth, updateTicket);
router.delete("/ticket/delete/:ticketId/:userId", requireSignin, isAuth, deleteTicket);
router.get("/ticket/get/:ticketId/:userId", requireSignin, isAuth, getTicketById);
router.get("/ticket/unassigned/:userId", requireSignin, isAuth, getUnassignedTickets);
router.get("/ticket/assigned/:userId", requireSignin, isAuth, getAssignedTickets);
router.put("/ticket/toggleSprint/:ticketId/:userId", requireSignin, isAuth, toggleSprint);


module.exports = router;