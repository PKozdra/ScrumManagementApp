const express = require("express");
const router = express.Router();
const {
  createBoard,
  getAllBoards,
  deleteBoard,
  getBoardById,
  updateBoard,
  getBoardByName,
  getAllTicketsFromBoard,
} = require("../controllers/board");

const {
    getUserById
} = require('../controllers/user');

const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controllers/auth');

router.param("userId", getUserById);
router.param("boardId", getBoardById);

router.post("/board/create/:userId", requireSignin, isAuth, createBoard);
router.put("/board/update/:boardId/:userId", requireSignin, isAuth, updateBoard);
router.get("/board/all/:userId", requireSignin, isAuth, getAllBoards);
router.delete("/board/delete/:boardId/:userId", requireSignin, isAuth, deleteBoard);
router.get("/board/get/:boardId/:userId", requireSignin, isAuth, getBoardById);
router.get("/board/getByName/:userId", requireSignin, isAuth, getBoardByName);
router.get("/board/getAllTickets/:boardId/:userId", requireSignin, isAuth, getAllTicketsFromBoard);



module.exports = router;