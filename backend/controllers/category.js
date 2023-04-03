const Category = require("../models/category");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      console.log("name: " + name);
      const board = {
        boardId: req.board._id,
        boardName: req.board.name,
      };
      console.log("board: " + board);

      const category = new Category({ name, board });
      console.log("category: " + category);
      await category.save();
      res.status(200).json({ category, done: true });
    } catch (err) {
      console.log("createCategory " + err);
      res.status(400).json({ error: "Unable to create category", done: false });
    }
  },

  getCategoryById: async (req, res, next, id) => {
    try {
      const category = await Category.findOne({ _id: id });
      req.category = category;
      next();
    } catch (err) {
      res.status(404).json({ error: "No category found" });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find({
        board: { boardId: req.board._id, boardName: req.board.name },
      });
      res.status(200).json({ categories });
    } catch (err) {
      res.status(404).json({ error: "No categories exist" });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await Category.findOneAndUpdate({
        _id: req.category._id,
        name: req.body.name,
      });
      res.status(200).json({ category: updatedCategory, done: true });
    } catch (err) {
      console.log("updatedCategory " + err);
      res.status(400).json({ error: "Unable to update category", done: false });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await req.category.remove();
      res.status(200);
    } catch (err) {
      console.log("deleteCategory " + err);
      res.status(400).json({ error: "Unable to delete the category" });
    }
  },
};