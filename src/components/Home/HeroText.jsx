import PropTypes from 'prop-types'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_PAGE, selectIsLoggedIn } from '../../redux/features/auth/authSlice'

const HeroText = ({ heading1, heading2, paragraph, nextSlide, prevSlide }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedInRedux = useSelector(selectIsLoggedIn)

    const handleBookingNavigate = () => {
        if (isLoggedInRedux) {
            navigate('/booking')
            dispatch(SET_PAGE('Booking'))
        } else {
            navigate('/authentication')

        }
    }

    const handleMoreInfoNavigate = () => {
        dispatch(SET_PAGE('Services'))
        navigate('/services')

    }
    return (
        <div className="h-full w-full flex flex-col md:mt-[1rem] lg:mt-[3rem]">
            <div className="max-h-[10%] w-full flex justify-center items-center lg:mt-[3rem]">
                <h3 className="text-[20px] md:text-[22px] lg:text-[24px] text-darkBlue font-semibold montFont">{heading1}</h3>
            </div>
            <div className="max-h-[20%] w-[98%] ml-auto mr-auto flex justify-center items-start">
                <h1 className="text-[24px] md:text-[30px] lg:text-[36px] text-center text-white font-bold montFont">{heading2}</h1>
            </div>
            <div className="h-[20%] w-[90%] ml-auto mr-auto flex justify-center items-center">
                <p className="lg:w-[50%] text-[15px] md:text-[17px] lg:text-[18px] text-center text-white font-semibold montFont">{paragraph}</p>
            </div>
            <div className='h-[40%] w-[90%] ml-auto mr-auto flex flex-col lg:flex-row lg:justify-center lg:mt-[3rem]'>
                <div className="h-[50%] w-[90%] lg:w-[30%] flex justify-center items-center montFont">
                    <button className="h-[60%] w-[64%] md:w-[50%] lg:w-[83%] xxl:w-[63%] rounded-full bg-darkBlue text-[16px] readBtn" onClick={() => handleMoreInfoNavigate()}>Read More</button>
                </div>
                <div className="h-[50%] w-[90%] lg:w-[30%] flex justify-center items-center montFont">
                    <button className="h-[60%] w-[64%] md:w-[50%] lg:w-[83%] xxl:w-[63%] rounded-full bg-paleYellow text-[16px] getStartedBtn" onClick={() => handleBookingNavigate()}>Get Started</button>
                </div>
            </div>
            <div className="flex-1 w-[90%] ml-auto mr-auto flex justify-center gap-[70%] items-end montFont">
                <AiFillLeftCircle size={'40px'} className="text-darkBlue cursor-pointer slidePointer" onClick={() => prevSlide()} />
                <AiFillRightCircle size={'40px'} className="text-darkBlue cursor-pointer slidePointer" onClick={() => nextSlide()} />
            </div>
        </div>
    )
}

HeroText.propTypes = {
    heading1: PropTypes.string,
    heading2: PropTypes.string,
    paragraph: PropTypes.string,
    nextSlide: PropTypes.func,
    prevSlide: PropTypes.func,
}

export default HeroText