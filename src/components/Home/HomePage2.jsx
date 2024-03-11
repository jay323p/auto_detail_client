import { MdOutlineLocalCarWash } from 'react-icons/md'
import { GiVacuumCleaner, GiSteeringWheel } from 'react-icons/gi'
import { SiAtom } from 'react-icons/si'
import manWashing from '../../assets/manWashing.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ERROR_MSG, SET_PAGE, selectIsLoggedIn } from '../../redux/features/auth/authSlice'

const Hero1 = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedInRedux = useSelector(selectIsLoggedIn)

    const handleBookingNavigate = () => {
        if (isLoggedInRedux) {
            navigate('/booking')
            dispatch(SET_PAGE('Booking'))
        } else {
            navigate('authentication')
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please Login Or Signup Prior To Booking!' }))
        }
    }
    return (<>
        <div className='min-h-[100vh] w-full relative bg-white flex flex-col items-center'>
            <div className='min-h-[55%] w-full flex flex-col lg:flex-row'>
                <div className='min-h-full w-full lg:w-1/2 flex flex-col items-center mt-[1rem]'>
                    <div className="h-[10%] lg:h-[4%] w-full lg:w-1/2 flex items-center justify-center gap-[1rem] px-[10%] md:px-[0] mt-[1rem] md:mt-[4rem]">
                        <div className='blueLine w-[20%] md:w-[15%] lg:w-[30%]'></div>
                        <h2 className='montFont text-darkBlue text-[16px] md:text-[20px] lg:text-[16px] font-semibold'>Modern Equipment</h2>
                    </div>
                    <div className="min-h-[20%] lg:min-h-[30%] w-full md:w-[75%] ml-auto mr-auto text-center text-darkBlue text-[26px] md:text-[30px] font-bold montFont pt-[1%] md:pt-[0]">
                        Professional And Thorough Detailing Is Our Standard
                    </div>
                    <div className="min-h-[70%] w-full flex flex-col items-center pt-[4%] tall:pt-[1%]">
                        <div className="h-[50%] lg:h-[35%] w-full md:w-[80%] text-center text-jetBlack text-[14px] md:text-[18px] lg:text-[14px] xl:text-[16px] font-thin montFont px-[10px]">
                            There is no cutting corners on technique or equipment here; we pride ourselves in utilizing only the most cutting-edge chemical-agents, wax coatings, polishers, Fe decontamination tools, compressors/vacuums, and much more!
                        </div>
                        <div className="min-h-[15%] w-full flex justify-center items-end md:items-start gap-[4%]">
                            <h2 className="text-[20px] md:text-[22px] montFont font-bold text-paleYellow">Call to Book Today:</h2>
                            <h2 className="text-[20px] md:text-[22px] montFont font-bold text-darkBlue">1-867-931-6143</h2>
                        </div>
                        <div className="min-h-[35%] md:min-h-[25%] w-full flex justify-center items-start">
                            <button className="h-[50%] w-[80%] md:w-[54%] lg:w-[33%] xl:w-[25%] rounded-full bg-darkBlue text-[16px] md:text-[18px] text-slate-200 font-semibold cursor-pointer insetShadow montFont hover:bg-opacity-40" onClick={() => handleBookingNavigate()}>Book Online</button>
                        </div>
                    </div>
                </div>
                <div className='hidden lg:flex justify-center items-center h-full w-1/2'>
                    <img src={manWashing} alt="" className='h-[90%] w-[90%] object-contain' />
                </div>
            </div>
            <div className='h-[45%] w-full flex flex-col lg:flex-row overflow-y-scroll p-[8px] gap-[4px] lg:px-[5%] lg:gap-[1rem]'>
                <div className='min-h-[85%] md:min-h-[70%] w-full lg:w-1/2 flex montFont gap-[4px] lg:gap-[1rem]'>
                    <div className='h-full lg:h-[88%] w-1/2 flex flex-col items-center py-[1rem] insetShadow2 cursor-pointer card rounded-md hover:bg-darkBlue hover:bg-opacity-40 hover:translate-y-[-3%]'>
                        <MdOutlineLocalCarWash size={'50px'} className='min-h-[23%] md:min-h-[33%] text-darkBlue' />
                        <h2 className='w-3/4 text-[20px] md:text-[24px] text-center font-bold text-darkBlue'>Contactless Washing</h2>
                        <p className='w-[90%] text-[12px] md:text-[14px] text-darkBlue text-center font-thin'>
                            Dust and other particles on cars can create micro-scratches in your paint through contact washing - we avoid that entirely!
                        </p>
                    </div>
                    <div className='h-full lg:h-[88%] w-1/2 flex flex-col items-center py-[1rem] insetShadow2 cursor-pointer card rounded-md hover:bg-darkBlue hover:bg-opacity-40 hover:translate-y-[-3%]'>
                        <SiAtom size={'50px'} className='min-h-[23%] md:min-h-[33%] text-darkBlue' />
                        <h2 className='w-3/4 text-[20px] md:text-[24px] text-center font-bold text-darkBlue'>Harm-Free Chemicals</h2>
                        <p className='w-[90%] text-[12px] md:text-[14px] text-darkBlue text-center font-thin'>
                            Only the most safe, industry-standard chemical agents are used. Worry less about lingering, harmful chemicals and enjoy the drive!
                        </p>
                    </div>
                </div>
                <div className='min-h-[85%] md:min-h-[70%] w-full lg:w-1/2 flex montFont gap-[4px] lg:gap-[1rem]'>
                    <div className='h-full lg:h-[88%] w-1/2 flex flex-col items-center py-[1rem] insetShadow2 cursor-pointer card rounded-md hover:bg-darkBlue hover:bg-opacity-40 hover:translate-y-[-3%]'>
                        <GiVacuumCleaner size={'50px'} className='min-h-[23%] md:min-h-[33%] text-darkBlue' />
                        <h2 className='w-3/4 text-[20px] md:text-[24px] text-center font-bold text-darkBlue'>Spotless Cleaning</h2>
                        <p className='w-[90%] text-[12px] md:text-[14px] text-darkBlue text-center font-thin'>
                            Our thorough interior service completely removes any and all spills, stains, allergens, mold, and other contaminants.
                        </p>
                    </div>
                    <div className='h-full lg:h-[88%] w-1/2 flex flex-col items-center py-[1rem] insetShadow2 cursor-pointer card rounded-md hover:bg-darkBlue hover:bg-opacity-40 hover:translate-y-[-3%]'>
                        <GiSteeringWheel size={'50px'} className='min-h-[23%] md:min-h-[33%] text-darkBlue' />
                        <h2 className='w-3/4 text-[20px] md:text-[24px] text-center font-bold text-darkBlue'>Extensive Restoration</h2>
                        <p className='w-[90%] text-[12px] md:text-[14px] text-center font-thin text-darkBlue'>
                            We bring back the shine and shimmer of every exterior panel as well as all interior features - and we bring it back to last!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </>
    )
}

export default Hero1