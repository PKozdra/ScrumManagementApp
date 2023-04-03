// file that is responsible for ticket creation modal

import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import UseAuth from "../../hooks/UseAuth";

import { Box, Textarea, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { createTicket } from "../../actions/ticketActions";

const TicketCreationModal = (props) => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const { user } = UseAuth();
  const { getTickets } = props;

  const onSubmit = async (e) => {
    e.preventDefault();
    const storyPoints = 1.0;
    await createTicket(user._id, { title, storyPoints });
    setTitle("");
    setAdding(false);
    getTickets();
  };

  return (
    <Box mt="1rem" mb="1rem" mr={{ base: "0.5rem", md: "1rem" }}>
      {!adding ? (
        <Button onClick={() => setAdding(true)} colorScheme="green">
          Create Ticket
        </Button>
      ) : (
        <form onSubmit={(e) => onSubmit(e)}>
          <Textarea
            isRequired
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" &&
              (title !== "" ? onSubmit(e) : e.preventDefault())
            }
            h="10rem"
          />
          <Box>
            <Button type="submit" colorScheme="blue">
              Create Ticket
            </Button>
            <Button
              onClick={() => {
                setAdding(false);
                setTitle("");
              }}
            >
              <CloseIcon />
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default TicketCreationModal;
