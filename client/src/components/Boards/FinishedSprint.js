// component for showing tickets in backlog

import React, { useState, useEffect } from "react";

import UseAuth from "../../hooks/UseAuth";

import axios from "../../api/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

import { updateTicket, deleteTicket } from "../../actions/ticketActions";

import { ItemTypes } from "../../utils/enums";

import { useDrag } from "react-dnd";

import BrowseTickets from "../Ticket/BrowseTickets";

import ReviewDialog from "./ReviewDialog";

library.add(faTrash);

const FinishedSprint = (props) => {
  const [sprintData, setSprintData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const { user } = UseAuth();

  const { board } = props;

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const formatDates = (dates) => {
    const date = new Date(dates);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
  };
  useEffect(() => {
    setSprintData(board);
    setTasks(board.tickets);
  }, [board]);

  const handleSetSprintReview = async () => {
    setIsReviewing(true);
    setReviewModal(true);
  };

  const handleSetSprintRetrospective = async () => {
    setIsReviewing(false);
    setReviewModal(true);
  };

  return (
    <div className="group/item">
      <BrowseTickets
        open={isEditing}
        setOpen={setIsEditing}
        tickets={tasks}
        board={board}
      />
      <ReviewDialog
        open={reviewModal}
        setOpen={setReviewModal}
        board={board}
        isReview={isReviewing}
      />

      <div className="mx-auto mt-2 mr-2">
        <div className="p-6 bg-gray-200 rounded-lg">
          <div className="flex justify-between">
            {console.log("isEditing: " + isEditing)}
            <div className="basis-4/5">
              <h1 className="text-center font-bold">{sprintData.name}</h1>
              <h2 className="text-center font-bold">
                Created at: {formatDates(sprintData.createdAt)}
              </h2>
              <h2 className="text-center font-bold">
                Finished at: {formatDates(sprintData.finishedAt)}
              </h2>
            </div>
            <div className="group/edit invisible hover:bg-slate-200 group-hover/item:visible">
              <button
                onClick={() => {
                  handleEdit();
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
              >
                Browse Tickets
              </button>
              <button
                onClick={() => {
                  handleSetSprintReview();
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
              >
                Set Sprint Review
              </button>
              <button
                onClick={() => {
                  handleSetSprintRetrospective();
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
              >
                Set Sprint Retrospective
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishedSprint;
