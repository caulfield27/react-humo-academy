import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../../utils/token";
import Swal from "sweetalert2";


const addUsersToStorage = (users) =>{
    localStorage.setItem('users', JSON.stringify(users))
}

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isAuth: getToken(),
        users: JSON.parse(localStorage.getItem('users')) || [],
        currentUser: JSON.parse(localStorage.getItem('loggedInUser')) || null,
    },
    reducers:{
        setAuth : (state,{payload})=>{
            state.isAuth = payload
        },
        setUsers : (state, {payload})=>{
            state.users.push(payload)
            addUsersToStorage(state.users)
        },
        setCurrentUser: (state, {payload})=>{
            state.currentUser = payload
            localStorage.setItem('loggedInUser', JSON.stringify(payload));
        },
        logOut: (state)=>{
            state.isAuth = false
            localStorage.removeItem('loggedInUser')
            state.currentUser = null
        }
        
        
    }
})
 
export const handleLogin = (email, password, navigate) => {
    return async (dispatch, getState) => {
        const {users} = getState().auth
        
        const loggedInUser = users.filter((user)=>{
            return user.userEmail === email && user.userPassword === password
        })
        
        if (loggedInUser.length > 0) {
            dispatch(setAuth(true))
            dispatch(setCurrentUser(loggedInUser))
            navigate('/')
            Swal.fire({
                title: "Loged in successful",
                text: 'welcome to Humo Academy',
                icon: "success"
                
            })
        } else {
            Swal.fire({
                title: 'Login error!',
                text: "This account doesn't exist",
                icon: 'error',
                confirmButtonText: 'try again'  
              })
        }
    };
};



export const handleSignup = (email, fullName, password,navigate) => {
    return async (dispatch, getState) => {
        const { users } = getState().auth; 
        const existingUser = users.find(user => user.userEmail === email);
        if (existingUser) {
            Swal.fire({
                title: 'Sign up error',
                text:'User with this email already exist',
                icon: 'error',
                confirmButtonText: 'try again'
            })
        } else {
            const signedUser = {
                userEmail: email,
                userName: fullName, 
                userPassword: password,
                userToken: `token!*${email}${password}`
            };
            dispatch(setUsers(signedUser));
            navigate('/login')
            Swal.fire({ 
                title:'Signed up successfull',
                text:'login with your email',
                icon: 'success',
                confirmButtonText:'ok' 
            })
        }

    }
}


export const {setAuth, setUsers, setCurrentUser, logOut} = authSlice.actions
export default authSlice