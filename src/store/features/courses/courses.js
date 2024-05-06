import { createSlice } from "@reduxjs/toolkit";


const CoursesSlice = createSlice({
    name: 'courses',
    initialState:{
        favoriteCourses: JSON.parse(localStorage.getItem('favCourses')) || [],
        courseModal:false
    },
    reducers:{
        setFavCourse: (state, {payload})=>{
            state.favoriteCourses.push(payload)
            localStorage.setItem('favCourses', JSON.stringify(state.favoriteCourses))
        },
        removeFavCourse: (state, {payload})=>{
            state.favoriteCourses = state.favoriteCourses.filter(course=> course.id !== payload.id)
            localStorage.setItem('favCourses', JSON.stringify(state.favoriteCourses))
        },
        setCourseModal:(state, {payload})=>{
            state.courseModal = payload
        }
    }
})

export const {setFavCourse, removeFavCourse, setCourseModal} = CoursesSlice.actions

export default CoursesSlice