import { configureStore } from "@reduxjs/toolkit";
import BooksSlice from "./features/books";
import jsQuizSlice from "./features/quiz/quiz";
import reactQuizSlice from "./features/quiz/reactQuiz";
import quizModalSlice from "./features/quiz/quizModal";
import pyQuizSlice from "./features/quiz/pyQuiz";
import htmlQuizSlice from "./features/quiz/htmlQuiz";
import getCoursesSlice from "./features/courses/getCourses";
import authSlice from "./features/auth/auth";
import CoursesSlice from "./features/courses/courses";

const store = configureStore({
    reducer:{
        books: BooksSlice.reducer,
        quiz: jsQuizSlice.reducer,
        reactQuiz:reactQuizSlice.reducer,
        quizModal:quizModalSlice.reducer,
        pyQuiz:pyQuizSlice.reducer,
        htmlQuiz: htmlQuizSlice.reducer,
        getCourses: getCoursesSlice.reducer,
        auth: authSlice.reducer,
        courses: CoursesSlice.reducer 
    }
})

export default store