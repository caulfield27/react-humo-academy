import { Route, Routes } from 'react-router-dom'
import Cards from '../../pages/CoursesCards/cards'
import Home from '../../pages/home/home'
import Library from '../../pages/library/mainLibrary/library'
import Quizes from '../../pages/quiz/quizPage'
import Mentors from '../../pages/mentors/mentors'
import Login from '../../pages/login/login'
import Favorites from '../../pages/library/favorites/favorites'
import Quiz1 from '../../pages/quiz/quizes/quiz1'
import Quiz2 from '../../pages/quiz/quizes/quiz2'
import Quiz3 from '../../pages/quiz/quizes/quiz3'
import Quiz4 from '../../pages/quiz/quizes/quiz4'
import SignUp from '../../pages/login/signUp/signUp'
import MyCourses from '../../pages/myCourses/myCourses'
import Settings from '../../pages/setting/settings'

const AppRouter = ()=>{
    return(
        
        <Routes>
            
            <Route path='/' element={<Home/>}/>
            <Route path='/library' element={<Library/>}/> 
            <Route path='/library/favorites' element={<Favorites/>}/>
            <Route path='/quizes' element={<Quizes/>}/>
            <Route path='/quizes/quiz1' element={<Quiz1/>}/>
            <Route path='/quizes/quiz2' element={<Quiz2/>}/>
            <Route path='/quizes/quiz3' element={<Quiz3/>}/>
            <Route path='/quizes/quiz4' element={<Quiz4/>}/> 
            <Route path='/coursesCards' element={<Cards/>}/> 
            <Route path='/mentors' element={<Mentors/>}/> 
            <Route path='/login' element={<Login/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/myCourses' element={<MyCourses/>}/> 
            <Route path='/settings' element={<Settings/>}/>
        </Routes>

    )
}

export default AppRouter