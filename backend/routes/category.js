const express = require("express");
const router = express.Router();

const {
  createCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
} = require("../controllers/category");

const { getBoardById } = require("../controllers/board");

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

router.param("userId", getUserById);
router.param("boardId", getBoardById);

router.post(
    "/:boardId/:userId",
    requireSignin,
    isAuth,
    createCategory
);

router.get(
  "/all/:boardId/:userId",
  requireSignin, isAuth,
  getAllCategories
);

module.exports = router;