// dialog for adding users to a ticket

import React, { useState, useEffect } from "react";

import UseAuth from "../../hooks/UseAuth";

import axios from "../../api/axios";

import { getAllUsers } from "../../actions/userActions";

import { Button } from "@material-ui/core";

import Select from "react-select";

import { updateTicket } from "../../actions/ticketActions";

const MembersList = (props) => {
  const [open, setOpen] = React.useState(false);
  const { user } = UseAuth();

  const [availableUsers, setAvailableUsers] = useState([]);
  const [chosenUser, setChosenUser] = useState([]);

  const { ticket, getTickets } = props;

  const handleClickOpen = () => {
    console.log("handleClickOpen");
    setOpen(true);
    // value / label into userId / userName
    const userId = chosenUser.value;
    const userName = chosenUser.label;
    // add the user to the ticket
    const newUser = {
      userId: userId,
      username: userName,
      };
      
      if (newUser.userId === undefined) return;
      if (newUser.username === undefined || newUser.username === null) return;

    console.log("newUser:", newUser);

    const newUsers = ticket;

    newUsers.users = [...newUsers.users, newUser];

    // update the ticket
    updateTicket(user._id, ticket._id, newUsers);

      populateAvailableUsers();
        getTickets();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const populateAvailableUsers = async () => {
    // should populate the available users
    // should not include the users that are already assigned to the ticket

    const res = await getAllUsers(user._id);

    // get users from ticket

    const ticketUsers = ticket.users.map((user) => {
      return user.userId;
    });

    // filter out users that are already assigned to the ticket
    const filteredUsers = res.data.filter((user) => {
      return !ticketUsers.includes(user._id);
    });

    // map the users to the format that react-select needs
    const users = filteredUsers.map((user) => {
      return {
        value: user._id,
        label: user.name,
      };
    });

    setAvailableUsers(users);
    console.log("availableUsers:", users);
  };

  useEffect(() => {
    populateAvailableUsers();
  }, []);

  const handleChange = (e) => {
    setChosenUser(e);
    console.log("chosenUser:", chosenUser);
  };

  return (
    <div>
      <Select
        options={availableUsers}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add User
      </Button>
    </div>
  );
};

export default MembersList;
