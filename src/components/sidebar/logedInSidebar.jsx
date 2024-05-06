import styles from '../sidebar/sidebar.module.css'
import { logedLinks } from './logedLinks';
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
import { Avatar , IconButton , Menu , MenuItem, Divider, ListItemIcon} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useState } from 'react';
import { logOut } from '../../store/features/auth/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Settings } from '@mui/icons-material';


const LogedSidebar = ()=>{
    const icons = [<HomeIcon/>,<LocalLibraryIcon/>,<QuizIcon/>,
    <SchoolIcon/>,<PersonIcon/>,<LoginIcon/>]
    const dropdown = useSelector((state)=>state.books.dropdown)
    const dispatch = useDispatch()
    const currentUser = useSelector((state)=> state.auth.currentUser)
    const navigate = useNavigate()
    const favCourses = useSelector((state)=> state.courses.favoriteCourses)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

        

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogOut = () =>{
        setAnchorEl(null)
        dispatch(logOut())
        Swal.fire({
            text: 'you loged out from your account',
            icon: 'info'
        })        
    }

    const handleFavoiteBooks = () => {
        setAnchorEl(null);
        navigate('/library/favorites')
    };

    const handleClose = () =>{
        setAnchorEl(null)
    }

    const handleCourses = () =>{
        setAnchorEl(null);
        navigate('/myCourses')
    }

    const handleSettings = () =>{
        setAnchorEl(null);
        navigate('/settings')
    }

    return (
        <>  

            <div className={styles.sidebar_container}>
                <div className={dropdown ? styles.dropdown_active : styles.dropdown}>
                    {logedLinks.map((link, ind) => {
                        return <NavLink key={ind + 1} className={({ isActive }) => isActive ? `${styles.nav_item} ${styles.active}` : styles.nav_item}
                            to={link.path}>
                            {icons[ind]} {link.name}
                        </NavLink>
                    })}
                    <div className={styles.x_wrap}>
                        <button className={styles.x} onClick={() => { dispatch(setDropdown(false)) }}>&#10006;</button>
                    </div>
                </div>

                <div className={styles.sidebar_header}>
                    <div className={styles.logo_wrap}>
                        <img src={humoLogo} />
                        <h3>Humo Academy</h3>
                    </div>
                    <div className={styles.dropdown_btn} onClick={() => { dispatch(setDropdown(true)) }}>&#9776; Menu</div>


                </div>
                <hr />
                <div className={styles.navigation_wrap}>
                    {logedLinks.map((link, key) => {
                        return <NavLink key={key} className={({ isActive }) => isActive ? `${styles.nav_item} ${styles.active}` : `${styles.nav_item}`}
                            to={link.path}>
                            {icons[key]}{link.name}
                        </NavLink>
                    })}
                </div>

                <div className={styles.account}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>{currentUser.length > 0 ? currentUser[0].userEmail[0].toUpperCase() : ''}</Avatar>
                        <div className={favCourses.length > 0 ? styles.indicator : styles.indicatorDisplayNone}>
                            <span className={favCourses.length > 0 ? styles.indicator_count : styles.indicatorCountNone}>
                                {favCourses.length}
                            </span>
                        </div>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 20,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >   
                        <MenuItem>
                            <Avatar /> {currentUser.length > 0 ? currentUser[0].userName : ''}
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleCourses}>
                        
                            <ListItemIcon>
                                <SchoolIcon fontSize="small" />
                            </ListItemIcon>
                            My courses
                            <div className={favCourses.length > 0 ? styles.indicator : styles.indicatorDisplayNone}>
                                <span className={favCourses.length > 0 ? styles.indicator_count : styles.indicatorCountNone}>
                                    {favCourses.length}
                                </span>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={handleFavoiteBooks}>
                        
                            <ListItemIcon>
                                <LocalLibraryIcon fontSize="small" />
                            </ListItemIcon>
                            My favorite books
                        </MenuItem>
                        <MenuItem onClick={handleSettings}>
                        
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>

        </>
    )
}

export default LogedSidebar