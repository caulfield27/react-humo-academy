import styles from '../answersModal/answersModal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setQuizModal } from '../../../store/features/quiz/quizModal'
import correct from '../../../assets/13984041.png'
import { motion } from 'framer-motion'


const AnswersModal = ({questions})=>{
    const modal = useSelector((state)=> state.quizModal.modal)
    const dispatch = useDispatch()

   
    const handleAnswersModal = () =>{
        dispatch(setQuizModal(false))
    }

   


    return (
       
        <div className={modal ? styles.modal_wrapper : styles.modal_close}>
            <div className={styles.modal}>
                <div className={styles.modal_content}>
                    <div className={styles.modal_header}>
                        <button onClick={handleAnswersModal}>&#10006;</button>
                    </div>
                    <div className={styles.modal_body}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}>
                            {questions.map((question, ind) =>
                                <div className={styles.question_wrap} key={ind + 1}>
                                    <div className={styles.modal_question}>Quesrtion {question.id} :</div>
                                    <div className={styles.question}>{question.question}</div>
                                    <div className={styles.options_wrap}>
                                        {question.variants.map((option, id) =>

                                            <div className={option === question.correct ? styles.correct_background : (option === question.selected ? styles.wrong_background : styles.variants)} key={id + 1}>
                                                <img className={option === question.correct ? styles.correct : styles.display_none} src={option === question.correct ? correct : ''} alt="" />
                                                <div className={styles.answer_wrap}>
                                                    <div>{option}</div>
                                                    <span className={option === question.selected ? styles.your_answer : styles.display_none}>your answer</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default AnswersModal