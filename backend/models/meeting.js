// file for meeting model
// should have field for users in meeting, date started, date ended, and meeting notes

const mongoose = require("mongoose");
require("./user");
const { ObjectId } = mongoose.Schema;

const meetingSchema = new mongoose.Schema(
    {
        users: {
            type: [mongoose.model("User").schema],
            required: false,
            default: [],
        },

        dateStarted: {
            type: Date,
            required: true,
            default: Date.now,
        },

        dateEnded: {
            type: Date,
            required: false,
        },

        meetingNotes: {
            type: String,
            required: false,
            default: "",
        },

        isCompleted: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    { timestamps: true }
);

/*
{
    "_id": ObjectId,
    "users": Array,
    "dateStarted": Date,
    "dateEnded": Date,
    "meetingNotes": String,
    "isCompleted": Boolean
}
*/

module.exports = mongoose.model("Meeting", meetingSchema);

