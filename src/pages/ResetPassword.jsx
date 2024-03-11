import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'
import { useState } from "react"
import Loader1 from "../components/Loaders/Loader1"
import SuccessAlert from "../components/Alerts/SuccessAlert"
import ErrorAlert from "../components/Alerts/ErrorAlert"
import { useDispatch, useSelector } from "react-redux"
import { SET_ERROR_MSG, SET_SUCCESS_MSG, selectErrorMsg, selectShowErrMsg, selectShowSuccessMsg, selectSuccessMsg } from "../redux/features/auth/authSlice"
import { resetPassFromEmailLink } from '../services/authService'
import { useNavigate, useParams } from 'react-router-dom'
const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
};
const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showSuccessMsgRedux = useSelector(selectShowSuccessMsg)
    const successMsgRedux = useSelector(selectSuccessMsg)
    const showErrMsgRedux = useSelector(selectShowErrMsg)
    const errorMsgRedux = useSelector(selectErrorMsg)

    const [isLoading, setIsLoading] = useState(false)
    const [authForm, setAuthForm] = useState(initialState)
    const { password, confirmPassword } = authForm

    const { resetToken } = useParams()

    const submitForm = async () => {
        console.log('submit')
        setIsLoading(true)

        try {
            const formToSend = {
                password, confirmPassword
            }

            const res = await resetPassFromEmailLink(formToSend, resetToken)

            if (res) {
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Password was reset successfully!' }))
                navigate('/authentication')
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

    return (
        <div className='min-h-[100vh] w-[100vw] flex bg-matteBlack overflow-y-hidden montFont'>
            {isLoading ?
                <Loader1 message={'Resetting Password...'} />
                : <>
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
                                <h2 className='text-[14px] tall:text-[16px] md:text-[18px] font-bold'>Welcome Back 👋</h2>
                                <p className='text-matteBlack text-[11px] tall:text-[12px] md:text-[14px] font-thin'>Reset Old Password</p>
                            </div>
                            {/* {authType !== 'Forgot' && */}
                            <div className='min-h-[12%] w-full flex flex-col justify-center'>
                                <div className='w-full flex justify-between'>
                                    <h4 className='text-[13px] tall:text-[14px] md:text-[15px]'>New Password</h4>

                                </div>
                                <input type="password" name='password' value={password} className='h-[40%] bg-opacity-30 rounded-md outline-none border-gray-300 border-[1px] pl-[4px] text-[12px] md:text-[14px]' onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
                            </div>
                            {/* // } */}
                            {/* {authType === 'Register' && */}
                            <div className='min-h-[12%] w-full flex flex-col justify-center'>
                                <h4 className='text-[13px] tall:text-[14px] md:text-[15px]'>Confirm Password</h4>
                                <input type="password" name='confirmPassword' value={confirmPassword} className='h-[40%] bg-opacity-30 rounded-md outline-none border-gray-300 border-[1px] pl-[4px] text-[14px]' onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })} />
                            </div>
                            {/* } */}
                            <div className='min-h-[14%] tall:min-h-[11%] md:min-h-[11%] w-full flex flex-col justify-end items-center gap-[10%]'>
                                <button className='w-full h-[44%] tall:h-[50%] md:h-[50%] text-[14px] md:text-[16px] bg-brilliantBlue rounded-lg text-white font-semibold shadowHover' onClick={() => submitForm()}>SUBMIT</button>
                            </div>
                            <div className='min-h-[16%] w-full flex flex-col justify-end items-center overflow-y-scroll'>

                            </div>
                        </div>
                    </div>
                    <div className='min-h-full w-1/3 absolute right-0 bg-darkBlue insetShadow'></div>

                </>}
        </div>
    )
}

export default ResetPassword