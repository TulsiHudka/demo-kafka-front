import React, { useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const RequestApi = () => {
    const userId = "a43c9b0d-7380-41e2-847a-d11eaa5e7325"; // Replace with your hardcoded user ID
    useEffect(() => {
        handleButtonClick();

        const socket = io('http://localhost:8000');

        socket.on('connect', () => {
            console.log('WebSocket connection established');
        });

        socket.on('notification', (message) => {
            console.log(message);
            console.log('Received notification:', message);
            // Handle the notification message
        });

        socket.on('result', (result) => {
            // Handle the received result
            console.log('Received result:', result);
            // Update your component state or perform other operations with the result
        });

        // socket.on('disconnect', () => {
        //     console.log('WebSocket connection closed');
        // });

        // return () => {
        //     socket.disconnect();
        // };
    }, []);


    const handleButtonClick = async () => {
        try {
            console.log(userId)
            const response = await axios.get('http://localhost:8000/request', {
                headers: {
                    'userId': userId
                }
            });
            // console.log("hello");
            console.log('Node API GET request successful');
            // Process the response data here
            console.log(response.data);
        } catch (error) {
            // Handle error
            console.error('Error making Node API GET request:', error);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Make Request</button>
        </div>
    );
};

export default RequestApi;
