// actions for tickets

// import react
import React, { useState, useEffect } from "react";
import UseAuth from '../hooks/UseAuth';
import axios from '../api/axios';

// const { createTicket, getAllTickets, deleteTicket, getTicketById, updateTicket } = require("../controllers/ticket");

// router.param("boardId", getBoardById);
// router.param("userId", getUserById);

//router.post("/ticket/create/:userId", requireSignin, isAuth, createTicket);
// router.get("/ticket/all/:userId", requireSignin, isAuth, getAllTickets);
// router.put("/ticket/:ticketId/:userId", requireSignin, isAuth, updateTicket);
// router.delete("/ticket/:ticketId/:userId", requireSignin, isAuth, deleteTicket);
// router.get("/ticket/unassigned/:userId", requireSignin, isAuth, getUnassignedTickets);
// router.put("/ticket/toggleSprint/:ticketId/:userId", requireSignin, isAuth, toggleSprint);
// router.get("/ticket/assigned/:userId", requireSignin, isAuth, getAssignedTickets);


const config = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

export const getAllTickets = (userId) => {
    return axios.get(`/ticket/all/${userId}`, config);
}

export const createTicket = (userId, ticket) => {
    console.log("ticketActions.js: createTicket: ticket: ", ticket);
    return axios.post(`/ticket/create/${userId}`, ticket, config);
}

export const updateTicket = (userId, ticketId, ticket) => {
    return axios.put(`/ticket/${ticketId}/${userId}`, ticket, config);
}

export const deleteTicket = (userId, ticketId) => {
    return axios.delete(`/ticket/delete/${ticketId}/${userId}`, config);
}

export const getTicketById = (userId, ticketId) => {
    return axios.get(`/ticket/get/${ticketId}/${userId}`, config);
}

export const getUnassignedTickets = (userId) => {
    return axios.get(`/ticket/unassigned/${userId}`, config);
}

export const toggleSprint = (userId, ticketId) => {
    return axios.put(`/ticket/toggleSprint/${ticketId}/${userId}`, config);
}

export const getAssignedTickets = (userId) => {
    return axios.get(`/ticket/assigned/${userId}`, config);
}






