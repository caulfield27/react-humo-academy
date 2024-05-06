import styles from '../quizes/quizes.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { htmlSelectOption, htmlNextQuestion, htmlCheckAnswer,htmlResetQuiz } from '../../../store/features/quiz/htmlQuiz'
import { setQuizModal } from '../../../store/features/quiz/quizModal'
import AnswersModal from '../answersModal/answersModal'
import quizComplete1 from '../../../assets/completeOrange.jpg'
import Quiz from '../../../components/quiz/quiz'
import { motion } from 'framer-motion'
import ProgressBar from '../../../components/progressBar/progressBar'
import { Button, Rating} from '@mui/material'
import ChecklistIcon from '@mui/icons-material/Checklist';
import ShareIcon from '@mui/icons-material/Share';
import { quizes } from '../quizPage'


const htmlQuiz = () =>{
    const htmlQuestions = useSelector((state)=> state.htmlQuiz.htmlQuestions) 
    const currentQuestion = useSelector((state)=> state.htmlQuiz.htmlQuestions[state.htmlQuiz.currentQuestionIndex])
    const result = useSelector((state)=> state.htmlQuiz.result)
    const dispatch = useDispatch()

    let maxPoint = 0;
    for(let i = 0; i < htmlQuestions.length; i++){
        maxPoint += 10
    }

    const handleReset = () =>{
        dispatch(htmlResetQuiz())
    }

    if (!currentQuestion) {
        return(
            <>  
               <AnswersModal questions={htmlQuestions}/>
               <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }} 
                >
                     <div className={styles.completed}>
                     <div className={styles.completed_image}>
                            <img src={quizComplete1} alt="" />
                            <div className={styles.quiz_info}>
                                <img src={quizes[2].img} alt="js" />
                                <div className={styles.info_text}>
                                    <span className={styles.name_info}>name:<span className={styles.name}>{quizes[2].name}</span></span>
                                    <div className={styles.complex}>
                                        <span className={styles.complex_text}>complexity:</span>
                                        <Rating className={styles.raiting} name="quiz-complex" value={quizes[2].complexity} precision={0.5} readOnly />
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
       <Quiz questions={htmlQuestions} currentQuestion={currentQuestion}
            selectOption={htmlSelectOption} nextQuestion={htmlNextQuestion}
            checkAnswer={htmlCheckAnswer} infoIndex={2} result={result}
        />
    )
}


export default htmlQuiz