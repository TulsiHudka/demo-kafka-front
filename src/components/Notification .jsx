// Notifications.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import classes from "./Notification.module.css";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../services/RequestApiService";

function Notifications() {
  const socketData = useSelector((state) => state.socket.data);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications from the backend API
  const fetchNotificationsData = async () => {
    const data = await fetchNotifications();
    setNotifications(data);
  };

  const getUnreadCount = (notifications) => {
    return notifications?.reduce((count, notification) => {
      return notification.status === "unread" ? count + 1 : count;
    }, 0);
  };
  useEffect(() => {
    fetchNotificationsData();
    // updateUnreadCount();
  }, [socketData]);

  useEffect(() => {
    const updateUnreadCount = () => {
      setUnreadCount(getUnreadCount(notifications));
    };

    // fetchNotificationsData();
    updateUnreadCount();
  }, [notifications]);

  const markAsRead = async (notificationId) => {
    await markNotificationAsRead(notificationId);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => {
        if (notification.id === notificationId) {
          return { ...notification, status: "read" };
        }
        return notification;
      })
    );
    setUnreadCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <>
      <div>
        <Badge badgeContent={unreadCount} color="primary">
          {/* Your notification icon component */}
          <NotificationsActiveIcon />
        </Badge>
        <div className={classes.container}>
          {/* Render your list of notifications */}
          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                fontWeight:
                  notification.status === "unread" ? "bold" : "normal",
              }}
              onClick={() => markAsRead(notification.id)}
            >
              <p className={classes.message}>{notification.message}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Notifications;
