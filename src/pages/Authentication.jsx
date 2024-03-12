import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'
import { FaFacebookSquare, FaGooglePlusSquare, FaTwitterSquare } from 'react-icons/fa'
import { AiTwotoneHome } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginUser, registerUser, sendEmailVerificationLink, userForgotPassword } from '../services/authService'
import { useDispatch } from 'react-redux'
import { SET_ERROR_MSG, SET_LOGIN, SET_PAGE, SET_SUCCESS_MSG, SET_USER_INFO } from '../redux/features/auth/authSlice'
import Loader1 from '../components/Loaders/Loader1'
import SuccessAlert from '../components/Alerts/SuccessAlert'
import ErrorAlert from '../components/Alerts/ErrorAlert'
import { SET_RESET_ORDER } from '../redux/features/account/accountSlice'
const loginText = 'Please sign-in to your account to get started'
const loginMsg = 'Submitting Login Info ...'
const forgotText = 'Please provide email for password reset'
const forgotMsg = 'Submitting Password Request Email ...'
// const forgotSuccessMsg = 'Password Reset Instructions Sent To Email!'
const registerText = 'Please create an account to get started'
const registerMsg = 'Submitting Registration Info ...'

const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
};

const Authentication = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [authType, setAuthType] = useState('Login')
    const [authForm, setAuthForm] = useState(initialState)
    const { email, phone, password, confirmPassword, name } = authForm
    const [isLoading, setIsLoading] = useState(false)


    const submitForm = async () => {
        if (authType === 'Login') {
            await tryUserLogin()
        } else if (authType === 'Register') {
            await tryUserRegistration()
        } else if (authType === 'Forgot') {
            await tryForgotPassword()
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const tryUserLogin = async () => {
        setIsLoading(true)
        try {
            const respectiveForm = {
                email: authForm.email,
                password: authForm.password
            }
            const data = await loginUser(respectiveForm)
            console.log(data)
            if (data) {
                const dataObj = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    privilege: data.privilege,
                    userId: data._id,
                    activeOrders: data.activeOrders,
                    archivedOrders: data.archivedOrders,
                }
                const firstLastNames = data.name.split(' ')
                localStorage.setItem('jayAutoSpaUserName', data.name)
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: `Welcome Back ${firstLastNames[0]}!` }))
                dispatch(SET_LOGIN(true))
                dispatch(SET_USER_INFO(dataObj))
                dispatch(SET_PAGE('Home'))
                dispatch(SET_RESET_ORDER())
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: message }))
        }
    }

    const tryUserRegistration = async () => {
        setIsLoading(true)
        try {
            const respectiveForm = {
                name: authForm.name,
                email: authForm.email,
                phone: authForm.phone,
                password: authForm.password,
                confirmPassword: authForm.confirmPassword
            }
            const data = await registerUser(respectiveForm)
            console.log(data)
            if (data) {
                const dataObj = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    privilege: data.privilege,
                    userId: data._id,
                    activeOrders: data.activeOrders,
                    archivedOrders: data.archivedOrders,
                }
                localStorage.setItem('jayAutoSpaUserName', data.name)
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: `Welcome to our professional auto detailing service, ${data.name}! Please do verify your email.` }))
                dispatch(SET_LOGIN(true))
                dispatch(SET_USER_INFO(dataObj))
                dispatch(SET_PAGE('Home'))
                navigate('/')

                const emailData = {
                    email: data.email
                }
                sendEmailVerificationLink(emailData)
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message)
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: message }))
        }
    }

    const tryForgotPassword = async () => {
        setIsLoading(true)
        try {
            const respectiveForm = {
                email: authForm.email
            }
            const data = await userForgotPassword(respectiveForm)

            if (data) {
                dispatch(SET_SUCCESS_MSG({ showSuccessMsgRedux: true, successMsg: data.message ? data.message : 'Email sent for password reset.' }))
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message)
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: message }))
        }
    }

    const goHome = () => {
        dispatch(SET_PAGE('Home'))
        navigate('/')
    }


    return (
        <div className='min-h-[100vh] w-[100vw] flex bg-matteBlack overflow-y-hidden montFont'>
            {isLoading ?
                <Loader1 message={authType === 'Login' ? loginMsg : authType === 'Register' ? registerMsg : forgotMsg} />
                : <>
                    <SuccessAlert />
                    <ErrorAlert />
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
                            <div className='min-h-[2%] w-[30%] deskSm:w-[25%] md:w-[28%] lg:w-[20%] xxl:w-[18%] absolute top-1 right-1 flex items-center justify-between bg-darkGrayBlue rounded-lg cursor-pointer p-[2px]' onClick={() => goHome()}>
                                <h6 className='text-[13px] text-darkerBlue font-semibold bg-grayBlue bg-opacity-80 rounded-lg'>Go Home</h6>
                                <AiTwotoneHome size={'18px'} className='text-darkerBlue' />
                            </div>
                            <div className='min-h-[8%] w-full flex items-center gap-[5%]'>
                                <img src={logo2} alt="" className='h-[70px] tall:h-[80px] md:h-[90px]' />
                                <h2 className='italic text-[15px] tall:text-[16px] md:text-[18px] font-semibold'>Detail Done Right</h2>
                            </div>
                            <div className='min-h-[9%] tall:min-h-[12%] w-full flex flex-col justify-center'>
                                <h2 className='text-[14px] tall:text-[16px] md:text-[18px] font-bold'>Welcome to Jay&apos;s Auto Spa 👋</h2>
                                <p className='text-matteBlack text-[11px] tall:text-[12px] md:text-[14px] font-thin'>{authType === 'Login' ? loginText : authType === 'Forgot' ? forgotText : registerText}</p>
                            </div>
                            {authType === 'Register' &&
                                <>
                                    <div className='min-h-[12%] w-full flex flex-col justify-center'>
                                        <h4 className='text-[13px] tall:text-[14px] md:text-[15px]'>Name</h4>
                                        <input type="text" name='name' value={name} className='h-[40%] bg-opacity-30 rounded-md outline-none border-gray-300 border-[1px] pl-[4px] text-[14px]' onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} />
                                    </div>
                                    <div className='min-h-[12%] w-full flex flex-col justify-center'>
                                        <h4 className='text-[13px] tall:text-[14px] md:text-[15px]'>Phone</h4>
                                        <input type="text" name='phone' value={phone} className='h-[40%] bg-opacity-30 rounded-md outline-none border-gray-300 border-[1px] pl-[4px] text-[14px]' placeholder='832-475-9032' onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })} />
                                    </div>
                                </>
                            }
                            <div className='min-h-[12%] w-full flex flex-col justify-center'>
                                <h4 className='text-[13px] tall:text-[14px] md:text-[15px]'>Email</h4>
                                <input type="text" name='email' value={email} placeholder='john@gmail.com' className='h-[40%] bg-opacity-30 rounded-md outline-none border-gray-300 border-[1px] pl-[4px] text-[14px]' onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
                            </div>
                            {authType !== 'Forgot' &&
                                <div className='min-h-[12%] w-full flex flex-col justify-center'>
                                    <div className='w-full flex justify-between'>
                                        <h4 className='text-[13px] tall:text-[14px] md:text-[15px]'>Password</h4>
                                        {authType === 'Login' &&
                                            <h4 className='text-[13px] tall:text-[14px] md:text-[15px] text-highLightBlue cursor-pointer hover:text-darkerBlue hover:font-semibold' onClick={() => setAuthType('Forgot')}>Forgot Password?</h4>
                                        }
                                    </div>
                                    <input type="password" name='password' value={password} className='h-[40%] bg-opacity-30 rounded-md outline-none border-gray-300 border-[1px] pl-[4px] text-[12px] md:text-[14px]' onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
                                </div>
                            }
                            {authType === 'Register' &&
                                <div className='min-h-[12%] w-full flex flex-col justify-center'>
                                    <h4 className='text-[13px] tall:text-[14px] md:text-[15px]'>Confirm Password</h4>
                                    <input type="password" name='confirmPassword' value={confirmPassword} className='h-[40%] bg-opacity-30 rounded-md outline-none border-gray-300 border-[1px] pl-[4px] text-[14px]' onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })} />
                                </div>
                            }
                            <div className='min-h-[14%] tall:min-h-[11%] md:min-h-[11%] w-full flex flex-col justify-end items-center gap-[10%]'>
                                <button className='w-full h-[44%] tall:h-[50%] md:h-[50%] text-[14px] md:text-[16px] bg-brilliantBlue rounded-lg text-white font-semibold shadowHover' onClick={() => submitForm()}>SUBMIT</button>
                                <p className='text-gray-400 text-[11px] md:text-[13px]'>{authType === 'Login' ? 'New To Our Platform?' : authType === 'Register' ? 'Already Have Account?' : 'New To Our Platform?'}<span className='text-highLightBlue font-bold hover:text-darkerBlue cursor-pointer pl-[4px]' onClick={() => setAuthType((prev) => prev === 'Login' ? 'Register' : prev === 'Register' ? 'Login' : 'Register')}>{authType === 'Login' ? 'Create An Account' : authType === 'Register' ? 'Sign-In' : 'Create An Account'}</span></p>
                            </div>
                            <div className='min-h-[16%] w-full flex flex-col justify-end items-center overflow-y-scroll'>
                                <div className='h-[20%] w-full flex justify-center items-center gap-[2%] md:gap-0'>
                                    <div className='w-[44%] md:w-[42%] h-[1px] bg-gray-400'></div>
                                    <div className='w-[6%] h-full text-[12px] tall:text-[14px] md:text-[16px] bg-gray-300 bg-opacity-30 flex justify-center items-end rounded-full'>or</div>
                                    <div className='w-[44%] md:w-[42%] h-[1px] bg-gray-400'></div>
                                </div>
                                <div className='min-h-[50%] w-full flex justify-center items-center gap-[6%]'>
                                    <FaFacebookSquare size={'30px'} className='text-facebook cursor-pointer' />
                                    <FaGooglePlusSquare size={'30px'} className='text-google cursor-pointer' />
                                    <FaTwitterSquare size={'30px'} className='text-twitter cursor-pointer' />
                                </div>
                            </div>
                            <div className='h-[5%] w-full bg-brilliantBlue bg-opacity-20 flex justify-evenly items-center rounded-md montFont'>
                                <h1>Admin Portal</h1>
                                <button className='h-[76%] w-[50%] bg-green-400 rounded-md bg-opacity-60 hover:bg-opacity-100 cursor-pointer' onClick={() => navigate("/adminAuthentication")}>Go</button>
                            </div>
                        </div>
                    </div>
                    <div className='min-h-full w-1/3 absolute right-0 bg-darkBlue insetShadow'></div>

                </>}
        </div>
    )
}

export default Authentication