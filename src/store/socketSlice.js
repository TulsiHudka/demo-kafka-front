import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        data: '',
        dummy: ''
    },
    reducers: {
        responseReceived: (state, action) => {
            state.data = action.payload
            return state
        },
        dummyDataReceived: (state, action) => {
            state.dummy = action.payload
            return state
        },
    },
});

export const { responseReceived, dummyDataReceived } = socketSlice.actions;

export default socketSlice.reducer;
