import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../app/features/authSlice'

const Navbar = () => {

    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const logoutUser = () =>{
        navigate('/')
        dispatch(logout())
    }

  return (
    <div className='shadow bg-white'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 text-slate-800 transition-all'>
        <Link to='/'>
          <img src='/logo.svg' alt='logo' className='h-11 w-auto'/>
        </Link>

        <div className='flex items-center gap-3 sm:gap-4 text-sm'>
            <p className='max-sm:hidden'>Hi, {user?.name}</p>
            <button onClick={logoutUser} className='bg-blue-500 text-white hover:bg-blue-600 px-4 sm:px-6 py-1.5 rounded-full active:scale-95 transition-all text-xs sm:text-sm'>
                Logout
            </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

