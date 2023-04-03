import React from "react";
import AsyncBoard from "react-trello";
import {
  getAllTickets,
  updateTicket,
  deleteTicket,
  createTicket,
} from "../../actions/ticketActions";
import { useState, useEffect } from "react";
import UseAuth from "../../hooks/UseAuth";
import EditTicket from "../Ticket/EditTicket";
import { Button } from "@mui/material";
import {
  getAllBoards,
  getBoardById,
  updateBoard,
  getAllTicketsFromBoard,
} from "../../actions/boardActions";

const data = {
  lanes: [
    {
      id: "lane1",
      title: "To Do",
      label: "",
      cards: [],
    },

    {
      id: "lane2",
      title: "In Progress",
      label: "",
      cards: [],
    },

    {
      id: "lane3",
      title: "Done",
      label: "",
      cards: [],
    },
  ],
};

// status to id mapping
// enum: ["todo", "in-progress", "done"],
// 0: "todo",
// 2: "in-progress",
// 1: "done",

const statusToId = (status) => {
  switch (status) {
    case "todo":
      return 0;
    case "in-progress":
      return 1;
    case "done":
      return 2;
    default:
      return 0;
  }
};

const statusToLane = (status) => {
  switch (status) {
    case "todo":
      return "lane1";
    case "in-progress":
      return "lane2";
    case "done":
      return "lane3";
    default:
      return "lane1";
  }
};

const laneToStatus = (laneId) => {
  switch (laneId) {
    case "lane1":
      return "todo";
    case "lane2":
      return "in-progress";
    case "lane3":
      return "done";
    default:
      return "todo";
  }
};

const getTicketUsers = (ticket) => {
  let users = "";
  ticket.users.forEach((user) => {
    users += user.username + ", ";
  });
  return users;
};

