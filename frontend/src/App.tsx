import { useEffect } from 'react'
import { Routes , Route , Navigate } from 'react-router'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Post from './pages/Post'
import Profile from './pages/Profile'
import Blog from './pages/Blog'
import Layout from './pages/Layout'
import Loading from './components/Loading'
import { useAppDispatch , useAppSelector } from './hooks/typehooks'
import { checkAuth } from './slice/Auth/AuthSlice'


 
const App = () => {
const {isAuthenticated , loading} = useAppSelector((state)=>state.auth)
const dispatch = useAppDispatch()

useEffect(() => {
  dispatch(checkAuth())
}, [isAuthenticated]);

if (loading) {
  return <Loading/>;
}

 

  return (
   <Routes>
     <Route path='/' element={isAuthenticated?<Layout/>:<Landing/>}>
      <Route path='post' element={<Post/>}></Route>
      <Route path='profile' element={<Profile/>}></Route>
      <Route path='' element={<Home/>}></Route>
      <Route path='blog/:id' element={<Blog/>}></Route>
     </Route>
      
      <Route path='/signin' element={isAuthenticated?<Navigate to={'/'}/>:<Signin/>}></Route>
      <Route path='/signup' element={isAuthenticated?<Navigate to={'/'}/>:<Signup/>}></Route>
   </Routes>

  )
}

export default App
