import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apiCalls/user";
import { setUser } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getValidUser = async () => {
    try {
      const response = await GetCurrentUser();
      console.log(response);
      dispatch(setUser(response.data));

      //hide Loader
    } catch (error) {
      dispatch(setUser(null));
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser()
    } else {
      navigate("/login");
    }
  }, []);
  return <div>{children}</div>;
}

export default ProtectedRoute;
