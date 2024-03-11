import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Services from './pages/Services'
import AboutUs from './pages/AboutUs'
import exotic from './assets/exotic.png'
import Authentication from './pages/Authentication'
import AdminAuthentication from './pages/AdminAuthentication'
import Account from './pages/Account'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGIN, selectIsLoggedIn, selectPage, selectUser } from './redux/features/auth/authSlice'
import { SET_ARCHIVED_ORDERS, SET_ORDERS } from './redux/features/account/accountSlice'
import { getArchivedUserOrders, getEveryOrder, getUserOrders } from './services/orderService'
import ResetPassword from './pages/ResetPassword'
import EmailVerified from './pages/EmailVerified'



function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const pageRedux = useSelector(selectPage)
    const isLoggedInRedux = useSelector(selectIsLoggedIn)
    const userRedux = useSelector(selectUser)

    const goToTop = () => {
        console.log('func working')
        const homeWindow = document.getElementById('home')
        homeWindow.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    const getAllUserOrders = async () => {
        try {
            const activeOrdersData = await getUserOrders()
            const archivedOrdersData = await getArchivedUserOrders()

            if (activeOrdersData) {
                dispatch(SET_ORDERS(activeOrdersData))
            }
            if (archivedOrdersData) {
                dispatch(SET_ARCHIVED_ORDERS(archivedOrdersData))
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getAllCustomerOrders = async () => {
        try {
            const data = await getEveryOrder()
            if (data) {
                dispatch(SET_ORDERS(data.uncompletedOrders))
                dispatch(SET_ARCHIVED_ORDERS(data.completedOrders))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log('fired infinite check')
        function handleStorageChange() {
            if (userRedux.privilege === 'Basic') {
                const userName = localStorage.getItem('jayAutoSpaUserName')
                if (userName === null) {
                    dispatch(SET_LOGIN(false))
                    navigate('/authentication')
                }
            }
            if (userRedux.privilege === 'Admin') {
                const adminUserName = localStorage.getItem('jayAutoSpaAdminName')
                console.log('adminUserName')
                console.log(adminUserName)
                if (adminUserName === null) {
                    dispatch(SET_LOGIN(false))
                    navigate('/authentication')
                }
            }
        }
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [userRedux, dispatch, navigate])

    useEffect(() => {
        if (isLoggedInRedux) {
            if (pageRedux === 'Home') {
                navigate('/')
            } else if (pageRedux === 'Booking') {
                navigate('/booking')
            }
            else if (pageRedux === 'Services') {
                navigate('/services')
            } else if (pageRedux === 'About Us') {
                navigate('/aboutUs')
            } else if (pageRedux === 'Account') {
                navigate('/account')
            }
        }
    }, [isLoggedInRedux, pageRedux])

    useEffect(() => {
        if (isLoggedInRedux && userRedux.privilege === 'Basic') {
            getAllUserOrders()
        }
        if (isLoggedInRedux && userRedux.privilege === 'Admin') {
            getAllCustomerOrders()
        }
    }, [isLoggedInRedux, userRedux])


    return (

        <div className='App'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/authentication' element={<Authentication />} />
                <Route path='/adminAuthentication' element={<AdminAuthentication />} />
                <Route
                    path="/resetpassword/:resetToken"
                    element={<ResetPassword />}
                />
                <Route
                    path="/verifyEmail/:emailVerifyToken"
                    element={<EmailVerified />}
                />
                <Route path='/booking' element={<Booking />} />
                <Route path='/services' element={<Services />} />
                <Route path='/aboutUs' element={<AboutUs />} />
                <Route path='/account' element={<Account />} />

            </Routes>
            <div className="h-[50px] w-[50px] flex flex-col justify-center absolute bottom-3 right-3 rounded-lg bg-transparent insetShadow cursor-pointer" onClick={() => goToTop()}>
                <img src={exotic} alt="" />
                <h6 className='text-center text-white montFont text-[8px] font-semibold '>SCROLL-UP</h6>
            </div>
        </div>
    )
}

export default App
