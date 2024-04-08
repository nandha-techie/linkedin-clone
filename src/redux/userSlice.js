import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, actions)=>{
            state.user = actions.payload;
        },
        logout: (state, actions)=>{
            state.user = null;
        }
    }


});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
export const selectUser = (state)=> state.user.user;