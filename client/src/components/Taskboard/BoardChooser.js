// file for BoardChooser component

import { useEffect, useState } from "react";

import UseAuth from "../../hooks/UseAuth";

import axios from "../../api/axios";

import styled from "styled-components";

import { useDrop } from "react-dnd";

import { ItemTypes } from "../../utils/enums";

import { getAssignedTickets, toggleSprint } from "../../actions/ticketActions";

import Ticket from "../Ticket/Ticket";

import DatePickers from "../../utils/DatePicker";

const DropZoneStyle = styled.div`
  border: 2px dashed #bbb;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  padding: 50px;
  text-align: center;
  font: 21pt bold arial;
  color: #bbb;
`;

const DropZone = (props) => {
  const [dragging, setDragging] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TICKET,
    drop: (item, monitor) => {
      console.log("drop: ", item);
      props.handleDrop(item.ticket, props.status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    if (isOver) {
      setDragging(true);
    } else {
      setDragging(false);
    }
  }, [isOver]);

  const displayTicket = (ticket) => {
    return (
      <div className="ml-32" key={ticket._id}>
        <Ticket
          key={ticket._id}
          ticket={ticket}
          getTickets={props.getTickets}
          handleDrop={props.handleDrop}
        />
      </div>
    );
  };

  // display tickets in drop zone
  const displayTickets = () => {
    return props.tickets.map((ticket) => {
      return displayTicket(ticket);
    });
  };

  return (
    <div
      className="overflow-y-auto h-80"
      style={{
        opacity: dragging ? 0.5 : 1,
        border: isOver ? "5px solid red" : "",
      }}
      ref={drop}
    >
      {console.log("props.tickets.len: ", props.tickets.len)}
      {!(props.tickets.length > 0) ? (
        <DropZoneStyle>
          {props.children}
          {displayTickets()}
        </DropZoneStyle>
      ) : (
        <div>{displayTickets()}</div>
      )}
    </div>
  );
};

