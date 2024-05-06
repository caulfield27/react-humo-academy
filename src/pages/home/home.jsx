import styles from '../home/home.module.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = ()=>{
    const navigate = useNavigate()
    const dropdown = useSelector((state)=> state.books.dropdown)
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}>
                <div className={dropdown ? `${styles.home_wrapper} ${styles.dropdown_adaptive}` : styles.home_wrapper}>
                    <div className={styles.home_container}>
                        <div className={styles.header_text}>
                            <h1>Unlock Your Coding Potential with Humo Academy's Programming Courses</h1>
                            <p>Welcome to Humo Academy, where we empower you to master the art of programming. Discover our diverse range of courses designed to cater to beginners and seasoned coders alike. Whether you're interested in web development, data science, or mobile app creation, we have the resources and expertise to guide you towards success. Join us on a journey of learning and innovation today!</p>
                            <button onClick={() => navigate('/coursesCards')}>Start to learn free</button>
                        </div>
                        <div className={styles.header_img}>
                            <img src="https://cdn2.hexlet.io/assets/main_landing_hero-a0ae296e0b9f2395c6c442b2104000ddc260fabd559bef2b779e5fa039619192.svg" alt="" />
                        </div>
                    </div>
                </div>

            </motion.div>
       

        </>
        
        
    )
}

export default Home