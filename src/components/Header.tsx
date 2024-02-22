// import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink'
export default function Header() {

  const auth=useAuth()
  return (
   <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
    <Toolbar sx={{display:"flex"}}>
    <Logo/>
      <div>
        {auth?.isLoggedIn?<>
        
        <NavigationLink to='/chat' bg='#00fffc' text='Go To Chat' textColor='black'/>
        <NavigationLink to='/' bg='#51538f' textColor='white' text='Logout' onClick={auth.logOut}/>
        </>:<>
        <NavigationLink to='/signIn' bg='#00fffc' text='Sign in' textColor='black'/>
        <NavigationLink to='/signUp' bg='#51538f' textColor='white' text='Sign up' />
        
        </>}
      </div>
       
    </Toolbar>
   </AppBar>
  )
}