function BoardChooser() {
  const { isAuthenticated, user } = UseAuth();
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [error, setError] = useState("");
  const [tickets, setTickets] = useState([]);
  const [dateValue, setDateValue] = useState(new Date());
  const [isBoardCreated, setIsBoardCreated] = useState(false);

  // get boards from server
  async function getBoards() {
    setError("");
    try {
      const response = await axios.get("/board/all/" + user._id);
      console.log("response getBoards: ", response.data.boards);
      setBoards(response.data.boards);
    } catch (e) {
      setError("Unable to get boards from server.");
      console.log("An error has happened: " + e);
    }
  }

  async function deleteBoard(id) {
    setError("");
    try {
      const response = await axios.delete(
        "/board/delete/" + id + "/" + user._id
      );
      getBoards();
    } catch (e) {
      setError("Unable to delete board from server.");
      console.log("An error has happened: " + e);
    }
  }

  //router.post("/board/create/:userId", requireSignin, isAuth, createBoard);
  async function createBoard(name, tickets) {
    setError("");
    // split
    try {
      const response = await axios.post("/board/create/" + user._id, {
        name: name,
        tickets: tickets,
        finishedAt: dateValue,
      });
      getBoards();
    } catch (e) {
      setError("Unable to create board.");
      console.log("An error has happened: " + e);
    }
  }

  //router.get("/board/getByName/:userId", requireSignin, isAuth, getBoardByName);
  async function getBoardByName(name) {
    setError("");
    try {
      const response = await axios.get("/board/getByName/" + user._id + "/", {
        name,
      });
      console.log("response getBoardByName: ", response.data.board);
      setSelectedBoard(response.data.board);
    } catch (e) {
      setError("Unable to get board from server.");
      console.log("An error has happened: " + e);
    }
  }

  const handleError = () => {
    if (error != "" && error != "null") {
      return (
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }
  };

  useEffect(() => {
    // set isBoardCreated to false if there are no tickets
    if (tickets.length === 0) {
      setIsBoardCreated(true);
      console.log("isBoardCreated setter: ", isBoardCreated);
    }
    else {
      setIsBoardCreated(false);
      console.log("isBoardCreated setter: ", isBoardCreated);
    }
  }, [tickets]);
  

  useEffect(() => {
    console.log("BoardChooser.js: useEffect: user: ", user);
    getBoards();
    getTickets();
  }, []);

  useEffect(() => {
    console.log("boards.length: ", boards.length);
    for (let i = 0; i < boards.length; i++) {
      if (!boards[i].isCompleted) {
        setIsBoardCreated(true);
        console.log("isBoardCreated setter: ", isBoardCreated);
      }
    }

    // get all completed boards and setNewBoardName to the count of completed boards
    // if there are no completed boards, setNewBoardName to 1

    if (boards.length > 0) {
      let count = 1;
      for (let i = 0; i < boards.length; i++) {
        if (boards[i].isCompleted) {
          count++;
        }
      }
      if (count > 0) {
        setNewBoardName("Sprint " + count.toString());
      } else {
        setNewBoardName("Sprint 1");
      }
    } else {
      setNewBoardName("Sprint 1");
    }
  }, [boards]);

  const getTickets = async () => {
    try {
      console.log("Backlog.js: getUnassignedTickets: user._id: ", user._id);
      const res = await getAssignedTickets(user._id);
      setTickets(res.data.tickets);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTicket = async (ticket) => {
    try {
      console.log("Backlog.js: toggleTicket: ticket: ", ticket);
      const res = await toggleSprint(ticket);
      getTickets();
    } catch (err) {
      console.log(err);
    }
  };

  //   export const toggleSprint = (userId, ticketId) => {
  //     return axios.put(`/ticket/toggleSprint/${ticketId}/${userId}`, config);
  // }

  const handleDrop = async (ticket) => {
    console.log("handleDrop: ", ticket);
    // delete all boards

    toggleSprint(user._id, ticket._id);
    getTickets();

    // add ticket to tickets array
    tickets.push(ticket);

    console.log("tickets: ", tickets);

    window.location.reload();
  };


  const createSprint = async () => {
    console.log("createSprint: ", newBoardName);
    await createBoard(newBoardName, tickets);

    // update board with to do tickets
  };

  const onDateChange = (date) => {
    setDateValue(date);
  };

  return (
    <div className="mx-auto mt-20">
      <div className="p-6 bg-gray-200 rounded-lg">
        <h1 className="text-center text-3xl font-bold mb-2">Sprints</h1>
        <h2 className="text-center text-xl font-bold mb-5">
          To create a sprint, drag some tickets from backlog and click "Create
          Board"
        </h2>
        {true ? (
          <DropZone
            getTickets={getTickets}
            tickets={tickets}
            handleDrop={handleDrop}
          >
            Drop tickets here
          </DropZone>
        ) : (
          <div className="text-center">
            <p className="text-red-500">
              Finish current sprint to add more tickets...
            </p>
          </div>
        )}
        <div className="flex flex-col justify-center">
          {/* {boards.map((board) => (
            <div className="flex flex-row justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => setSelectedBoard(board)}
              >
                {board.name}
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
                onClick={() => deleteBoard(board._id)}
              >
                Delete
              </button>
            </div>
          ))} */}
          <div className="flex flex-row justify-center mt-4">
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Enter board name"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {console.log("isBoardCreated: ", isBoardCreated)}
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 disabled:opacity-50"
              onClick={() => createSprint()}
              disabled={isBoardCreated}
            >
              Create Board
            </button>
          </div>
          <div className="flex flex-row justify-center mt-4">
            <DatePickers onChange={onDateChange} />
          </div>
        </div>
        <div className="flex justify-center text-red-700 mt-5">{error}</div>
      </div>
    </div>
  );
}

export default BoardChooser;
