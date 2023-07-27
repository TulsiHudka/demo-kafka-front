import axios from "axios";

export const makeRequest = async (user_id) => {
  try {
    console.log("Node API POST request successful");
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/nodeKafka/api/request`,
      { user_id }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error making the request.");
  }
};

export const fetchNotifications = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/nodeKafka/api/notifications`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/nodeKafka/api/notifications/${notificationId}`,
      {
        status: "read",
      }
    );
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

// export { makeRequest, fetchNotifications, markNotificationAsRead };