const Taskboard = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = UseAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [ticketData, setTicketData] = useState({});
  const [eventBus, setEventBus] = useState(undefined);
  const [boardData, setBoardData] = useState(data);
  const [board, setBoard] = useState({});

  const BoardGet = async () => {
    getAllBoards(user._id).then((res) => {
      let incompleteBoards = [];
      const boards = res.data.boards;
      if (boards.length === 0) {
        incompleteBoards = [];
      }
      incompleteBoards = boards.filter((board) => {
        return board.isCompleted === false;
      });
      setBoard(incompleteBoards[0]);
    });
  };

  const completeSprint = async () => {
    const res = await getAllTickets(user._id);
    let newBoard = board;
    newBoard.isCompleted = true;
    newBoard.finishedAt = Date.now();
    newBoard.tickets = res.data.tickets;
    // remove tickets that do not have status 'done'
    newBoard.tickets = newBoard.tickets.filter((ticket) => {
      return ticket.status === "done";
    });
    // remove tickets that are not 'board' tickets
    newBoard.tickets = newBoard.tickets.filter((ticket) => {
      return ticket.location === "board";
    });
    // set tickets location to 'completed'
    newBoard.tickets.forEach((ticket) => {
      ticket.location = "completed";
    });

    // if there are no tickets, return an error message
    if (newBoard.tickets.length === 0) {
      alert("There are no tickets in the 'Done' column.");
      return;
    }

    // update tickets in loop
    newBoard.tickets.forEach(async (ticket) => {
      const res = await updateTicket(user._id, ticket._id, ticket);
      console.log("Taskboard.js: completeSprint: res: ", res);
    });
    const res2 = await updateBoard(user._id, board._id, newBoard);
    console.log("Taskboard.js: completeSprint: res2: ", res2);
    setBoard({});
  };

  const getTickets = async () => {
    console.log("Taskboard.js: getTickets: board: ", board);
    getAllTickets(user._id).then((res) => {
      // remove tickets that are not 'board' tickets
      res.data.tickets = res.data.tickets.filter((ticket) => {
        return ticket.location === "board";
      });
      // remove tickets that are not 'board' tickets
      res.data.tickets = res.data.tickets.filter((ticket) => {
        return ticket.boardId !== board._id;
      });
      setTickets(res.data.tickets);
      const resData = {};
      resData.lanes = [
        {
          id: "lane1",
          title: "To Do",
          label: "",
          cards: [],
        },

        {
          id: "lane2",
          title: "In Progress",
          label: "",
          cards: [],
        },

        {
          id: "lane3",
          title: "Done",
          label: "",
          cards: [],
        },
      ];

      res.data.tickets.forEach((ticket) => {
        const statusId = statusToId(ticket.status);
        const laneId = statusToLane(ticket.status);
        const card = {
          id: ticket._id,
          title: ticket.title,
          description: "Users: " + getTicketUsers(ticket),
          label: ticket.storyPoints + " points",
          laneId: laneId,
        };
        if (!resData.lanes[statusId]) {
          resData.lanes[statusId] = {
            id: statusId,
            title: laneId,
            label: "",
            cards: [],
          };
        }
        resData.lanes[statusId].cards.push(card);
      });
      console.log("Taskboard.js: getTickets: resData: ", resData);
      setBoardData(resData);
    });
  };

  const updateTickets = async (ticket) => {
    const res = await updateTicket(user._id, ticket._id, ticket);
  };

  const onCardClick = (cardId, metadata, laneId) => {
    console.log("card clicked! " + cardId);
    const ticket = tickets.find((ticket) => ticket._id === cardId);
    setTicketData(ticket);
    setIsEditing(true);
  };

  const handleDragStart = (cardId, laneId) => {
    console.log("drag started!");
    console.log(`card: ${cardId}, lane: ${laneId}`);
  };

  const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log("drag ended!");
    console.log(
      `card: ${cardId}, source: ${sourceLaneId}, target: ${targetLaneId}`
    );
  };

  const onCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
    console.log("card moved!");
    console.log(
      `from: ${fromLaneId}, to: ${toLaneId}, card: ${cardId}, index: ${index}`
    );
    const ticket = tickets.find((ticket) => ticket._id === cardId);
    console.log("ticket: ", ticket);
    // change status of ticket
    ticket.status = laneToStatus(toLaneId);
    // if status is 'done', set completedAt to current time (in ISO format)
    if (ticket.status === "done") {
      const date = new Date();
      ticket.completedAt = date.toISOString();
    }
    else {
      ticket.completedAt = null;
    }
    console.log("ticket status: ", ticket.status);
    updateTickets(ticket);
  };

  const updateCard = (ticket) => {
    console.log("Taskboard.js: updateCard: ticket: ", ticket);
    console.log("Taskboard.js: updateCard: eventBus: ", eventBus);
    console.log("Taskboard.js: updateCard: statusToLane: ", statusToLane(ticket.status));
    if (eventBus !== undefined) {
      eventBus.publish({
        type: "UPDATE_CARD",
        laneId: statusToLane(ticket.status),
        cardId: ticket._id,
        card: {
          id: ticket._id,
          title: ticket.title,
          description: "Users: " + getTicketUsers(ticket),
          label: ticket.storyPoints + " points",
          laneId: statusToLane(ticket.status),
        },
      });
    }
  };

  const onCardDelete = (cardId, laneId) => {
    console.log("card deleted!");
    // find ticket
    const ticket = tickets.find((ticket) => ticket._id === cardId);
    // delete ticket
    deleteTicket(user._id, ticket._id);
    // update board
    eventBus.publish({
      type: "REMOVE_CARD",
      laneId: laneId,
      cardId: cardId,
    });
  };

  const onCardAdd = (laneId) => {
    console.log("card added!");

    console.log("laneId: ", laneId);

    console.log("status: ", laneToStatus(laneId));

    // create new ticket
    const newTicket = {
      title: "New Ticket",
      status: laneToStatus(laneId),
      storyPoints: 1,
      users: [],
      location: "board",
    };

    // if lane is 'done' set completedAt to current ISO date
    if (laneId === statusToLane("done")) {
      newTicket.completedAt = new Date().toISOString();
      console.log("newTicket.completedAt: ", newTicket.completedAt);
    }
    // add ticket to database
    createTicket(user._id, newTicket).then((res) => {
      console.log("Taskboard.js: onCardAdd: res: ", res);
      // add ticket to tickets
      tickets.push(res.data.ticket);
      // update board
      eventBus.publish({
        type: "ADD_CARD",
        laneId: laneId,
        card: {
          id: res.data.ticket._id,
          title: res.data.ticket.title,
          description: "Users: " + getTicketUsers(res.data.ticket),
          label: res.data.ticket.storyPoints + " points",
          laneId: laneId,
        },
      });
    });
  };

  const CustomAddCardLink = ({ onClick, laneId }) => {
    return (
      <div className="add-card-link" onClick={() => onCardAdd(laneId)}>
        <div className="add-card-link-text">Add a card...</div>
      </div>
    );
  };

  function getDaysLeft() {
    // get how much days left till the end of the sprint
    // get finished at date from board
    const finishedAt = new Date(board.finishedAt);
    // get current date
    const currentDate = new Date();
    // get difference in days
    const diffTime = Math.abs(finishedAt - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }


  useEffect(() => {
    console.log("Taskboard.js: useEffect: board: ", board);
    getTickets();
  }, [board]);

  useEffect(() => {
    console.log("Taskboard.js: useEffect: tickets: ", tickets);
    BoardGet();
  }, []);

  useEffect(() => {
    console.log("Taskboard.js: useEffect: ticketData: ", ticketData);
    if (eventBus !== undefined) {
      updateCard(ticketData);
    }
  }, [isEditing]);

  return (
    <div>
      <EditTicket
        open={isEditing}
        setOpen={setIsEditing}
        ticket={ticketData}
        getTickets={getTickets}
      />

      <div className="fixed m-auto w-4/5 mt-20 ml-64 pl-20">
        <div className="bg-gray-200 text-2xl font-bold text-gray-700 text-center">
          Board: { board ? board.name : "Loading..."}
        </div>
        <div className="mt-2 bg-gray-200 text-2xl font-bold text-gray-700 text-center">
          Days left to complete: { board ? getDaysLeft() : "Loading..."}
        </div>
        <AsyncBoard
          components={{ AddCardLink: CustomAddCardLink }}
          eventBusHandle={setEventBus}
          onCardMoveAcrossLanes={onCardMoveAcrossLanes}
          onCardClick={onCardClick}
          onCardDelete={onCardDelete}
          onCardAdd={onCardAdd}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          data={boardData}
          laneStyle={{ width: "50%" }}
          style={{
            justifyContent: "left",
            backgroundColor: "transparent",
          }}
        />
      </div>
      <button
        className="fixed m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        style={{ bottom: "0", right: "0" }}
        onClick={completeSprint}
      >
        Complete Sprint
      </button>
    </div>
  );
};

export default Taskboard;
