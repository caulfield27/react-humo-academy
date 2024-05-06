import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = 'http://localhost:3001/courses'

export const getCourses = createAsyncThunk('get/getCourses',
    async ()=>{
        try{
            const response = await axios.get(api)
            return response.data
        }catch(error){
            console.log(error)
        }
    }
)

const getCoursesSlice = createSlice({
    name: 'getCourses',
    initialState:{
        courses:[],
        isLoading:false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourses.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getCourses.fulfilled, (state, action) => {
          state.isLoading = false;
          state.courses = action.payload;
        });
    }
})

  
export default getCoursesSlice
  