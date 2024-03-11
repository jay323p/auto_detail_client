import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SET_HOME_PAGE_SCROLL_GUIDE, SET_PAGE, SET_SERVICE_PAGE_INFO_GUIDE, SET_SHOW_NAV_MODAL } from '../../redux/features/auth/authSlice'

const NavBarSublinks = ({ showRespectiveOptions, respectiveOptions, showSubLinks, label }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const respectiveNavigate = (label) => {
        if (label === 'Home') {
            navigate('/')
            dispatch(SET_PAGE('Home'))
        }
        if (label === 'Booking') {
            navigate('/booking')
            dispatch(SET_PAGE('Booking'))
        }
        if (label === 'Services') {
            navigate('/services')
            dispatch(SET_PAGE('Services'))
        }
        if (label === 'About Us') {
            navigate('/aboutUs')
            dispatch(SET_PAGE('About Us'))
        }

        return dispatch(SET_SHOW_NAV_MODAL(false))
    }

    const respectiveSubLinkNavigate = (sublink) => {
        if (sublink === 'Car Washing') {
            dispatch(SET_HOME_PAGE_SCROLL_GUIDE(2))
            navigate('/')
            dispatch(SET_PAGE('Home'))
        }
        if (sublink === 'Booking System') {
            dispatch(SET_HOME_PAGE_SCROLL_GUIDE(3))
            navigate('/')
            dispatch(SET_PAGE('Home'))
        }
        if (sublink === 'Pricing') {
            dispatch(SET_HOME_PAGE_SCROLL_GUIDE(4))
            navigate('/')
            dispatch(SET_PAGE('Home'))
        }
        if (sublink === 'Book Now') {
            navigate('/booking')
            dispatch(SET_PAGE('Booking'))
        }
        if (sublink === 'Interior') {
            navigate('/services')
            dispatch(SET_SERVICE_PAGE_INFO_GUIDE('interior'))
            dispatch(SET_PAGE('Services'))
        }
        if (sublink === 'Exterior') {
            navigate('/services')
            dispatch(SET_SERVICE_PAGE_INFO_GUIDE('exterior'))
            dispatch(SET_PAGE('Services'))
        }
        if (sublink === 'Polishing / Ceramic Coating') {
            navigate('/services')
            dispatch(SET_SERVICE_PAGE_INFO_GUIDE('ultraCombo'))
            dispatch(SET_PAGE('Services'))
        }

        if (sublink === 'Testimonials' || sublink === 'Gallery' || sublink === 'FAQ') {
            navigate('/aboutUs')
            dispatch(SET_PAGE('About Us'))
        }

        dispatch(SET_SHOW_NAV_MODAL(false))
    }
    return (
        <div className="h-[12%] w-full flex flex-col justify-center items-center navModalLink">
            <div className="h-[30%] w-full flex justify-center items-center  px-[10px] text-white">
                <h2 className='h-full w-[20%] text-[16px] font-semibold cursor-pointer' onClick={() => respectiveNavigate(label)}>{label}</h2>
                {showRespectiveOptions ? <IoMdArrowDropdown className='cursor-pointer' size={'30px'} onClick={() => showSubLinks(label)} /> :
                    <IoMdArrowDropleft className="cursor-pointer" size={'30px'} onClick={() => showSubLinks(label)} />
                }
            </div>
            <div className='h-[80%] w-full flex flex-col text-white text-[12px]'>
                {showRespectiveOptions && respectiveOptions.map((option) => {
                    return <li key={option} className='text-center list-none navSubLink font-semibold cursor-pointer' onClick={() => respectiveSubLinkNavigate(option)}>{`- ${option}`}</li>
                })}
            </div>
        </div>
    )
}

NavBarSublinks.propTypes = {
    showRespectiveOptions: PropTypes.boolean,
    respectiveOptions: PropTypes.array,
    showSubLinks: PropTypes.func,
    label: PropTypes.string
}

export default NavBarSublinks