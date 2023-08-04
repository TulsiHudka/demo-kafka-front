import React, { useState, useEffect } from "react";
import axios from "axios";
import { responseReceived } from "../store/socketSlice";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentUpload = () => {
  const user_id = "ac63c0df-f900-4b89-a383-a4cfbe5fca7b ";
  const dispatch = useDispatch();
  const [response, setReponse] = useState("");
  const [file, setFile] = useState(null);
  const socketData = useSelector((state) => state.socket.data);
  const config = {
    headers: {
      "content-type": "multipart/form-data", // Required when using FormData
      user_id,
    },
  };

  useEffect(() => {
    if (socketData.message) {
      setReponse(socketData.message);
      console.log(socketData.message, "data received");
      toast.success("Process Completed");
      dispatch(responseReceived(""));
    }
  }, [socketData]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("upload", file);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/nodeKafka/api/upload`,
        formData,
        config
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Process started");
      })
      .catch((error) => {
        console.error(error);
        toast.error(JSON.stringify(error.message));
      });
  };

  return (
    <div>
      <h2>Choose file:</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <h2>Upload:</h2>
        <button type="submit">Upload Document</button>
      </form>
      <h3>Response: {response}</h3>
      <ToastContainer />
    </div>
  );
};

export default DocumentUpload;

// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { responseReceived } from "../store/socketSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import { makeRequest } from "../services/RequestApiService";

// const RequestApi = () => {
//   const dispatch = useDispatch();
//   const [response, setReponse] = useState("");
//   const user_id = "24ba91ca-2ab2-44bf-b2d8-de84e51f11b1";
//   const socketData = useSelector((state) => state.socket.data);
//   useEffect(() => {
//     if (socketData.message) {
//       setReponse(socketData.message);
//       console.log(socketData.message, "data received");
//       dispatch(responseReceived(""));
//     }
//   }, [socketData]);

//   const handleButtonClick = async () => {
//     try {
//       const response = await makeRequest(user_id);
//       // Process the response data here
//       console.log(response);
//       toast.success("Process started");
//     } catch (error) {
//       console.log(error);
//       toast.error(JSON.stringify(error.message));
//     }
//   };

//   const fileInputRef = useRef(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     // Process the uploaded file here
//     console.log(file);
//   };

//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div>
//       <h2>Choose your file:</h2>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFileUpload}
//       />{" "}
//       <button onClick={handleButtonClick}>Choose File</button> <br />
//       <br />
//       <h2>Upload Document:</h2>
//       <button onClick={handleButtonClick}>Upload Document</button>
//       <h3>Response: {response}</h3>
//       <ToastContainer />
//     </div>
//   );
// };

// export default RequestApi;
