import DocumentUpload from "./components/RequestApi";
import { useDispatch } from "react-redux";
import { responseReceived, dummyDataReceived } from "./store/socketSlice";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Test from "./components/Test";
import Notifications from "./components/Notification ";

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
      console.log("Socket connected");
    });
    setSocket(socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    const user_id = "a43c9b0d-7380-41e2-847a-d11eaa5e7325";
    setUser(user_id);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("response", (data) => {
        dispatch(responseReceived(data));
      });
      socket.on("test", (data) => {
        dispatch(dummyDataReceived(data));
      });
    }
    if (user) {
      socket.emit("newConnection", user);
    }
  }, [socket, user, dispatch]);

  return (
    <>
      <Test></Test>
      <Notifications></Notifications>
      <DocumentUpload></DocumentUpload>
    </>
  );
}

export default App;
