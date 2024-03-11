import { AiFillLeftCircle, AiFillRightCircle, AiOutlineClockCircle } from "react-icons/ai"
import { GiCheckMark } from "react-icons/gi"
import exteriorWash from '../../assets/exteriorWash.jpeg'
import interiorWash from '../../assets/interiorWash.jpeg'
import ceramicCoating from '../../assets/ceramicCoating.jpeg'
import polishing from '../../assets/polishing.jpeg'
import carRestored from '../../assets/carRestored.jpg'
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { SET_ERROR_MSG, SET_PAGE, selectIsLoggedIn } from "../../redux/features/auth/authSlice"

const HomePage3Card = ({ heading, serviceTime, description, checklist, nextSlide, prevSlide, slideCounter }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedInRedux = useSelector(selectIsLoggedIn)

    const [cardImg, setCardImg] = useState(exteriorWash)

    const handleBookingNavigate = () => {
        if (isLoggedInRedux) {
            navigate('/booking')
            dispatch(SET_PAGE('Booking'))
        } else {
            navigate('authentication')
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please Login Or Signup Prior To Booking!' }))
        }
    }

    useEffect(() => {
        if (slideCounter === 1) {
            setCardImg(interiorWash)
        } else if (slideCounter === 2) {
            setCardImg(ceramicCoating)
        }
        else if (slideCounter === 3) {
            setCardImg(polishing)
        }
        else if (slideCounter === 4) {
            setCardImg(carRestored)
        } else {
            setCardImg(exteriorWash)
        }
    }, [slideCounter])

    return (
        <div id="cardSlider" className='h-full w-full relative flex flex-col items-center lg:flex-row bg-slate-100 rounded-lg '>
            <div className='hidden lg:flex h-full w-1/2 bg-black overflow-hidden'>
                <img src={cardImg} className='h-full w-full object-cover object-center rounded-tl-lg rounded-bl-lg imgGrow' alt="" />
            </div>
            <div className='h-full w-full lg:w-1/2 flex flex-col items-center'>
                <div className='h-[16%] text-darkBlue text-[26px] md:text-[30px] flex items-end'>
                    <h2>{heading}</h2>
                </div>
                <div className='min-h-[10%] w-full text-darkBlue flex items-center justify-center gap-[5%]'>
                    <AiOutlineClockCircle size={'22px'} className='text-red-500' />
                    <h4 className=''>{serviceTime}</h4>
                </div>
                <p className='min-h-[20%] md:min-h-[14%] w-full tall:w-[90%] text-center text-[12px] tall:text-[14px] md:text-[15px]'>
                    {description}
                </p>
                <div className='h-[50%] w-full flex flex-col items-center gap-[4%] text-[14px]'>
                    {checklist && checklist.map((item, i) => {
                        return <div key={`item-${i}`} className='h-[10%] w-[80%] flex justify-center items-center gap-[5%]'>
                            <GiCheckMark className='text-green-500' />
                            <h4>{item}</h4>
                        </div>
                    })}
                    <div className='h-[40%] md:flex-1 w-full flex flex-col items-center pt-[4px]'>
                        <button className='min-h-[4vh] w-[70%] bg-loaderGreen bg-opacity-70 rounded-full insetShadow text-white font-semibold hover:bg-opacity-100' onClick={() => handleBookingNavigate()}>Get Plan</button>
                        <div className='h-[40%] w-full flex justify-between items-center md:items-end px-[5%]'>
                            <AiFillLeftCircle className='text-darkBlue translate-y-[-3vh] tall:translate-y-2 text-[28px] tall:text-[36px] md:text-[40px] cursor-pointer' onClick={() => prevSlide()} />
                            <AiFillRightCircle className='text-darkBlue translate-y-[-3vh] tall:translate-y-2 text-[28px] tall:text-[36px] md:text-[40px] cursor-pointer' onClick={() => nextSlide()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
HomePage3Card.propTypes = {
    heading: PropTypes.string,
    serviceTime: PropTypes.string,
    description: PropTypes.string,
    checklist: PropTypes.array,
    nextSlide: PropTypes.func,
    prevSlide: PropTypes.func,
    slideCounter: PropTypes.number,
}
export default HomePage3Card