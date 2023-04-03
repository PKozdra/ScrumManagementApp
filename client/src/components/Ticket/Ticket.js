// component for showing tickets in backlog

import React, { useState, useEffect } from "react";

import UseAuth from "../../hooks/UseAuth";

import axios from "../../api/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

import { updateTicket, deleteTicket } from "../../actions/ticketActions";

import EditTicket from "./EditTicket";

import { ItemTypes } from "../../utils/enums";

import { useDrag } from 'react-dnd'

library.add(faTrash);

const Ticket = (props) => {
  const [ticketData, setTicketData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { user } = UseAuth();

  const { ticket, getTickets } = props;

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleGet = async () => {
    const res = await getTickets();
  };

  const handleDelete = async () => {
    console.log("handleDelete: " + ticketData._id);
    const res = await deleteTicket(user._id, ticketData._id);
    handleGet();
  };

  useEffect(() => {
    setTicketData(ticket);
  }, [ticket]);

  const [{ isDragging }, drag] = useDrag({
    item: { ticket: ticketData },
    type: ItemTypes.TICKET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),

    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      console.log("dropResult: ", dropResult);
      if (item && dropResult) {
      }
    }
  });



  return (
    <div
      className="group/item"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <EditTicket
        open={isEditing}
        setOpen={setIsEditing}
        ticket={ticketData}
        getTickets={getTickets}
      />
      <div className="mx-auto mt-2 mr-2">
        <div className="p-6 bg-gray-200 rounded-lg">
          <div className="flex justify-between">
            {console.log("isEditing: " + isEditing)}
            <div className="basis-4/5">
              <h1 className="text-center font-bold">{ticketData.title}</h1>
              <h1 className="text-center font-bold">
                Story Points: {ticketData.storyPoints}
              </h1>
              <h1 className="text-center font-bold">
                Users:
                {ticketData.users &&
                  ticketData.users.map((user) => {
                    return <span key={user._id}> {user.username} </span>;
                  })}
              </h1>
            </div>
            <div className="group/edit invisible hover:bg-slate-200 group-hover/item:visible">
              <button
                onClick={() => {
                  handleEdit();
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete();
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Ticket;
