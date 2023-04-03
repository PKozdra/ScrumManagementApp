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

const EditTicket = (props) => {
  const { open, setOpen, ticket, getTickets } = props;
  const { user } = UseAuth();

  const [title, setTitle] = useState(ticket.title);
  const [storyPoints, setStoryPoints] = useState(ticket.storyPoints);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTicket = ticket;
    newTicket.title = title;
    newTicket.storyPoints = storyPoints;
    await updateTicket(user._id, ticket._id, newTicket);
    getTickets();
    setOpen(false);
  };

  const deleteMember = async (userId) => {
    const newTicket = ticket;
    newTicket.users = newTicket.users.filter((user) => user._id !== userId);
    await updateTicket(user._id, ticket._id, newTicket);
    getTickets();
  };

  const UsersField = () => {
    // should return an uneditable field with the users and a button to add more users
    return (
      <div className="mt-2 mb-5">
        <p>Users: </p>
        {ticket.users.map((user) => (
          <div key={user._id}>
            <div>
              {user.username}

              <Button
                onClick={() => deleteMember(user._id)}
                variant="contained"
                color="primary"
                style={{ marginLeft: "10px" }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <MembersList ticket={ticket} getTickets={getTickets} />
      </div>
    );
  };

  const handleDateChange = (props) => {
    // add day to ticket
    if (props == true) {
      const newTicket = ticket;
      let tmpDate = new Date(newTicket.completedAt);
      tmpDate.setDate(tmpDate.getDate() + 1);
      newTicket.completedAt = tmpDate.toISOString();
      updateTicket(user._id, ticket._id, newTicket);
      getTickets();
    }
    else {
      const newTicket = ticket;
      let tmpDate = new Date(newTicket.completedAt);
      tmpDate.setDate(tmpDate.getDate() - 1);
      newTicket.completedAt = tmpDate.toISOString();
      updateTicket(user._id, ticket._id, newTicket);
      getTickets();
    }
  };

  useEffect(() => {
    setTitle(ticket.title);
    setStoryPoints(ticket.storyPoints);
  }, [open]);

  return (
    <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Edit Ticket</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="number"
            value={storyPoints}
            onChange={(e) => setStoryPoints(e.target.value)}
            placeholder="Story Points"
          />
          <input
            type="text"
            value={ticket.status}
            disabled
            placeholder="Status"
          />
          <input
            type="text"
            value={ticket.location}
            disabled
            placeholder="Status"
          />
          <input
            type="text"
            value={ticket.completedAt ? ticket.completedAt : "Not completed"}
            disabled
            placeholder="Completed at"
          />
          <UsersField />
          <Button
            color="primary"
            onClick={() => {
              handleDateChange(true);
            }}
          >
            Add day
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleDateChange(false);
            }}
          >
            Remove day
          </Button>
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

export default EditTicket;
