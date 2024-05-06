import { useSelector } from 'react-redux'
import styles from '../setting/settings.module.css'
import { motion } from 'framer-motion'

const Settings = () =>{

    const dropdown = useSelector((state)=> state.books.dropdown)
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className={dropdown ? `${styles.settings_wrapper} ${styles.dropDown_active}` : styles.settings_wrapper}></div>
                <h1>Settings</h1>
            </motion.div>
          
        </>
        
    )
}

export default Settings