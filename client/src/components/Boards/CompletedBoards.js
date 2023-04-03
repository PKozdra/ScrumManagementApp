import React, { useState, useEffect } from "react";

import UseAuth from "../../hooks/UseAuth";

import axios from "../../api/axios";

import { getAllBoards } from "../../actions/boardActions";

import FinishedSprint from "./FinishedSprint";

const CompletedBoards = () => {
  const [boards, setBoards] = useState([]);

  const { user } = UseAuth();

  useEffect(() => {
    getAllBoards(user._id).then((res) => {
      // filter out the boards that are not finished
      res.data.boards = res.data.boards.filter((board) => {
        if (board.isCompleted === true) {
          return board;
        }
      });
      setBoards(res.data.boards);
    });
  }, []);

  return (
    <div className="mx-auto mt-20">
      <div className="p-6 bg-gray-200 rounded-lg">
        <h1 className="text-center text-3xl font-bold">Finished sprints:</h1>
      </div>
      <div className="flex-row justify-center">
        <div className="mt-5 overflow-y-auto h-96 mx-auto">
          {boards.map((board) => (
            <FinishedSprint key={board._id} board={board} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedBoards;
