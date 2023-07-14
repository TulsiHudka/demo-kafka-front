import axios from 'axios';

const makeRequest = async (user_id) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/nodeKafka/api/request`, { user_id });
        console.log('Node API POST request successful');
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error making the request.');
    }
};

export { makeRequest };
