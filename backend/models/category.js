const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },

    board: {
      type: {
        boardId: {
          type: ObjectId,
          ref: "Board",
          required: true,
        },

        boardName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);