const Board = require("../models/board");
const { errorHandler } = require("../helpers/dbErrorHandler");

module.exports = {
  createBoard: async (req, res) => {
    try {
      console.log(req.body);
      console.log("createBoard");
      const { name, isCompleted } = req.body;
      console.log("name: " + name);
      const createdBy = {
        userId: req.profile._id,
        username: req.profile.username,
      };
      console.log("createdBy: " + createdBy.userId);
      const tickets = req.body.tickets;
      console.log("tickets: " + tickets);
      const finishedAt = req.body.finishedAt;
      const createdAt = req.body.createdAt;
      const board = new Board({
        name,
        createdBy,
        tickets,
        isCompleted,
        createdAt,
        finishedAt,
      });
      console.log("board: " + board);
      await board.save();
      res.status(200).json({ board, done: true });
    } catch (err) {
      res
        .status(400)
        .json({ error: errorHandler(err), done: false });
    }
  },

  // get all tickets from a board
  getAllTicketsFromBoard: async (req, res) => {
    try {
      const board = req.board;
      const tickets = board.tickets;
      res.status(200).json({ tickets });
    } catch (err) {
      res.status(404).json({ error: "No tickets found" });
    }
  },



  getBoardById: async (req, res, next, id) => {
    try {
      const board = await Board.findOne({ _id: id });
      console.log(board);
      req.board = board;
      next();
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "No such board exists" });
    }
  },

  getBoardByName: async (req, res) => {
    try {
      const { name } = req.body;
      const board = await Board.findOne({ name: name });
      console.log(board);
      req.board = board;
      next();
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "No such board exists" });
    }
  },




  getSingleBoard: async (req, res) => {
    res.status(200).json({ board: req.board });
  },

  getAllBoards: async (req, res) => {
    try {
      const boards = await Board.find({});
      res.status(200).json({ boards });
    } catch (err) {
      res.status(404).json({ error: "No boards found" });
    }
  },

  deleteBoard: async (req, res) => {
    try {
      console.log("Trying to delete board");
      console.log(req.board);
      await req.board.remove();
      res.status(200).json({ done: true });
    } catch (err) {
      console.log("deleteBoard" + err);
      res
        .status(400)
        .json({ error: "Unable to delete the board", done: false });
    }
  },

  updateBoard: async (req, res) => {
    try {
      const board = req.board;
      board.name = req.body.name;
      console.log("board.name: " + board.name);
      board.isCompleted = req.body.isCompleted;
      console.log("board.isCompleted: " + board.isCompleted);
      board.tickets = req.body.tickets;
      board.finishedAt = req.body.finishedAt;
      console.log("board.finishedAt: " + board.finishedAt);
      board.retrospective = req.body.retrospective;
      board.review = req.body.review;
      await board.save();
      res.status(200).json({ board });
    } catch (err) {
      console.log("updateBoard : " + err);
      res.status(400).json({ error: "Unable to update the board" });
    }
  },
};