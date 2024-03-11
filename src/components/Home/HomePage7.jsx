import map from '../../assets/map.png'
import carbonFiber from '../../assets/carbonFiber.jpeg'
import carbonFiber2 from '../../assets/carbonFiber2.jpg'
import logo1 from '../../assets/logo1.png'
import { MdLocationPin, MdEmail } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FaClock } from 'react-icons/fa'
import { useState } from 'react'
import { requestMoreInfoFromUser } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { SET_SUCCESS_MSG, SET_ERROR_MSG } from '../../redux/features/auth/authSlice'
const formInitialState = {
    name: '',
    email: '',
    phone: '',
}

const HomePage7 = () => {
    const dispatch = useDispatch()

    const [form, setForm] = useState(formInitialState)
    const { name, email, phone } = form

    const submitForm = async () => {
        try {
            const res = await requestMoreInfoFromUser(form)

            if (res) {
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'More information sent to email provided!' }))
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
        <div className="min-h-[100vh] w-full bg-slate-100 flex flex-col montFont">
            <div className="h-[70%] w-full flex flex-col lg:flex-row lg:items-center">
                <div className="h-1/2 w-full flex flex-col">
                    <div className="h-[30%] w-full flex flex-col pt-[1rem] pl-[1rem]">
                        <div className="h-[40%] w-full flex items-center gap-[2%]">
                            <div className="h-[1px] bg-brightRed w-[10%]"></div>
                            <h3 className="text-brightRed text-[16px] font-semibold">Serviceable Areas</h3>
                        </div>
                        <div className="h-[60%] w-full flex">
                            <h1 className="text-[26px] text-matteBlack font-bold">Houston Service Areas</h1>
                        </div>
                    </div>
                    <div className="h-[70%] w-full p-[1rem] relative">
                        <div className={`h-full w-full flex flex-col`}
                        >
                            {/* turn this into mappable-dynamic component */}
                            <div className='h-1/3 w-full flex'>
                                <div className='h-full w-1/2 flex flex-col'>
                                    <div className='h-1/2 w-full flex items-center'>
                                        <MdLocationPin size={'24px'} className='text-brightRed' />
                                        <h2 className='text-black text-[16px]'>CENTER POINT</h2></div>
                                    <div className='h-1/2 w-full flex justify-end deskSm:justify-start pr-[10%]'><h3 className='text-black text-[13px]'>- Fort Bend</h3></div>
                                </div>
                                <div className='h-full w-1/2 flex flex-col'>
                                    <div className='h-1/2 w-full flex items-center'>
                                        <MdLocationPin size={'24px'} className='text-brightRed' />
                                        <h2 className='text-black text-[16px]'>SERVICE AREA</h2></div>
                                    <div className='h-1/2 w-full flex justify-end deskSm:justify-start pr-[10%]'><h3 className='text-black text-[13px]'>- Harris County</h3></div>
                                </div>
                            </div>
                            <div className='h-1/3 w-full flex'>
                                <div className='h-full w-1/2 flex flex-col'>
                                    <div className='h-1/2 w-full flex items-center'>
                                        <MdLocationPin size={'24px'} className='text-brightRed' />
                                        <h2 className='text-black text-[16px]'>SERVICE AREA</h2></div>
                                    <div className='h-1/2 w-full flex justify-end deskSm:justify-start pr-[10%]'><h3 className='text-black text-[13px]'>- Wharton County</h3></div>
                                </div>
                                <div className='h-full w-1/2 flex flex-col'>
                                    <div className='h-1/2 w-full flex items-center'>
                                        <MdLocationPin size={'24px'} className='text-brightRed' />
                                        <h2 className='text-black text-[16px]'>SERVICE AREA</h2></div>
                                    <div className='h-1/2 w-full flex justify-end deskSm:justify-start pr-[10%]'><h3 className='text-black text-[13px]'>- Montgomery County</h3></div>
                                </div>
                            </div>
                            <div className='h-1/3 w-full flex'>
                                <div className='h-full w-1/2 flex flex-col'>
                                    <div className='h-1/2 w-full flex items-center'>
                                        <MdLocationPin size={'24px'} className='text-brightRed' />
                                        <h2 className='text-black text-[16px]'>SERVICE AREA</h2></div>
                                    <div className='h-1/2 w-full flex justify-end deskSm:justify-start pr-[10%]'><h3 className='text-black text-[13px]'>- Waller County</h3></div>
                                </div>
                                <div className='h-full w-1/2 flex flex-col'>
                                    <div className='h-1/2 w-full flex items-center'>
                                        <MdLocationPin size={'24px'} className='text-brightRed' />
                                        <h2 className='text-black text-[16px]'>SERVICE AREA</h2></div>
                                    <div className='h-1/2 w-full flex justify-end deskSm:justify-start pr-[10%]'><h3 className='text-black text-[13px]'>- Katy Houston, TX</h3></div>
                                </div>
                            </div>
                        </div>
                        <div className='h-full w-full absolute top-0 bottom-0 right-0 left-0 opacity-20'
                            style={{ background: `url(${map}) center center / cover ` }}
                        ></div>
                    </div>
                </div>
                <div className="h-1/2 w-full flex justify-center items-center">
                    <div className="h-[90%] w-[90%] flex flex-col items-center rounded-lg"
                        style={{ background: `url(${carbonFiber}) center center / cover` }}>
                        <h2 className='h-[15%] text-white font-semibold text-[22px]'>Request <span className='text-brightRed'>More Info</span></h2>
                        <div className='h-[85%] w-full flex flex-col justify-evenly items-center p-[1rem]'>
                            <input type="text" name='name' value={name} className='h-[15%] w-[60%] md:w-[40%] lg:w-[50%] rounded-md text-[14px] text-center' placeholder='Name' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            <input type="text" name='email' value={email} className='h-[15%] w-[60%] md:w-[40%] lg:w-[50%] rounded-md text-[14px] text-center' placeholder='Email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            <input type="text" name='phone' value={phone} className='h-[15%] w-[60%] md:w-[40%] lg:w-[50%] rounded-md text-[14px] text-center' placeholder='Phone' onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            <button className='h-[15%] w-[75%] md:w-[50%] lg:w-[60%] bg-brightRed rounded-md font-bold text-[16px]' onClick={() => submitForm()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[30%] w-full pt-[1rem]'>
                <div className='h-full w-full flex flex-col items-center' style={{ background: `url(${carbonFiber2}) center center / cover` }}
                >
                    <div className='h-[30%] w-full flex flex-col items-center'>
                        <div className='h-[70%] w-full flex justify-center items-center'>
                            <img src={logo1} alt="" className='w-[40%] deskSm:w-[30%] md:w-[20%] lg:w-[15%] object-contain' />
                        </div>
                        <div className='h-[30%] w-[30%]'>
                            <h3 className='text-white rounded-md font-semibold text-center deskSm:text-[18px] lg:text-[20px]'>Restoration Begins Here</h3>
                        </div>
                    </div>
                    <div className='h-[60%] w-full flex flex-col pt-[1rem]'>
                        <div className='h-1/2 w-full flex'>
                            <div className='h-full w-1/2 flex flex-col justify-evenly items-center'>
                                <BsFillTelephoneFill size={'26px'} className='h-[40%] text-brightRed' />
                                <h3 className='h-[40%] text-[14px] text-white'>873-829-1992</h3>
                            </div>
                            <div className='h-full w-1/2 flex flex-col justify-evenly items-center'>
                                <MdEmail size={'26px'} className='h-[40%] text-brightRed' />
                                <h3 className='h-[40%] text-[14px] text-white'>jayAutoSpa@gmail.com</h3>
                            </div>
                        </div>
                        <div className='h-1/2 w-full flex'>
                            <div className='h-full w-1/2 flex flex-col justify-evenly items-center'>
                                <MdLocationPin size={'26px'} className='h-[40%] text-brightRed' />
                                <h3 className='h-[40%] text-[14px] text-white'>123 Beechnut St</h3>
                            </div>
                            <div className='h-full w-1/2 flex flex-col justify-evenly items-center'>
                                <FaClock size={'26px'} className='h-[40%] text-brightRed' />
                                <h3 className='h-[40%] text-[14px] text-brightRed'>M-Su: <span className='text-white font-bold'>07:00 - 19:00</span></h3>
                            </div>
                        </div>
                    </div>
                    <div className='h-[10%] w-full flex justify-center items-center gap-[10%] bg-black bg-opacity-70'>
                        <h2 className='text-white text-[12px]'>Jay&apos;s Auto Spa &copy;</h2>
                        <h2 className='text-brightRed text-[12px]'>All Rights Reserved - 2023</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage7