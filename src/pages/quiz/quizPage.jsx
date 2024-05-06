import styles from '../quiz/quizPage.module.css'
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export const quizes = [
    {
        name:'Java Script basics',
        path:'/quizes/quiz1',
        complexity: 2,
        img: 'https://itproger.com/img/tests/node-js.svg'
    },
    {
        name:'React quiz',
        path:'/quizes/quiz2',
        complexity: 3.5,
        img: 'https://itproger.com/img/tests/react-js.svg'
    },
    {
        name:'HTML & CSS',
        path:'/quizes/quiz3',
        complexity:2.5,
        img: 'https://itproger.com/img/tests/html.svg'
    },
    {
        name:'Python',
        path:'/quizes/quiz4',
        complexity: 5,
        img: 'https://itproger.com/img/tests/python.svg'
    },
]

const Quizes = ()=>{
    const navigate = useNavigate()
    const dropdown = useSelector((state)=> state.books.dropdown)
    
    const OpenQuiz = (quiz) =>{
        navigate(quiz.path)
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }} 
            >
            <div className={dropdown ? `${styles.quiz_wrapper} ${styles.dropdown_active}` : styles.quiz_wrapper}>
                <div className={styles.quizes_container}>
                    {quizes.map((quiz, ind) => {
                        return <div className={styles.quiz_card} key={ind + 1} onClick={() => OpenQuiz(quiz)}>
                            <span className={styles.quiz_name}>{quiz.name}</span>
                            <img src={quiz.img} alt="" />
                            <span>complexity:</span>
                            <Rating className={styles.raiting} name="quiz-complex" value={quiz.complexity} precision={0.5} readOnly />
                        </div>
                    })}
                </div>
            </div>
            </motion.div>
            
        </>
    )
}

export default Quizes