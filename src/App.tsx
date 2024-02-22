// import { useState } from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider,createRoutesFromElements,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import NotFoundPage from './pages/NotFoundPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import { useAuth } from './context/AuthContext'

function App() {
  const auth=useAuth()
const router=createBrowserRouter(createRoutesFromElements(
  <>
  <Route path='/' element={<HomePage/>}/>
  {auth?.isLoggedIn&&auth.user&&(<Route path='/chat' element={<ChatPage/>}/>)}
  <Route path='*' element={<NotFoundPage/>}/>
  <Route path='/signIn' element={<SignInPage/>}/>
  <Route path='/signUp' element={<SignUpPage/>}/>
  </>
))
  return (
<RouterProvider router={router}/>
  )
}

export default App
