import styles from '../quizes/quizes.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { reactSelectOption, reactNextQuestion,reactCheckAnswer, resetReactQuiz} from '../../../store/features/quiz/reactQuiz'
import { setQuizModal } from '../../../store/features/quiz/quizModal'
import AnswersModal from '../answersModal/answersModal'
import quizComplete1 from '../../../assets/completeOrange.jpg'
import Quiz from '../../../components/quiz/quiz'
import { motion } from 'framer-motion'
import ProgressBar from '../../../components/progressBar/progressBar'
import { Button,Rating } from '@mui/material'
import ChecklistIcon from '@mui/icons-material/Checklist';
import ShareIcon from '@mui/icons-material/Share';
import { quizes } from '../quizPage'


const Quiz2 = () =>{
    const reactQuestions = useSelector((state)=> state.reactQuiz.reactQuestions) 
    const currentQuestion = useSelector((state)=> state.reactQuiz.reactQuestions[state.reactQuiz.currentQuestionIndex])
    const result = useSelector((state)=> state.reactQuiz.result)
    const dispatch = useDispatch()

    let maxPoint = 0;
    for(let i = 0; i < reactQuestions.length; i++){
        maxPoint += 10
    }

    const handleReset = () =>{
        dispatch(resetReactQuiz())
    }

    if (!currentQuestion) {
        return(
            <>  
               <AnswersModal questions={reactQuestions}/>
               <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }} 
                >
                    <div className={styles.completed}>
                        <div className={styles.completed_image}>
                            <img src={quizComplete1} alt="" />
                            <div className={styles.quiz_info}>
                                <img src={quizes[1].img} alt="js" />
                                <div className={styles.info_text}>
                                    <span className={styles.name_info}>name:<span className={styles.name}>{quizes[1].name}</span></span>
                                    <div className={styles.complex}>
                                        <span className={styles.complex_text}>complexity:</span>
                                        <Rating className={styles.raiting} name="quiz-complex" value={quizes[1].complexity} precision={0.5} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.completed_result}>
                            <h1>Quiz completed! Your final result</h1>
                            <span className={styles.final_result}>{`${result} of ${maxPoint} points`}</span>
                            <ProgressBar result={result} />
                            <div className={styles.complete_button_wrap}>
                                <Button variant="contained" color="success" onClick={() => dispatch(setQuizModal(true))}>
                                    <ChecklistIcon className={styles.button_icon} />show answers
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
       <Quiz questions={reactQuestions} currentQuestion={currentQuestion}
            selectOption={reactSelectOption} nextQuestion={reactNextQuestion}
            checkAnswer={reactCheckAnswer} infoIndex={1} result={result}
        />
    )
}


export default Quiz2