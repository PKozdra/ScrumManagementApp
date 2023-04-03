const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      lowercase: true,
      required: false,
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      required: false,
      default: "todo",
    },

    completedAt: {
      type: Date,
      required: false,
    },


    storyPoints: {
      type: Number,
      required: false,
      default: 1,
    },

    location: {
      type: String,
      enum: ["backlog", "board", "completed"],
      required: false,
      default: "backlog",
    },

    users: {
      type: [
        {
          userId: {
            type: ObjectId,
            ref: "User",
            required: true,
          },

          username: {
            type: String,
            required: true,
          },
        },
      ],
      required: false,
      default: [],
    },
    
    description: {
            type: String,
            required: false,
            default: "",
    },

    createdBy: {
      type: {
        userId: {
          type: ObjectId,
          ref: "User",
          required: true,
        },

        username: {
          type: String,
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);

/*
{
    "_id": ObjectId,
    "title": String,
    "category": String,
    "status": String,
    "completedAt": Date,
    "storyPoints": Number,
    "location": String,
    "users": Array,
    "description": String,
    "createdBy": {
        "userId": ObjectId,
        "username": String
    }
}
*/

module.exports = mongoose.model("Ticket", ticketSchema);