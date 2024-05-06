import { Rating } from "@mui/material"
import styles from '../quizInfo/quizInfo.module.css'
import { quizes } from "../../pages/quiz/quizPage"


const QuizInfo = ({result,infoIndex})=>{
    return (
        <div className={styles.quiz_container_header}>
            <img src={quizes[infoIndex].img} alt="js" />
            <span>{quizes[infoIndex].name}</span>
            <Rating className={styles.raiting} name="quiz-complex" value={quizes[infoIndex].complexity} precision={0.5} readOnly />
        </div>
    )
}

export default QuizInfo