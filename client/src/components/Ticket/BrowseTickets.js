// dialog for editing ticket

import React, { useState, useEffect } from "react";

import UseAuth from "../../hooks/UseAuth";

// import dialog from material ui
import Dialog from "@material-ui/core/Dialog";

// import dialog title from material ui
import DialogTitle from "@material-ui/core/DialogTitle";

// import dialog content from material ui
import DialogContent from "@material-ui/core/DialogContent";

// import dialog actions from material ui
import DialogActions from "@material-ui/core/DialogActions";

import { updateTicket } from "../../actions/ticketActions";

import Button from "@material-ui/core/Button";

import Select from "react-select";

import { getAllUsers } from "../../actions/userActions";

import MembersList from "./Members";

// dialog should be able to edit ticket title, asignees and story points

const BrowseTickets = (props) => {
  const { open, setOpen, tickets, board } = props;
  const { user } = UseAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const getUsers = (ticket) => {
    let users = "";
    ticket.users.forEach((user) => {
      users += user.username + ", ";
    });
    return users;
  };

  const TasksField = () => {
    // should return an uneditable field with the users and a button to add more users
    return (
      <div className="mt-2 mb-5">
        <p>Tickets: </p>
        {console.log(tickets)}
        {tickets.map((ticket) => (
          <div key={ticket._id}>
            <div className="mt-2 mb-2">
              <p>
                {ticket.title}, {ticket.storyPoints} story points. Users:{" "}
                {getUsers(ticket)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {}, [open]);

  return (
    <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Browse Sprint: {board.name}</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => onSubmit(e)}>
          <TasksField />
          <div>Review: {board.review ? board.review : "No review"}</div>
          <div>Retrospective: {board.retrospective ? board.retrospective : "No retrospective"}</div>
          <DialogActions>
            <Button type="submit" color="primary">
              Accept
            </Button>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrowseTickets;
