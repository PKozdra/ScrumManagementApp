import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import { getAllTickets } from "../../actions/ticketActions";
import { getAllBoards } from "../../actions/boardActions";
import UseAuth from "../../hooks/UseAuth";

const BurndownChart = () => {
  const { user } = UseAuth();
  const [chartData, setChartData] = useState([]);
  const [velocity, setVelocity] = useState(0);
  const [sprintLength, setSprintLength] = useState(undefined);
  const [storyPoints, setStoryPoints] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [date, setDate] = useState(new Date());
  const [highestDate, setHighestDate] = useState(new Date());
  const [board, setBoard] = useState({});

  const BoardGet = async () => {
    console.log("BoardGet");
    getAllBoards(user._id).then((res) => {
      console.log("res.data.boards: ", res.data.boards);
      let incompleteBoards = [];
      const boards = res.data.boards;
      if (boards.length === 0) {
        incompleteBoards = [];
      }
      incompleteBoards = boards.filter((board) => {
        return board.isCompleted === false;
      });
      console.log("incompleteBoards: ", incompleteBoards);
      setBoard(incompleteBoards[0]);
    });
  };

  // finishedAt - current date = days left
  const getDaysLeft = (date, finishedAt) => {
    const date1 = new Date(finishedAt);
    const date2 = new Date(date);
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays - 1;
  };

  const getDate = async () => {
    getAllBoards(user._id).then((res) => {
      if (res.data.boards.length === 0) return;
      const board = res.data.boards.filter((board) => {
        if (board.isCompleted === false) {
          return board;
        }
      });
      console.log(board[0].createdAt);
      setDate(board[0].createdAt);
    });
  };

  const isDateBefore = (date1, date2) => {
    return date1.getTime() < date2.getTime();
  };

  const getDateByDay = (day) => {
    const date = new Date();
    date.setDate(date.getDate() + day);
    return date;
  };

  const getActual = (convDate) => {
    let actual = 0;
    tickets.forEach((ticket) => {
      let dateTmp = new Date(ticket.completedAt);
      if (ticket.status === "done" && isDateBefore(dateTmp, convDate))
        actual += ticket.storyPoints;
    });
    return actual;
  };

  const createChartData = () => {
    let tmpVelocity = velocity;
    // calculate min number of days to complete sprint
    if (tmpVelocity === undefined || tmpVelocity <= 0) {
      // get best velocity to finish in 1 week
      tmpVelocity = storyPoints / 6;
    }
    console.log("board: ", board);
    // if board is not empty, calculate velocity based on board dates
    if (board !== undefined && board !== {}) {
      console.log("board.finishedAt: ", board.finishedAt);
      tmpVelocity = storyPoints / getDaysLeft(board.createdAt, board.finishedAt);
      console.log("tmpVelocity: ", tmpVelocity);
    }

    let minDays = storyPoints / tmpVelocity + 1;

    // if minDays date is before highestDate, add days to minDays
    console.log("minDays: ", minDays);
    console.log("getDateByDay(minDays): ", getDateByDay(minDays));
    console.log("highestDate: ", highestDate);
    console.log("isDateBefore: ", isDateBefore(getDateByDay(minDays), highestDate));
    while (isDateBefore(getDateByDay(minDays), highestDate)) {
      minDays++;
    }


    setSprintLength(minDays);
    const data = [];
    console.log("sprintLength: ", sprintLength);
    let storedIdeal = 0;
    for (let i = 0; i < sprintLength; i++) {
      console.log("first loop i: ", i);
      let convertedDate = getDateByDay(i);
      storedIdeal = storyPoints - tmpVelocity * i;
      data.push({
        name: `Day ${i + 1}`,
        ideal: storedIdeal,
        actual: storyPoints - getActual(convertedDate),
      });
      console.log("data: ", data);
      
    }

    setChartData(data);
  };

  const getTickets = async () => {
    getAllTickets(user._id).then((res) => {
      // filter tickets to only include tickets that are in the sprint
      const ticketsInSprint = res.data.tickets.filter((ticket) => {
        if (ticket.location === "board") {
          return ticket;
        }
      });
      let storyPoints = 0;
      // calculate total story points
      ticketsInSprint.forEach((ticket) => {
        storyPoints += ticket.storyPoints;
      });
      // get highest date
      let highestDate = new Date();
      ticketsInSprint.forEach((ticket) => {
        if (ticket.completedAt !== undefined) {
          let dateTmp = new Date(ticket.completedAt);
          if (dateTmp.getTime() > highestDate.getTime()) {
            highestDate = dateTmp;
          }
        }
      });
      // add 2 days to highest date
      highestDate.setDate(highestDate.getDate() + 2);
      // if current date is after highest date, set highest date to current date
      let currentDate = new Date();
      if (isDateBefore(highestDate, currentDate)) {
        highestDate = currentDate;
      }
      setStoryPoints(storyPoints);
      setHighestDate(highestDate);
      setTickets(ticketsInSprint);
    });
  };

  useEffect(() => {
    getTickets();
    getDate();
  }, [board]);

  // async function to get board
  useEffect(() => {
    BoardGet();
  }, []);

  const formatTooltip = (value) => {
    return value < 0 ? 0 : value;
  };

  useEffect(() => {
    createChartData();
  }, [tickets, sprintLength, velocity, date, highestDate]);

  return (
    <div className="rounded-lg p-6 bg-slate-50">
      <LineChart
        width={1500}
        height={800}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          backgroundColor="white"
          stroke="black"
        />
        <XAxis dataKey="name"/>
        <YAxis type="number" domain={[0, storyPoints]} 
          allowDataOverflow={true}
          //ticks={Array.from({length: storyPoints + 1}, (_, i) => i)}
        />
        <Tooltip formatter={value => value.toFixed(2)} />
        <Legend />
        <Line
          type="monotone"
          dataKey="ideal"
          stroke="#3d85c6"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="actual" stroke="#ff0000"
        activeDot={{ r: 8 }}/>
      </LineChart>
      <div className="flex flex-row justify-center">
        <input
          type="text"
          onChange={(e) => setVelocity(e.target.value)}
          placeholder="Enter velocity (story points / day)"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-1/4 pl-2"
        />
      </div>
    </div>
  );
};

export default BurndownChart;
