// router.post(
//     "/meeting/create/:userId",
//     requireSignin,
//     isAuth,
//     createMeeting
// );

// router.get(
//     "/meeting/all/:userId",
//     requireSignin,
//     isAuth,
//     getMeetings
// );

// router.put(
//     "/meeting/update/:meetingId/:userId",
//     requireSignin,
//     isAuth,
//     updateMeeting
// );

// router.delete(
//     "/meeting/delete/:meetingId/:userId",
//     requireSignin,
//     isAuth,
//     deleteMeeting
// );

import React, { useState, useEffect } from "react";
import UseAuth from "../hooks/UseAuth";
import axios from "../api/axios";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const getAllMeetings = (userId) => {
    return axios.get(`/meeting/all/${userId}`, config);
}
    
export const createMeeting = (userId, meeting) => {
    console.log("meetingActions.js: createMeeting: meeting: ", meeting);
    return axios.post(`/meeting/create/${userId}`, meeting, config);
}

export const updateMeeting = (userId, meetingId, meeting) => {
    return axios.put(`/meeting/${meetingId}/${userId}`, meeting, config);
}

export const deleteMeeting = (userId, meetingId) => {
    return axios.delete(`/meeting/delete/${meetingId}/${userId}`, config);
}

export const getMeetingById = (userId, meetingId) => {
    return axios.get(`/meeting/get/${meetingId}/${userId}`, config);
}
