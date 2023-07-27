import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { handleTestData } from "../services/testService";

const Test = () => {
  const dummyData = useSelector((state) => state.socket.dummy);

  useEffect(() => {
    handleTestData(dummyData);
  }, [dummyData]);

  return (
    <div>
      <h2>Notification: {dummyData}</h2>
    </div>
  );
};

export default Test;
