import styles from '../sidebar/sidebar.module.css'
import { navLinks } from './navLinks'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import humoLogo from '../../assets/humoLogo.png'
import { useSelector, useDispatch } from 'react-redux';
import { setDropdown } from '../../store/features/books';

const Sidebar = ()=>{
    const icons = [<HomeIcon/>,<LocalLibraryIcon/>,<QuizIcon/>,
    <SchoolIcon/>,<PersonIcon/>,<LoginIcon/>]
    const dropdown = useSelector((state)=>state.books.dropdown)
    const dispatch = useDispatch()
   


    return (
        <>  
            
            <div className={styles.sidebar_container}>
                <div className={dropdown ? styles.dropdown_active : styles.dropdown}>
                    {navLinks.map((link, ind) => {
                        return <NavLink key={ind + 1} className={({ isActive }) => isActive ? `${styles.nav_item} ${styles.active}` : styles.nav_item}
                            to={link.path}>
                            {icons[ind]} {link.name}
                        </NavLink>
                    })}
                    <div className={styles.x_wrap}>
                        <button className={styles.x} onClick={() => {dispatch(setDropdown(false))}}>&#10006;</button>
                    </div>
                </div>

                <div className={styles.sidebar_header}>
                    <div className={styles.logo_wrap}>
                        <img src={humoLogo} />
                        <h3>Humo Academy</h3>
                    </div>
                    <div className={styles.dropdown_btn} onClick={() =>{dispatch(setDropdown(true))}}>&#9776; Menu</div>


                </div>
                <hr />
                <div className={styles.navigation_wrap}>
                    {navLinks.map((link, key) => {
                        return <NavLink key={key} className={({ isActive }) => isActive ? `${styles.nav_item} ${styles.active}` : `${styles.nav_item}`}
                            to={link.path}>
                            {icons[key]}{link.name}
                        </NavLink>
                    })}
                </div>
            </div>

        </>
    )
}

export default Sidebar