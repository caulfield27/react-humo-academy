import styles from '../quiz/quiz.module.css'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import {Button} from '@mui/material';
import QuizInfo from '../quizInfo/quizInfo';
import ProgressBar from '../progressBar/progressBar';



const Quiz = ({questions, currentQuestion, 
     selectOption, nextQuestion,checkAnswer,infoIndex,
     result}) =>{
    
    const dropdown = useSelector((state)=>state.books.dropdown)
    const dispatch = useDispatch()
   

    
    const handleCheckboxChange = (event)=>{  
        dispatch(selectOption(event.target.value))
        
    }

    

    const handleNextQuestion = ()=>{
        const isCorrect = currentQuestion.selected === currentQuestion.correct
        dispatch(checkAnswer(isCorrect));
        dispatch(nextQuestion());
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className={dropdown ? `${styles.jsQuiz_wrapper} ${styles.dropdown_active}` : styles.jsQuiz_wrapper}>
                    <div className={styles.quiz_container}>
                        <QuizInfo result={result} infoIndex={infoIndex}/>         
                        <div className={styles.quiz_content}>
                            <div className={styles.quiz_header}>
                                <div className={styles.question}>
                                    <span className={styles.q}>Question:</span><span className={styles.id}>{currentQuestion.id}</span><span className={styles.length}> | {questions.length}</span>
                                </div>
                                <ProgressBar result={result}/>
                            </div>
                            <div>
                                <p>{currentQuestion.question}</p>
                            </div>
                            <div className={styles.quiz_body}>
                                <RadioGroup
                                    aria-labelledby="quiz-options"
                                    defaultValue="quiz"
                                    name="quiz-options"
                                    value={currentQuestion.selected || ''}
                                    onChange={handleCheckboxChange}
                                    className={styles.options_wrap}
                                >

                                    {currentQuestion.variants.map((variant, ind) => {
                                        return <FormControlLabel
                                            key={ind + 1}
                                            value={variant} 
                                            control={<Radio checked={currentQuestion.selected === variant} color="error"/>}
                                            label={variant}
                                            className={styles.quiz_options}
                                            
                                        />
                                    })}
                                </RadioGroup>

                            </div>
                            <div className={styles.quiz_footer}>
                                <Button disabled={!currentQuestion.selected} variant="contained" color="success" onClick={handleNextQuestion}>
                                    {currentQuestion.id == questions.length ? 'Finish' : `Next`}

                                </Button>   
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </>
        
       
    )
}

export default Quiz