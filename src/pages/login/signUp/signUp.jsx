import styles from '../login.module.css'
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react';
import { handleSignup } from '../../../store/features/auth/auth';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const SignUp = ()=>{
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('')
    const navigate = useNavigate()
    const [validation, setValidation] = useState({
    email: false,
    password: false,
    fullName:false
  });

    const dropdown = useSelector((state)=> state.books.dropdown)
    
    const handleSignupSubmit = (e) =>{
        e.preventDefault()
        dispatch(handleSignup(email, fullName,password, navigate))
    }

    const isDataComplete = email.trim() !== '' && password.trim() !== '' && password.trim() !== '';

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}>
                <div className={dropdown ? `${styles.login_wrapper} ${styles.dropdown_login_wrapper}` : styles.login_wrapper}>
                    <div className={styles.login_container}>
                        <div className={styles.login}>
                            <h2 className={styles.h2}>Sign up</h2>
                            <form className={styles.form} onSubmit={handleSignupSubmit}>
                                <div className={styles.input_wrap}>
                                    <input className={styles.input} type='email'
                                        placeholder='@email'
                                        value={email}
                                        onFocus={() => setValidation({ ...validation, email: false })}
                                        onBlur={() => setValidation({ ...validation, email: true })}
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                    {email == '' && validation.email &&
                                        <span>поле должно быть заполненным</span>
                                    }

                                </div>
                                <div className={styles.input_wrap}>
                                    <input className={styles.input} type='text'
                                        placeholder='full name'
                                        value={fullName}
                                        onFocus={() => setValidation({ ...validation, fullName: false })}
                                        onBlur={() => setValidation({ ...validation, fullName: true })}
                                        onChange={(e) => { setFullName(e.target.value) }} />
                                    {fullName == '' && validation.fullName &&
                                        <span>поле должно быть заполненным</span>
                                    }

                                </div>
                                <div className={styles.input_wrap}>
                                    <input className={styles.input} type='password'
                                        placeholder='password'
                                        value={password}
                                        onFocus={() => setValidation({ ...validation, password: false })}
                                        onBlur={() => setValidation({ ...validation, password: true })}
                                        onChange={(e) => { setPassword(e.target.value) }} />
                                    {password == '' && validation.password &&
                                        <span>поле должно быть заполненным</span>
                                    }
                                </div>
                                <Button type='submit' variant='contained' disabled={!isDataComplete}>Sign up</Button>

                            </form>
                            <footer className={styles.login_footer}>
                                <span>You already have account?</span>
                                <a href="/login">log in</a>
                            </footer>
                        </div>
                    </div>
                </div>

            </motion.div>

        </>
        
    )
}

export default SignUp