import { createSlice } from "@reduxjs/toolkit";
import { htmlQuestions } from "./questions";

const htmlQuizSlice = createSlice({
    name: 'htmlQuiz',
    initialState:{
        htmlQuestions,
        currentQuestionIndex: 0,
        result: 0,
    },
    reducers:{
        htmlSelectOption: (state, {payload})=>{
            state.htmlQuestions[state.currentQuestionIndex].selected = payload
        },
        htmlCheckAnswer: (state, {payload})=>{
            state.htmlQuestions[state.currentQuestionIndex].isCorrect = payload
        },
        htmlNextQuestion: (state)=>{
            const correctAnswer = 
            state.htmlQuestions[state.currentQuestionIndex].selected ===
            state.htmlQuestions[state.currentQuestionIndex].correct
            state.currentQuestionIndex++;
            state.result += correctAnswer ? 10 : 0

        },
        htmlResetQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.result = 0;
            state.htmlQuestions.forEach((question) => {
                question.selected = null; 
                question.isCorrect = false;
            });
        },
       
    }
})




export const {htmlSelectOption, htmlNextQuestion, htmlResetQuiz, htmlCheckAnswer} = htmlQuizSlice.actions

export default htmlQuizSlice