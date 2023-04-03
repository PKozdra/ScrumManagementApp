import React, { useState, useEffect } from "react";

import UseAuth from "../../hooks/UseAuth";

import axios from "../../api/axios";

import TicketCreationModal from "../Ticket/TicketCreationModal";

import { getUnassignedTickets } from "../../actions/ticketActions";

import Ticket from "../Ticket/Ticket";

function Backlog() {
  const { user } = UseAuth();

    const [tickets, setTickets] = useState([]);
    
    const getTickets = async () => {
        try {
            console.log("Backlog.js: getUnassignedTickets: user._id: ", user._id);
            const res = await getUnassignedTickets(user._id);
            setTickets(res.data.tickets);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getTickets();
  }, []);

  return (
    <div>
      <div className="mx-auto mt-20">
        <div className="p-6 bg-gray-200 rounded-lg">
          <h1 className="text-center text-3xl font-bold">Backlog</h1>
          {/* create a button that will create a new task */}
          <div className="flex justify-center">
                      <TicketCreationModal
                      getTickets={getTickets}
                      />
          </div>
        </div>
      </div>
      {/* show all the tickets - tickets is an array of arrays */}
      <div className="mt-5 overflow-y-auto h-96 mx-auto">
        {tickets.map(({ _id, title, storyPoints, isSprint, description, status, users }) => (
            <Ticket
            getTickets={getTickets}
            key={_id}
            ticket={{ _id, title, storyPoints, isSprint, description, status, users }}
          />
        ))}
      </div>
    </div>
  );
}

export default Backlog;
