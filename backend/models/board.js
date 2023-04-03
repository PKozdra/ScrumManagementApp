const mongoose = require("mongoose");
require("./category");
require("./ticket");
require("./meeting");
const { ObjectId } = mongoose.Schema;

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },

    isCompleted: {
      type: Boolean,
      required: false,
      default: false,
    },

    // retrospective, review
    retrospective: {
      type: [mongoose.model("Meeting").schema],
      required: false,
      default: "",
    },

    review: {
      type: [mongoose.model("Meeting").schema],
      required: false,
      default: "",
    },

    createdBy: {
      type: {
        userId: {
          type: ObjectId,
        },

        username: {
          type: String,
          required: true,
        },
      },
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    finishedAt: {
      type: Date,
    },

    tickets: {
      type: [mongoose.model("Ticket").schema],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

/*
{
    "_id": ObjectId,
    "name": String,
    "isCompleted": Boolean,
    "retrospective": Array,
    "review": Array,
    "createdBy": {
        "userId": ObjectId,
        "username": String
    },
    "createdAt": Date,
    "finishedAt": Date,
    "tickets": Array
}
*/

module.exports = mongoose.model("Board", boardSchema);
