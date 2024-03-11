
import { useEffect, useState } from 'react'
import logo1 from '../../assets/logo1.png'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
// import { AiOutlineMenuUnfold } from 'react-icons/ai'
import { BiSolidSearch } from 'react-icons/bi'
import { MdShoppingCart } from 'react-icons/md'
import { MdAccountCircle } from 'react-icons/md'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { SET_EMAIL_VERIFIED, SET_PAGE, SET_SHOW_NAV_MODAL, selectIsLoggedIn, selectPage, selectShowNavModal, selectUser } from '../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../services/authService'
import { SET_LOGIN, SET_SUCCESS_MSG, SET_ERROR_MSG } from '../../redux/features/auth/authSlice'

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const showNavModalRedux = useSelector(selectShowNavModal)
    const pageRedux = useSelector(selectPage)
    const isLoggedInRedux = useSelector(selectIsLoggedIn)
    const userRedux = useSelector(selectUser)

    // const [page, setPage] = useState('Home') //set redux state as well and navigate to page fxn here
    const [windowWidth, setWindowWidth] = useState()

    const toggleNavModal = () => {
        if (showNavModalRedux === true) {
            dispatch(SET_SHOW_NAV_MODAL(false))
        } else {
            dispatch(SET_SHOW_NAV_MODAL(true))
        }
    }

    const togglePage = (e) => {
        // setPage(e.target.innerText)
        if (e.target.innerText === 'Home') {
            dispatch(SET_PAGE('Home'))
            navigate('/')
        } else if (e.target.innerText === 'About Us') {
            dispatch(SET_PAGE(e.target.innerText))
            navigate(`/aboutUs`)
        } else {
            dispatch(SET_PAGE(e.target.innerText))
            const lowerCase = e.target.innerText.toLowerCase()
            navigate(`/${lowerCase}`)
        }
    }

    const tryLogoutUser = async () => {
        try {
            const res = await logoutUser()

            if (res) {
                const name = userRedux.name
                const firstLastNames = name.split(' ')
                localStorage.removeItem('jayAutoSpaUserName')
                dispatch(SET_LOGIN(false))
                navigate('/authentication')
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: `See You Soon, ${firstLastNames[0]}` }))
                dispatch(SET_EMAIL_VERIFIED(false))
            }

        } catch (error) {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Unable To Logout User' }))
            console.log(console.log(error))
        }
    }

    const handleAccountNavigate = () => {
        if (!isLoggedInRedux) {
            navigate('/authentication')
        } else {
            navigate('/account')
            dispatch(SET_PAGE('Account'))
        }
    }

    useEffect(() => {
        if (showNavModalRedux) {
            const handleWindowResize = () => {
                setWindowWidth(window.innerWidth);

                if (windowWidth > 767) {
                    dispatch(SET_SHOW_NAV_MODAL(false))
                }
            };

            window.addEventListener('resize', handleWindowResize);

            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        }
    }, [window.innerWidth])
    return (
        <div className="h-[10vh] w-full absolute top-0 flex justify-start items-center bg-black text-red-500 opacity-60">
            <div className='h-full w-1/3 md:w-1/6 flex items-center justify-start pl-[8px]'>
                <div className="h-full w-full btnAnimate1" id="slider-0" style={{ background: `url(${logo1}) center center / cover` }} onClick={() => navigate('/')}></div>
            </div>
            <div className='h-full w-2/3 md:w-5/6 flex justify-end items-center gap-[5%] pr-[5%] md:pr-[1%] navFont text-[14px]'>
                <div className='w-[60%] h-full hidden md:flex justify-evenly items-center text-darkBlue brightness-150'>
                    <div className={`${pageRedux === 'Home' ? "bg-darkBlue bg-opacity-25 rounded-md" : ""} h-[80%] w-[25%] hidden md:flex justify-center items-center cursor-pointer navLink`} onClick={(e) => togglePage(e)}>Home</div>
                    <div className={`${pageRedux === 'Booking' ? "bg-darkBlue bg-opacity-25 rounded-md" : ""} h-[80%] w-[25%] hidden md:flex justify-center items-center cursor-pointer navLink`} onClick={(e) => togglePage(e)}>Booking </div>
                    <div className={`${pageRedux === 'Services' ? "bg-darkBlue bg-opacity-25 rounded-md" : ""} h-[80%] w-[25%] hidden md:flex justify-center items-center cursor-pointer navLink`} onClick={(e) => togglePage(e)}>Services </div>
                    <div className={`${pageRedux === 'About Us' ? "bg-darkBlue bg-opacity-25 rounded-md" : ""} h-[80%] w-[25%] hidden md:flex justify-center items-center cursor-pointer navLink`} onClick={(e) => togglePage(e)}>About Us </div>
                </div>
                <div className='w-[15%] h-full hidden md:flex justify-center items-center gap-[5%]'>
                    <BiSolidSearch size={'24px'} className='text-darkBlue cursor-pointer jiggle' />
                    <MdShoppingCart size={'24px'} className='text-darkBlue cursor-pointer jiggle' onClick={() => navigate('/booking')} />
                    <MdAccountCircle size={'24px'} className='text-darkBlue cursor-pointer jiggle' onClick={() => handleAccountNavigate()} />
                    {isLoggedInRedux && <RiLogoutCircleLine size={'24px'} className='text-brightRed cursor-pointer jiggle' onClick={() => tryLogoutUser()} />}
                </div>
                {showNavModalRedux ? <AiOutlineMenuUnfold
                    size={'32px'} className='text-darkBlue md:hidden cursor-pointer' onClick={() => toggleNavModal()}
                /> :
                    <AiOutlineMenuFold size={'32px'} className='text-darkBlue md:hidden cursor-pointer' onClick={() => toggleNavModal()} />
                }
            </div>
        </div>
    )
}

export default Navbar