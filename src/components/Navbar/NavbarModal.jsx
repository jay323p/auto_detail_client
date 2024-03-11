import { motion } from 'framer-motion'
import Navbar from './Navbar'
import NavBarSublinks from './NavBarSublinks'
import { useState } from 'react'
import { MdAccountCircle, MdShoppingCart } from 'react-icons/md'
import { BiSolidSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SET_PAGE, SET_SHOW_NAV_MODAL, selectIsLoggedIn } from '../../redux/features/auth/authSlice'

const homeOptions = ['Car Washing', 'Booking System', 'Pricing']
const bookingOptions = ['Book Now']
const servicesOptions = ['Interior', 'Exterior', 'Polishing / Ceramic Coating',]
const aboutUsOptions = ['Testimonials', 'Gallery', 'FAQ']


const NavbarModal = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoggedInRedux = useSelector(selectIsLoggedIn)

    const [showHomeOptions, setShowHomeOptions] = useState(false)
    const [showBookingOptions, setShowBookingOptions] = useState(false)
    const [showServicesOptions, setShowServicesOptions] = useState(false)
    const [showAboutUsOptions, setShowAboutUsOptions] = useState(false)

    const showSubLinks = (definer) => {
        if (definer === 'Home') {
            setShowHomeOptions((prev) => !prev)
            setShowBookingOptions(false)
            setShowServicesOptions(false)
            setShowAboutUsOptions(false)
        } else if (definer === 'Booking') {
            setShowHomeOptions(false)
            setShowBookingOptions((prev) => !prev)
            setShowServicesOptions(false)
            setShowAboutUsOptions(false)
        } else if (definer === 'Services') {
            setShowHomeOptions(false)
            setShowBookingOptions(false)
            setShowServicesOptions((prev) => !prev)
            setShowAboutUsOptions(false)
        } else {
            setShowHomeOptions(false)
            setShowBookingOptions(false)
            setShowServicesOptions(false)
            setShowAboutUsOptions((prev) => !prev)
        }
    }

    const goToBookingPage = () => {
        dispatch(SET_PAGE('Booking'))
        dispatch(SET_SHOW_NAV_MODAL(false))
        navigate('/booking')
    }

    const handleAccountNavigate = () => {
        if (isLoggedInRedux) {
            dispatch(SET_PAGE('Account'))
            dispatch(SET_SHOW_NAV_MODAL(false))
            navigate('/account')
        } else {
            dispatch(SET_SHOW_NAV_MODAL(false))
            navigate('/authentication')

        }
    }

    return (
        <motion.div className="min-h-[100vh] w-full flex flex-col justify-center bg-darkBlue overflow-y-hidden pt-[1rem] navFont" initial={{ x: 1800 }} animate={{ x: 0 }} transition={{ duration: 0.4 }}>
            <Navbar />
            <div className="h-[100vh] w-full mt-[10vh] pt-[1rem] flex flex-col gap-[1rem]">
                <NavBarSublinks showRespectiveOptions={showHomeOptions} respectiveOptions={homeOptions} showSubLinks={showSubLinks} label={'Home'} />
                <NavBarSublinks showRespectiveOptions={showBookingOptions} respectiveOptions={bookingOptions} showSubLinks={showSubLinks} label={'Booking'} />
                <NavBarSublinks showRespectiveOptions={showServicesOptions} respectiveOptions={servicesOptions} showSubLinks={showSubLinks} label={'Services'} />
                <NavBarSublinks showRespectiveOptions={showAboutUsOptions} respectiveOptions={aboutUsOptions} showSubLinks={showSubLinks} label={'About Us'} />
                <div className="h-[24%] w-full flex flex-col bg-opacity-20 bg-black">
                    <div className="h-[40%] w-full flex justify-between">
                        <div className="h-full w-[33%] flex p-[5px]">
                            <div className="h-1/2 w-1/2 flex items-center justify-center gap-2">
                                <MdShoppingCart size={'32px'} className="text-white cursor-pointer cartIcon" onClick={() => goToBookingPage()} />
                            </div>
                        </div>
                        <div className="h-full p-[5px] pr-[10px]">
                            <MdAccountCircle size={'32px'} className="text-white cursor-pointer accountIcon" onClick={() => handleAccountNavigate()} />
                        </div>
                    </div>
                    <div className="h-[60%] w-full flex justify-center items-center inputIcons">
                        <i className="icon right-[22px] tall:right-[30px] cursor-pointer searchIcon"><BiSolidSearch size={'32px'} className="text-white" /></i>
                        <input type="search" placeholder="Search" className="h-[40%] w-[90%] block rounded-3xl text-center outline-none" />
                    </div>
                </div>

            </div>

        </motion.div>
    )
}

export default NavbarModal