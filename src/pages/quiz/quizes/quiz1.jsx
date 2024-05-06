import styles from '../quizes/quizes.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectOption, nextQuestion , checkAnswer,resetQuiz} from '../../../store/features/quiz/quiz'
import AnswersModal from '../answersModal/answersModal'
import { setQuizModal } from '../../../store/features/quiz/quizModal'
import Quiz from '../../../components/quiz/quiz';
import quizComplete1 from '../../../assets/completeOrange.jpg'
import { Button, Rating } from '@mui/material'
import { motion } from 'framer-motion'
import ChecklistIcon from '@mui/icons-material/Checklist';
import ProgressBar from '../../../components/progressBar/progressBar'
import { quizes } from '../quizPage'



const Quiz1 = () =>{
    const jsQuestions = useSelector((state)=> state.quiz.jsQuestions) 
    const currentQuestion = useSelector((state)=> state.quiz.jsQuestions[state.quiz.currentQuestionIndex])
    const result = useSelector((state)=> state.quiz.result)
    const dropdown = useSelector((state)=> state.books.dropdown)
    const dispatch = useDispatch()

    let maxPoint = 0;
    for(let i = 0; i < jsQuestions.length; i++){
        maxPoint += 10
    }
    
    const handleReset = ()=>{
        dispatch(resetQuiz())
    }

    if (!currentQuestion) {
        return( 
            <>
                <AnswersModal questions={jsQuestions} />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                > 
                    <div className={dropdown ? `${styles.completed} ${styles.dropdown_active}` : styles.completed}>
                        <div className={styles.completed_image}>
                            <img src={quizComplete1} alt="" />
                            <div className={styles.quiz_info}>
                                <img src={quizes[0].img} alt="js"/>
                                <div className={styles.info_text}>
                                    <span className={styles.name_info}>name:<span className={styles.name}>{quizes[0].name}</span></span>
                                    <div className={styles.complex}>
                                        <span className={styles.complex_text}>complexity:</span>
                                        <Rating className={styles.raiting} name="quiz-complex" value={quizes[0].complexity} precision={0.5} readOnly />
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <div className={styles.completed_result}>
                            <h1>Quiz completed! Your final result</h1>
                            <span className={styles.final_result}>{`${result} of ${maxPoint} points`}</span>
                            <ProgressBar result={result}/>
                            <div className={styles.complete_button_wrap}>
                                <Button variant="contained" color="success" onClick={() => dispatch(setQuizModal(true))}>
                                    <ChecklistIcon className={styles.button_icon}/>show answers
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleReset}>
                                    try again
                                </Button>
                                
                            </div>
                            
                        </div>

                    </div>
                </motion.div>
            </>
            
        ) 
    }

    return (
       <>
            <Quiz questions={jsQuestions} currentQuestion={currentQuestion}
                selectOption={selectOption} nextQuestion={nextQuestion} checkAnswer={checkAnswer}
                infoIndex={0} result={result}
            />
       </> 
       
    )
}

export default Quiz1