import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'
import { useEffect } from "react"
import SuccessAlert from "../components/Alerts/SuccessAlert"
import ErrorAlert from "../components/Alerts/ErrorAlert"
import { useDispatch, useSelector } from "react-redux"
import { SET_ERROR_MSG, SET_SUCCESS_MSG, selectErrorMsg, selectIsLoggedIn, selectShowErrMsg, selectShowSuccessMsg, selectSuccessMsg } from "../redux/features/auth/authSlice"
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmailLink } from '../services/authService'

const EmailVerified = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedInRedux = useSelector(selectIsLoggedIn)
    const showSuccessMsgRedux = useSelector(selectShowSuccessMsg)
    const successMsgRedux = useSelector(selectSuccessMsg)
    const showErrMsgRedux = useSelector(selectShowErrMsg)
    const errorMsgRedux = useSelector(selectErrorMsg)


    const { emailVerifyToken } = useParams()

    const handlePageNavigate = () => {
        if (isLoggedInRedux === true) {
            navigate('/booking')
        } else {
            navigate('/authentication')
        }
    }

    const verifyUserEmail = async () => {
        try {
            const res = await verifyEmailLink(emailVerifyToken)

            if (res) {
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Email Verification Successful!' }))
                console.log(res)
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: message }))
        }
    }

    useEffect(() => {
        verifyUserEmail()
    }, [])

    return (
        <div className='min-h-[100vh] w-[100vw] flex bg-matteBlack overflow-y-hidden montFont'>
            <SuccessAlert decider={showSuccessMsgRedux} message={successMsgRedux} />
            <ErrorAlert decider={showErrMsgRedux} message={errorMsgRedux} />
            <div className="hidden min-h-[80%] w-[50%] relative md:flex flex-col justify-center pt-[10%] pl-[0%] text-darkerBlue">
                <div className='h-[50%] lg:h-[40%] w-full flex flex-col justify-center'>
                    <h2 className="h-[10%] lg:h-[17%] w-full text-[26px] lg:text-[34px] font-semibold pl-[20%] brightness-200">SUPERIOR</h2>
                    <h2 className="h-[10%] lg:h-[17%] w-full text-[26px] lg:text-[34px] font-bold pl-[20%] text-darkBlue brightness-200">EXTERIOR & INTERIOR</h2>
                    <h2 className="h-[10%] lg:h-[17%] w-full text-[26px] lg:text-[34px] font-semibold pl-[20%] brightness-200">DETAILING</h2>
                </div>
                <div className="h-[40%] w-full flex pl-[23%]"><img src={logo1} alt="" className='aspect-[4/3] object-cover translate-x-[-20%]' /></div>
            </div>
            <div className="min-h-full w-full md:w-[50%] flex justify-center items-center">
                <div className='h-[86%] w-[80%] relative bg-white flex flex-col rounded-xl insetShadow2 z-50 p-[10%] xl:translate-x-[-100px]'>
                    <div className='min-h-[8%] w-full flex items-center gap-[5%]'>
                        <img src={logo2} alt="" className='h-[70px] tall:h-[80px] md:h-[90px]' />
                        <h2 className='italic text-[15px] tall:text-[16px] md:text-[18px] font-semibold'>Detail Done Right</h2>
                    </div>
                    <div className='min-h-[9%] tall:min-h-[12%] w-full flex flex-col justify-center'>
                        <h2 className='text-[14px] tall:text-[16px] md:text-[18px] font-bold'>Welcome to Jay&apos;s Auto Spa 👋</h2>
                        <p className='text-matteBlack text-[11px] tall:text-[12px] md:text-[14px] font-thin'>Your Email Has Been Verified</p>
                    </div>
                    {/* {authType !== 'Forgot' && */}

                    <div className='min-h-[14%] tall:min-h-[11%] md:min-h-[11%] w-full flex flex-col justify-end items-center gap-[10%]'>
                        <button className='w-full h-[44%] tall:h-[50%] md:h-[50%] text-[14px] md:text-[16px] bg-brilliantBlue rounded-lg text-white font-semibold shadowHover' onClick={() => handlePageNavigate()}>Start Booking</button>
                    </div>
                    <div className='min-h-[16%] w-full flex flex-col justify-end items-center overflow-y-scroll'>
                    </div>
                </div>
            </div>
            <div className='min-h-full w-1/3 absolute right-0 bg-darkBlue insetShadow'></div>

        </div>
    )
}

export default EmailVerified