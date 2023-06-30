import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const RequestApi = () => {
    // const [process_Notification, setProcess_Notification] = useState("")
    const user_id = "a43c9b0d-7380-41e2-847a-d11eaa5e7325";
    useEffect(() => {

        const socket = io('http://localhost:8000');

        socket.on('connect', () => {
            console.log('WebSocket connection established');
        });

        socket.on('notification', () => {
            console.log('notification received');
        });

        socket.on('processNotification', (processNotification) => {
            console.log('Received notification:', processNotification);
            // setProcess_Notification(processNotification)
            // alert(process_Notification)
            // Handle the notification message
        });

        socket.on('response', (response) => {
            // Handle the received respponse
            console.log('Received response:', response);
        });

        // socket.on('disconnect', () => {
        //     console.log('WebSocket connection closed');
        // });

        // return () => {
        //     socket.disconnect();
        // };
        handleButtonClick();
    }, []);


    const handleButtonClick = async () => {
        try {
            console.log(user_id)
            const response = await axios.get('http://localhost:8000/api/request', {
                headers: {
                    user_id
                }
            });
            // console.log("hello");
            console.log('Node API GET request successful');
            // Process the response data here
            console.log(response);
        } catch (error) {
            // Handle error
            console.error('Error making Node API GET request:', error);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Make Request</button>
            {/* <h5>response: {response}</h5> */}
        </div>
    );
};

export default RequestApi;