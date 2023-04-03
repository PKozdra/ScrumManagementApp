// import react
import React, { useState, useEffect } from "react";
import UseAuth from "../hooks/UseAuth";
import axios from "../api/axios";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

// router.post("/board/create/:userId", requireSignin, isAuth, createBoard);
// router.put("/board/update/:boardId/:userId", requireSignin, isAuth, updateBoard);
// router.get("/board/all/:userId", requireSignin, isAuth, getAllBoards);
// router.delete("/board/delete/:boardId/:userId", requireSignin, isAuth, deleteBoard);
// router.get("/board/get/:boardId/:userId", requireSignin, isAuth, getBoardById);
// router.get("/board/getByName/:userId", requireSignin, isAuth, getBoardByName);
// router.get("/board/getAllTickets/:boardId/:userId", requireSignin, isAuth, getAllTicketsFromBoard);

export const getAllBoards = (userId) => {
  return axios.get(`/board/all/${userId}`, config);
};

export const getAllTicketsFromBoard = (userId, boardId) => {
  return axios.get(`/board/getAllTickets/${boardId}/${userId}`, config);
};

export const updateBoard = (userId, boardId, board) => {
    return axios.put(`/board/update/${boardId}/${userId}`, board, config);
}