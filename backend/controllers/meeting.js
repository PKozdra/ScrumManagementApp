//controller for meeting

const Meeting = require("../models/meeting");

exports.createMeeting = async (req, res) => {
    const { users, dateStarted, dateEnded, meetingNotes } = req.body;

    const meeting = new Meeting({
        users,
        dateStarted,
        dateEnded,
        meetingNotes,
        isCompleted,
    });

    meeting.save((err, meeting) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to create meeting",
            });
        }
        res.json(meeting);
    });
};

exports.getMeetings = async (req, res) => {
    Meeting.find().exec((err, meetings) => {
        if (err) {
            return res.status(400).json({
                error: "No meetings found",
            });
        }
        res.json(meetings);
    });
}

exports.updateMeeting = async (req, res) => {
    const meeting = req.meeting;
    meeting.save((err, updatedMeeting) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to update meeting",
            });
        }
        res.json(updatedMeeting);
    });
};

// delete meeting
exports.deleteMeeting = async (req, res) => {
    const meeting = req.meeting;
    meeting.remove((err, meeting) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to delete meeting",
            });
        }
        res.json({
            message: "Meeting deleted successfully",
        });
    });
};

// get meeting by id
exports.getMeetingById = async (req, res, next, id) => {
    try {
        const meeting = await Meeting.findOne({ _id: id });
        req.meeting = meeting;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ error: "No such meeting exists" });
    }
};





