import styles from '../login/login.module.css'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { handleLogin } from '../../store/features/auth/auth'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Login = ()=>{
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [validation, setValidation] = useState({
    email: false,
    password: false
  });
    const dropdown = useSelector((state)=> state.books.dropdown)
    
    const handleLoginSubmit = (e)=>{
        e.preventDefault()
        dispatch(handleLogin(email,password,navigate))
    }   

    const isDataComplete = email.trim() !== '' && password.trim() !== '';

   
    return (

        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}>

                <div className={dropdown ? `${styles.login_wrapper} ${styles.dropdown_login_wrapper}` : styles.login_wrapper}>
                    <div className={styles.login_container}>
                        <div className={styles.login}>
                            <h2>Login</h2>
                            <form className={styles.form} onSubmit={handleLoginSubmit}>
                                <div className={styles.input_wrap}>
                                    <input type='email'
                                        placeholder='@email'
                                        value={email}
                                        onFocus={() => setValidation({ ...validation, email: false })}
                                        onBlur={() => setValidation({ ...validation, email: true })}
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                    {email == '' && validation.email &&
                                        <span>поле должно быть заполненным</span>}

                                </div>
                                <div className={styles.input_wrap}>
                                    <input type='password'
                                        placeholder='password'
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        onFocus={() => setValidation({ ...validation, password: false })}
                                        onBlur={() => setValidation({ ...validation, password: true })} />
                                    {password == '' && validation.password &&
                                        <span>поле должно быть заполненным</span>
                                    }
                                </div>
                                <Button type='submit' variant='contained' disabled={!isDataComplete}>login</Button>
                            </form>
                            <footer className={styles.login_footer}>
                                <span>You don't have account yet?</span>
                                <a href="/signUp">sign up</a>
                            </footer>
                        </div>
                    </div>
                </div>


            </motion.div>

        </>
        
    )
}

export default Login