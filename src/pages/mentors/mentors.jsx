import styles from '../mentors/mentors.module.css'
import { useSelector } from 'react-redux'
import { mentors } from './mentorsInfo'
import mentorsIllus from '../../assets/mentors.jpg'
import { motion } from 'framer-motion'


const Mentors = ()=>{

    const dropdown = useSelector((state)=> state.books.dropdown)


    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}>

                <div className={dropdown ? `${styles.mentors_wrapper} ${styles.adaptive_wrapper}` : styles.mentors_wrapper}>
                    <div className={styles.mentors_header}>
                        <img src={mentorsIllus} alt="mentors" />
                        <h1>Humo academy mentors</h1>
                    </div>
                    <hr />
                    <div className={styles.mentors_container}>
                        {mentors.map((mentor, id) =>
                            <div key={id + 1} className={styles.mentors_card}>
                                <div>
                                    <img src={mentor.img} alt="mentor" />
                                </div>
                                <span className={styles.name}>{mentor.name}</span>
                                <span className={styles.role}>{mentor.role}</span>
                                <div className={styles.mentor_description}>{mentor.description}</div>
                            </div>
                        )}

                    </div>
                </div>

            </motion.div>


        </>
        
    )
}

export default Mentors