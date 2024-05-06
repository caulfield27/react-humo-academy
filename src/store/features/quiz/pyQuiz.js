import { createSlice } from "@reduxjs/toolkit";
import { pyQuestions } from "./questions";

const pyQuizSlice = createSlice({
    name: 'pyQuiz',
    initialState:{
        pyQuestions,
        currentQuestionIndex: 0,
        result: 0,
    },
    reducers:{
        pySelectOption: (state, {payload})=>{
            state.pyQuestions[state.currentQuestionIndex].selected = payload
        },
        pyCheckAnswer: (state, {payload})=>{
            state.pyQuestions[state.currentQuestionIndex].isCorrect = payload
        },
        pyNextQuestion: (state)=>{
            const correctAnswer = 
            state.pyQuestions[state.currentQuestionIndex].selected ===
            state.pyQuestions[state.currentQuestionIndex].correct
            state.currentQuestionIndex++;
            state.result += correctAnswer ? 10 : 0

        },
        pyResetQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.result = 0;
            state.pyQuestions.forEach((question) => {
                question.selected = null; 
                question.isCorrect = false;
            });
        },
       
    }
})




export const {pySelectOption, pyNextQuestion, pyResetQuiz, pyCheckAnswer} = pyQuizSlice.actions



export default pyQuizSlice