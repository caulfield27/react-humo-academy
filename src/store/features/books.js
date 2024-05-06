import { createSlice } from "@reduxjs/toolkit";



export const getApi = (page)=> async (dispatch)=>{
    try{
        dispatch(setDownload(true))
        const response = await fetch(`http://localhost:3000/books?_page=${page}&_per_page=10`);
        const data = await response.json();
        dispatch(setBooks(data.data));
    }catch(e){
        console.log(e);
    }finally{
        dispatch(setDownload(false));
    }
}



const BooksSlice = createSlice({
    name:'books',
    initialState:{
        booksList:[],
        loading: false,
        booksModal: false,
        dropdown:false,
        currentBook: {},
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    },
    reducers:{
        setBooks:(state, {payload})=>{
            state.booksList = payload
        },
        setDownload: (state, {payload})=>{
            state.loading = payload
        },
        setBooksModal: (state, {payload})=>{
            state.booksModal = payload
        },
        setCurrentBook: (state, {payload})=>{
            state.currentBook = payload
        },
        setFavorites: (state, {payload})=>{
            state.favorites.push(payload)
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },
        removeFavorite: (state, {payload})=>{
            state.favorites = state.favorites.filter((book) => book.id !== payload.id)
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },
        setDropdown: (state, {payload})=>{
            state.dropdown = payload
        }
       
    }
})

export const {setBooks, setDownload, setBooksModal, 
    setCurrentBook, setFavorites, removeFavorite,
    setDropdown} = BooksSlice.actions

export default BooksSlice
