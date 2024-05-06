import Sidebar from './components/sidebar/sidebar'
import './App.css'
import AppRouter from './components/appRouter/appRouter'
import { useSelector } from 'react-redux'
import LogedSidebar from './components/sidebar/logedInSidebar'

function App() {
  const isAuth = useSelector((state)=> state.auth.isAuth)
  
  return (
    <>
      
      <div className='app-container'>
        {isAuth ? <LogedSidebar/> : <Sidebar/>}

        <div className='pages-content'>
            <AppRouter />
        </div>
      </div>
    
        
    </>
  )
}

export default App
