import { createSlice } from "@reduxjs/toolkit";


const quizModalSlice = createSlice({
    name: 'quizModal',
    initialState:{
        modal: false
    },
    reducers: {
        setQuizModal: (state, {payload}) =>{
            state.modal = payload
        }
    }
})

export const {setQuizModal} = quizModalSlice.actions

export default quizModalSlice