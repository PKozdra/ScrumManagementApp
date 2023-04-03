const Ticket = require("../models/ticket");

module.exports = {
  createTicket: async (req, res) => {
    console.log("createTicket");
    console.log(req.body);
    try {
      const {
        title,
        storyPoints,
        isSprint,
        category,
        description,
        status,
        location,
        completedAt,
      } = req.body;
      console.log("title: " + title);
      console.log("storyPoints: " + storyPoints);
      console.log("category: " + category);
      console.log("description: " + description);
      console.log("status: " + status);
      console.log("location: " + location);
      const createdBy = {
        userId: req.profile._id,
        username: req.profile.username,
      };
      console.log("createdBy: " + createdBy.userId);
      console.log("createdBy: " + createdBy.username);

      const ticket = new Ticket({
        title,
        storyPoints,
        isSprint,
        createdBy,
        category,
        description,
        status,
        location,
        completedAt,
      });
      await ticket.save();
      res.status(200).json({ ticket, done: true });
    } catch (err) {
      console.log("createTicket" + err);
      res.status(400).json({
        error: "Unable to create a new ticket. Try again later",
        done: false,
      });
    }
  },

  getTicketById: async (req, res, next, id) => {
    try {
      const ticket = await Ticket.findOne({ _id: id });
      req.ticket = ticket;
      next();
    } catch (err) {
      res.status(404).json({ error: "No such ticket exists" });
    }
  },

  getAllTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find({});
      res.status(200).json({ tickets });
    } catch (err) {
      res.status(404).json({ error: "No tickets exist" });
    }
  },

  // get all tickets that have no board
  getUnassignedTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find({ location: "backlog" });
      res.status(200).json({ tickets });
    } catch (err) {
      res.status(404).json({ error: "No tickets exist" });
    }
  },

  // get tickets that are in board location
  getAssignedTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find({ location: "board" });
      res.status(200).json({ tickets });
    } catch (err) {
      res.status(404).json({ error: "No tickets exist" });
    }
  },

  updateTicket: async (req, res) => {
    try {
      console.log("updateTicket");
      console.log(req.body);
      // if new completedAt date is provided, set completedAt to that date
      if (req.body.completedAt) {
        req.body.completedAt = Date.parse(req.body.completedAt);
      } else if (req.body.status === "done") {
        req.body.completedAt = Date.now();
      } else {
        req.body.completedAt = null;
      }
      const updatedTicket = await Ticket.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        { new: true }
      );
      console.log("updatedTicket: " + updatedTicket);
      res.status(200).json({ ticket: updatedTicket, done: true });
    } catch (err) {
      console.log("updateTicket " + err);
      res.status(400).json({ error: "Unable to update ticket", done: false });
    }
  },

  deleteTicket: async (req, res) => {
    try {
      console.log("deleteTicket");
      const ticket = await Ticket.findOneAndDelete({
        _id: req.params.ticketId,
      });
      console.log("awaited ticket: " + ticket);
      res.status(200).json({ ticket, done: true });
    } catch (err) {
      console.log("deleteTicket " + err);
      res.status(400).json({ error: "Unable to delete ticket", done: false });
    }
  },

  // flip the isSprint boolean
  toggleSprint: async (req, res) => {
    try {
      console.log("toggleSprint");
      const ticket = await Ticket.findOne({ _id: req.params.ticketId });
      console.log("awaited ticket: " + ticket);
      ticket.location = ticket.location === "backlog" ? "board" : "backlog";
      await ticket.save();
      res.status(200).json({ ticket, done: true });
    } catch (err) {
      console.log("toggleSprint " + err);
      res.status(400).json({ error: "Unable to toggle sprint", done: false });
    }
  },
};
