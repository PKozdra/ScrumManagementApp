import { createContext, useEffect, useReducer } from "react";
import axios from "../api/axios";
import ErrorBoundary from "../utils/ErrorBoundary";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      console.log("authReducer login");
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case "LOGOUT":
      console.log("authReducer logout");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
  }
};

const AuthContext = createContext({
  ...initialState,
  logIn: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // handle error
  const errorAlert = (err) => {
    if (err.response) {
      console.log("err.response: ", err.response);
      console.log("err.response.data: ", err.response.data);
      console.log("err.response.status: ", err.response.status);
      console.log("err.response.headers: ", err.response.headers);
      return (
      <>{err.response.data.error}</>
      );
    }
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${
          token || ""
        }`;
        const res = await axios.get(`/user/info`);

        console.log("res: ", res);

        if (res.data === null) {
          localStorage.removeItem("token");
          return;
        }

        dispatch({
          type: "LOGIN",
          payload: {
            user: res.data,
          },
        });
      } catch (err) {
        return errorAlert(err);
      }
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // useEffect should be async and have protections against loops - use getUserInfo
  useEffect(() => {
    async function checkAuth() {
      if (!state.user) {
        await getUserInfo();
      }
    }
    checkAuth();
  }, [state]);

  const logIn = async (email, password) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      // set body to null if undefined
      if (body === undefined) {
        body = null;
      }
      const res = await axios.post(`/signin`, body, config);
      localStorage.setItem("token", res.data.token);
      await getUserInfo();
    } catch (err) {
      return errorAlert(err);
    }
  };

  const register = async (email, name, password) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      // set body to null if undefined
      if (body === undefined) {
        body = null;
      }
      console.log(body);
      const res = await axios.post(`/signup`, body, config);
      //localStorage.setItem("token", res.data.token);
      //await getUserInfo();
    } catch (err) {
      return errorAlert(err);
    }
  };

  const logOut = async (name, email, password) => {
    try {
      localStorage.removeItem("token");
      dispatch({
        type: "LOGOUT",
      });
    } catch (err) {
      return errorAlert(err);
    }
  };

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={{ ...state, logIn, register, logOut }}>
        {children}
      </AuthContext.Provider>
    </ErrorBoundary>
  );
};

export default AuthContext;
