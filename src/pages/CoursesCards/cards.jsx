import styles from '../CoursesCards/cards.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { getCourses } from '../../store/features/courses/getCourses'
import {Button} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { removeFavCourse, setCourseModal, setFavCourse } from '../../store/features/courses/courses'
import CourseModal from './courseSignModal'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'




const Cards = ()=>{
    const dispatch = useDispatch()
    const dropdown = useSelector((state)=> state.books.dropdown)
    const isLoading = useSelector((state)=> state.getCourses.isLoading) 
    const courses = useSelector((state)=> state.getCourses.courses)
    const favCourses = useSelector((state)=> state.courses.favoriteCourses)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const isAuth = useSelector((state)=> state.auth.isAuth)
    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    
    useEffect(()=>{
        dispatch(getCourses())
    },[])

    const handleFavoriteCourse = (currentCourse)=>{

        if(isAuth){
            if(favCourses.some(course=> course.id === currentCourse.id)){
                dispatch(removeFavCourse(currentCourse))
                Swal.fire({
                    title:'Card was deleted',
                    icon: 'success'
                })
            }else{
                dispatch(setFavCourse(currentCourse))
                Swal.fire({
                    title:'Added to favorites',
                    icon: 'success'
                })
            }
            
        }else{
            Swal.fire({
                text:'Log in or sign up to adding favovrite courses',
                icon:'info',
                footer: '<a href="/login">log in?</a>',
                showConfirmButton: false
                
            })

            
        }
        
       
    }


    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}>

                <CourseModal />
                <div className={dropdown ? `${styles.cards_wrapper} ${styles.adaptive_wrapper}` : styles.cards_wrapper}>
                    <div className={styles.courses_header}>
                        <h1>Humo academy programming courses</h1>
                    </div>
                    <div className={styles.courses_filter}>
                        <input type="text"
                            placeholder='search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Front-end">Front-end</option>
                            <option value="python">Python</option>
                            <option value="golang">Golang</option>
                            <option value="android">Android</option>
                        </select>

                    </div>
                    <div className={styles.cards_container}>
                        {isLoading ? <div className={styles.loading}><CircularProgress /></div> :

                            filteredCourses.map((course, id) =>
                                <div key={id + 1} className={styles.card}>
                                    <span className={styles.favoriteCardText}>Add to favorites</span>
                                    <FavoriteIcon onClick={() => handleFavoriteCourse(course)} className={favCourses.some(favcourse => favcourse.id === course.id) ? `${styles.favCard_active} ${styles.cards_favorites}` : styles.cards_favorites} />
                                    <div className={styles.card_left}>
                                        <h2>{course.name}</h2>
                                        <span className={styles.mentor}>{course.mentor}</span>
                                        <div className={styles.languages_wrap}>
                                            <p>You will learn &darr;</p>
                                            <div className={styles.language_img}>
                                                {course.languages.map((language, id) =>
                                                    <img src={language} alt="altf4" key={id + 1} />
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.orange}>
                                            <span>start {course.courseStart}</span>
                                        </div>
                                    </div>
                                    <div className={styles.card_right}>
                                        <img src={course.image} alt="" />
                                        <div className={styles.card_buttons}>
                                            <Button variant='outlined'
                                                color='secondary'
                                                onClick={() => dispatch(setCourseModal(true))}
                                            >sign up</Button>
                                        </div>
                                    </div>


                                </div>

                            )
                        }
                    </div>
                </div>

            </motion.div>

        </>


    )
}

export default Cards