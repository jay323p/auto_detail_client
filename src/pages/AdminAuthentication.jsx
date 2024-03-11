import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'
import { AiTwotoneHome } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginAdmin, registerAdmin, sendEmailVerificationLink } from '../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ERROR_MSG, SET_LOGIN, SET_PAGE, SET_SUCCESS_MSG, SET_USER_INFO, selectErrorMsg, selectShowErrMsg, selectShowSuccessMsg, selectSuccessMsg, } from '../redux/features/auth/authSlice'
import Loader1 from '../components/Loaders/Loader1'
import SuccessAlert from '../components/Alerts/SuccessAlert'
import ErrorAlert from '../components/Alerts/ErrorAlert'
const loginText = 'Please sign-in to start managing orders'
const loginMsg = 'Submitting Login Info ...'
const forgotText = 'Please provide email for password reset'
const forgotMsg = 'Submitting Password Request Email ...'
// const forgotSuccessMsg = 'Password Reset Instructions Sent To Email!'
const registerText = 'Please create an account to start managing!'
const registerMsg = 'Submitting Registration Info ...'

const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    adminCode: '',
};

const Authentication = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const showSuccessMsgRedux = useSelector(selectShowSuccessMsg)
    const showErrMsgRedux = useSelector(selectShowErrMsg)
    const successMsgRedux = useSelector(selectSuccessMsg)
    const errorMsgRedux = useSelector(selectErrorMsg)

    const [authType, setAuthType] = useState('Login')
    const [authForm, setAuthForm] = useState(initialState)
    const { email, phone, password, confirmPassword, name, adminCode } = authForm
    const [isLoading, setIsLoading] = useState(false)


    const submitForm = async () => {
        if (authType === 'Login') {
            await tryUserLogin()
        } else if (authType === 'Register') {
            await tryUserRegistration()
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
            const data = await loginAdmin(respectiveForm)
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
                localStorage.setItem('jayAutoSpaAdminName', data.name)

                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: `Welcome Back ${firstLastNames[0]}!` }))
                dispatch(SET_LOGIN(true))
                dispatch(SET_USER_INFO(dataObj))
                dispatch(SET_PAGE('Home'))
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
                confirmPassword: authForm.confirmPassword,
                adminCode: authForm.adminCode,
            }
            const data = await registerAdmin(respectiveForm)
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
                localStorage.setItem('jayAutoSpaAdminName', data.name)
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: `Welcome, ${data.name}!` }))
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


    return (
        <div className='min-h-[100vh] w-[100vw] flex bg-matteBlack overflow-y-hidden montFont'>
            {isLoading ?
                <Loader1 message={authType === 'Login' ? loginMsg : authType === 'Register' ? registerMsg : forgotMsg} />
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
                            <div className='min-h-[2%] w-[30%] deskSm:w-[25%] md:w-[28%] lg:w-[20%] xxl:w-[18%] absolute top-1 right-1 flex items-center justify-between bg-darkGrayBlue rounded-lg cursor-pointer p-[2px]' onClick={() => navigate('/')}>
                                <h6 className='text-[13px] text-darkerBlue font-semibold bg-grayBlue bg-opacity-80 rounded-lg'>Go Home</h6>
                                <AiTwotoneHome size={'18px'} className='text-darkerBlue' />
                            </div>
                            <div className='min-h-[8%] w-full flex items-center gap-[5%]'>
                                <img src={logo2} alt="" className='h-[70px] tall:h-[80px] md:h-[90px]' />
                                <h2 className='italic text-[15px] tall:text-[16px] md:text-[18px] font-semibold'>Detail Done Right</h2>
                            </div>
                            <div className='min-h-[9%] tall:min-h-[12%] w-full flex flex-col justify-center'>
                                <h2 className='text-[14px] tall:text-[16px] md:text-[18px] font-bold'>Welcome Administrator 👋</h2>
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
                                <>
                                    <div className='min-h-[12%] w-full flex flex-col justify-center'>
                                        <h4 className='text-[13px] tall:text-[14px] md:text-[15px]'>Confirm Password</h4>
                                        <input type="password" name='confirmPassword' value={confirmPassword} className='h-[40%] bg-opacity-30 rounded-md outline-none border-gray-300 border-[1px] pl-[4px] text-[14px]' onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })} />
                                    </div>
                                    <div className='min-h-[12%] w-full flex flex-col justify-center'>
                                        <h4 className='text-[13px] tall:text-[14px] md:text-[15px]'>Admin Code</h4>
                                        <input type="password" name='adminCode' value={adminCode} className='h-[40%] bg-opacity-30 rounded-md outline-none border-gray-300 border-[1px] pl-[4px] text-[14px]' onChange={(e) => setAuthForm({ ...authForm, adminCode: e.target.value })} />
                                    </div>
                                </>
                            }
                            <div className='min-h-[14%] tall:min-h-[11%] md:min-h-[11%] w-full flex flex-col justify-end items-center gap-[10%]'>
                                <button className='w-full h-[44%] tall:h-[50%] md:h-[50%] text-[14px] md:text-[16px] bg-brilliantBlue rounded-lg text-white font-semibold shadowHover' onClick={() => submitForm()}>SUBMIT</button>
                                <p className='text-gray-400 text-[11px] md:text-[13px]'>{authType === 'Login' ? 'New To Our Platform?' : authType === 'Register' ? 'Already Have Account?' : 'New To Our Platform?'}<span className='text-highLightBlue font-bold hover:text-darkerBlue cursor-pointer pl-[4px]' onClick={() => setAuthType((prev) => prev === 'Login' ? 'Register' : prev === 'Register' ? 'Login' : 'Register')}>{authType === 'Login' ? 'Create An Account' : authType === 'Register' ? 'Sign-In' : 'Create An Account'}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='min-h-full w-1/3 absolute right-0 bg-darkBlue insetShadow'></div>

                </>}
        </div>
    )
}

export default Authentication