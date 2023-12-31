import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { responseReceived } from "../store/socketSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeRequest } from "../services/RequestApiService";

const RequestApi = () => {
  const dispatch = useDispatch();
  const [response, setReponse] = useState("");
  const user_id = "24ba91ca-2ab2-44bf-b2d8-de84e51f11b1";
  const socketData = useSelector((state) => state.socket.data);
  useEffect(() => {
    if (socketData.message) {
      setReponse(socketData.message);
      console.log(socketData.message, "data received");
      dispatch(responseReceived(""));
    }
  }, [socketData]);

  const handleButtonClick = async () => {
    try {
      const response = await makeRequest(user_id);
      // Process the response data here
      console.log(response);
      toast.success("Process started");
    } catch (error) {
      console.log(error);
      toast.error(JSON.stringify(error.message));
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Make Request</button>
      <h5>Response: {response}</h5>
      <ToastContainer />
    </div>
  );
};

export default RequestApi;