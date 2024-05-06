import { createSlice } from "@reduxjs/toolkit";
import { reactQuestions } from "./questions";

const reactQuizSlice = createSlice({
    name:'reactQuiz',
    initialState:{
        reactQuestions,
        currentQuestionIndex: 0,
        result:0
    },
    reducers:{
        reactSelectOption: (state, {payload})=>{
            state.reactQuestions[state.currentQuestionIndex].selected = payload
        },
        reactCheckAnswer: (state, {payload})=>{
            state.reactQuestions[state.currentQuestionIndex].isCorrect = payload
        },
        reactNextQuestion: (state)=>{
            const isCorrectAnswer = 
                state.reactQuestions[state.currentQuestionIndex].selected ===
                state.reactQuestions[state.currentQuestionIndex].correct;
            state.currentQuestionIndex++;
            state.result += isCorrectAnswer ? 10 : 0;
        },
        resetReactQuiz: (state)=>{
            state.result = 0
            state.currentQuestionIndex = 0
            state.reactQuestions.map((question)=>{
                question.selected = null
                question.isCorrect = false
            })
        }

    }
})

export const {reactSelectOption, reactNextQuestion, reactCheckAnswer,resetReactQuiz} = reactQuizSlice.actions

export default reactQuizSlice