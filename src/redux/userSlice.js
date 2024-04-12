import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        searchData: "lll",
        post: []
    },
    reducers: {
        login: (state, actions)=>{
            state.user = actions.payload;
        },
        logout: (state, actions)=>{
            state.user = null;
        },
        search : (state, actions)=>{
            return { ...state, searchData : actions.payload }
            
        },
        postData: (state, actions)=>{
            return {
                ...state, post: actions.payload
            }
            
        }
    }

});

export default userSlice.reducer;
export const { login, logout, search, postData } = userSlice.actions;
export const selectUser = (state)=> state.user.user;
export const searchInput = (state)=> state.searchData;