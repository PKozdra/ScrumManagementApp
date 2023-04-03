const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        users: {
            type: [
                {
                    userId: {
                        type: ObjectId,
                        ref: "User",
                        required: true,
                    },
                },
            ],
            required: false,
            default: [],
        },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);