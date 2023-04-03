// import react
import React, { useState, useEffect } from "react";
import UseAuth from '../hooks/UseAuth';
import axios from '../api/axios';


const config = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

//router.get('/users', requireSignin, isAuth, getAllUsers);
export const getAllUsers = (userId) => {
    return axios.get(`/users/` + userId, config);
}

