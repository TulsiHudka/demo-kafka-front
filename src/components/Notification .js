import React, { useEffect, useState } from "react";
import axios from "axios";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch notifications from the backend API
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/notifications`
      );
      setNotifications(response.data);
      setUnreadCount(getUnreadCount(response.data));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const getUnreadCount = (notifications) => {
    return notifications.reduce((count, notification) => {
      return notification.status === "unread" ? count + 1 : count;
    }, 0);
  };

  const markAsRead = async (notificationId) => {
    console.log(notificationId);
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/notifications/${notificationId}`,
        {
          status: "read",
        }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => {
          if (notification.id === notificationId) {
            return { ...notification, status: "read" };
          }
          return notification;
        })
      );
      setUnreadCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <>
      <br />
      <div>
        <Badge badgeContent={6} color="primary" >
          {/* Your notification icon component */}
          <NotificationsActiveIcon />
        </Badge>
        <div>
          {/* Render your list of notifications */}
          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                fontWeight: notification.status === "unread" ? "bold" : "normal",
              }}
              onClick={() => markAsRead(notification.id)}
            >
              {/* {notification.message} */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Notifications;
