import styles from '../CoursesCards/cards.module.css'
import { setCourseModal } from '../../store/features/courses/courses'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../assets/humoLogo.png'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'


const CourseModal = ()=>{
    const dispatch = useDispatch()
    const modal = useSelector((state)=> state.courses.courseModal)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const handleSubmit = (event) =>{
       
            event.preventDefault();
    
            const newStudent = {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim()
            };

            const students = JSON.parse(localStorage.getItem('students')) || [];

            const alredySigned = students.some(
                (student)=>
                student.name.toLowerCase() === newStudent.name.toLowerCase() &&
                student.email.toLowerCase() === newStudent.email.toLowerCase() &&
                student.phone.toLowerCase() === newStudent.phone.toLowerCase()
            )

            if(alredySigned){
                Swal.fire({
                    title: 'Sign up error',
                    text: 'you already signed up',
                    icon: 'info',
                    confirmButtonText:'ok' 
                })
                return
            }
    
            const currentStudents = [...students, newStudent];
            localStorage.setItem('students', JSON.stringify(currentStudents));

            Swal.fire({
                title:'form successed',
                text:'your application confirmed succesfully',
                icon: 'success'
            })
    
            
            setName('');
            setEmail('');
            setPhone('');
            dispatch(setCourseModal(false));
        
    }


    

    const handleCloseModal = (e)=>{
        if(e.target.classList.contains(styles.coursesModal_container)){
            dispatch(setCourseModal(false))
        }

    }

    useEffect(()=>{
        document.addEventListener('click', handleCloseModal)
        return ()=>{
            document.removeEventListener('click', handleCloseModal)
        }
    }, [])

    const isDataComplete = name.trim() !== '' && email.trim() !== '' && phone.trim() !== ''; 

    return (
        <div className={modal ? `${styles.coursesModal_container} ${styles.display_block}` : styles.display_none}>
            <div className={styles.courses_modal}>
                <div className={styles.modal_header}>
                    <center><h1>Sign up<br/>for Humo academy courses</h1></center>
                    <img src={logo} alt="humo logo" />
                </div>
                <form action="submit" onSubmit={handleSubmit}>
                    <div className={styles.input_field} style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <input type="text" placeholder='Your name'
                        value={name}
                        name='name'
                        onChange={(e)=> setName(e.target.value)}/>
                    </div>
                    <div className={styles.input_field} style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <input type="text" placeholder='Your email'
                        value={email}
                        name='email'
                        onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div className={styles.input_field}  style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <input type="text" placeholder='Your phone number'
                        value={phone}
                        name='phone'
                        onChange={(e)=> setPhone(e.target.value) }/>
                    </div>

                    
                    <Button disabled={!isDataComplete} type='submit'  variant='contained' color='error'>
                        Sign up application
                    </Button>
                </form>
            </div>
        </div>
    )

}

export default CourseModal