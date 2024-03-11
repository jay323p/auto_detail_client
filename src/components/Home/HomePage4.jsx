import sedan6 from '../../assets/sedan6.png'
import suv from '../../assets/suv.png'
import pickupTruck from '../../assets/pickupTruck.png'
import exotic from '../../assets/exotic.png'
import { pricingMapper } from '../../data/staticObjects'
import { useEffect, useState } from 'react'
import { AiFillLeftCircle, AiFillRightCircle, AiOutlineClockCircle } from "react-icons/ai"
import { MdCheck } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import HomePage4Card from './HomePage4Card'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ADD_ONS_CHOSEN, SET_DATE_CHOSEN_BOOLEAN, SET_QUICK_BOOK, SET_VEHICLE_PACKAGE_CHOSEN } from '../../redux/features/account/accountSlice'
import { useNavigate } from 'react-router-dom'
import { SET_ERROR_MSG, selectIsLoggedIn } from '../../redux/features/auth/authSlice'

const packageMapper = {
    0: 'exterior',
    1: 'interior',
    2: 'basicCombo',
    3: 'premiumCombo',
    4: 'ultraCombo',
}

const HomePage4 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedInRedux = useSelector(selectIsLoggedIn)

    const [vehicle, setVehicle] = useState('SEDAN')
    const [title, setTitle] = useState(pricingMapper.sedan.exterior.title)
    const [price, setPrice] = useState(pricingMapper.sedan.exterior.price)
    const [checklist, setChecklist] = useState(pricingMapper.sedan.exterior.checklist)
    const [time, setTime] = useState(pricingMapper.sedan.exterior.time)
    const [slideCounter, setSlideCounter] = useState(0)
    const [windowWidth, setWindowWidth] = useState(0)
    const [largeScreen, setLargeScreen] = useState(false)
    const [largeScreenOptions, setLargeScreenOptions] = useState()

    const nextSlide = () => {
        if (slideCounter !== 4) {
            let next = slideCounter + 1
            let lowercaseVeh;
            if (vehicle === 'HIGH-END') {
                lowercaseVeh = 'highEnd'
            } else {
                lowercaseVeh = vehicle.toLowerCase()
            }
            const newSlideInfo = pricingMapper[lowercaseVeh][packageMapper[next]]
            const pricingCard = document.getElementById('pricingCard')

            setTitle(newSlideInfo.title)
            setPrice(newSlideInfo.price)
            setChecklist(newSlideInfo.checklist)
            setTime(newSlideInfo.time)
            setSlideCounter((prev) => prev + 1)
            pricingCard.classList.add('slideCard')
            setTimeout(() => {
                pricingCard.classList.remove('slideCard')
                pricingCard.classList.add('slideCardFromRight')

                setTimeout(() => {
                    pricingCard.classList.remove('slideCardFromRight')
                }, 700)
            }, 700)
            console.log('newSlideInfo')
            console.log(newSlideInfo)
        } else {
            let lowercaseVeh;
            if (vehicle === 'HIGH-END') {
                lowercaseVeh = 'highEnd'
            } else {
                lowercaseVeh = vehicle.toLowerCase()
            }
            const pricingCard = document.getElementById('pricingCard')
            setTitle(pricingMapper[lowercaseVeh].exterior.title)
            setPrice(pricingMapper[lowercaseVeh].exterior.price)
            setChecklist(pricingMapper[lowercaseVeh].exterior.checklist)
            setTime(pricingMapper[lowercaseVeh].exterior.time)
            setSlideCounter(0)
            pricingCard.classList.add('slideCard')
            setTimeout(() => {
                pricingCard.classList.remove('slideCard')
                pricingCard.classList.add('slideCardFromRight')

                setTimeout(() => {
                    pricingCard.classList.remove('slideCardFromRight')
                }, 700)
            }, 700)
            console.log('else')
        }
    }
    const prevSlide = () => {
        if (slideCounter !== 0) {

            let next = slideCounter - 1
            let lowercaseVeh;
            if (vehicle === 'HIGH-END') {
                lowercaseVeh = 'highEnd'
            } else {
                lowercaseVeh = vehicle.toLowerCase()
            }
            const newSlideInfo = pricingMapper[lowercaseVeh][packageMapper[next]]
            const pricingCard = document.getElementById('pricingCard')

            setTitle(newSlideInfo.title)
            setPrice(newSlideInfo.price)
            setChecklist(newSlideInfo.checklist)
            setTime(newSlideInfo.time)
            setSlideCounter((prev) => prev - 1)
            pricingCard.classList.add('slideCardReverse')
            setTimeout(() => {
                pricingCard.classList.remove('slideCardReverse')
                pricingCard.classList.add('slideCardFromLeft')

                setTimeout(() => {
                    pricingCard.classList.remove('slideCardFromLeft')
                }, 700)
            }, 700)
            console.log('newSlideInfo')
            console.log(newSlideInfo)
        } else {
            console.log('else')
            let lowercaseVeh;
            if (vehicle === 'HIGH-END') {
                lowercaseVeh = 'highEnd'
            } else {
                lowercaseVeh = vehicle.toLowerCase()
            }
            const pricingCard = document.getElementById('pricingCard')
            setTitle(pricingMapper[lowercaseVeh].ultraCombo.title)
            setPrice(pricingMapper[lowercaseVeh].ultraCombo.price)
            setChecklist(pricingMapper[lowercaseVeh].ultraCombo.checklist)
            setTime(pricingMapper[lowercaseVeh].ultraCombo.time)
            setSlideCounter(4)
            pricingCard.classList.add('slideCardReverse')
            setTimeout(() => {
                pricingCard.classList.remove('slideCardReverse')
                pricingCard.classList.add('slideCardFromLeft')

                setTimeout(() => {
                    pricingCard.classList.remove('slideCardFromLeft')
                }, 700)
            }, 700)
        }
    }

    const quickBooking = (vehiclePackage) => {
        console.log(vehiclePackage)
        if (isLoggedInRedux) {

            let fixedVehicleString;
            if (vehiclePackage.vehicle === 'HIGHEND') {
                fixedVehicleString = 'HIGH-END'
            } else {
                fixedVehicleString = vehiclePackage.vehicle
            }
            const finalVehPack = {
                vehicle: fixedVehicleString,
                packageChosen: vehiclePackage.package
            }
            dispatch(SET_QUICK_BOOK(finalVehPack))
            dispatch(SET_VEHICLE_PACKAGE_CHOSEN(false))
            dispatch(SET_ADD_ONS_CHOSEN(false))
            dispatch(SET_DATE_CHOSEN_BOOLEAN(false))
            navigate('/booking')
        } else {
            navigate('/authentication')
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please Login Or Signup Prior To Booking!' }))
        }
    }

    useEffect(() => {
        if (vehicle !== '') {
            let lowercaseVeh;
            if (vehicle === 'HIGH-END') {
                lowercaseVeh = 'highEnd'
            } else {
                lowercaseVeh = vehicle.toLowerCase()
            }
            setTitle(pricingMapper[lowercaseVeh].exterior.title)
            setPrice(pricingMapper[lowercaseVeh].exterior.price)
            setChecklist(pricingMapper[lowercaseVeh].exterior.checklist)
            setTime(pricingMapper[lowercaseVeh].exterior.time)
            setSlideCounter(0)
            setLargeScreenOptions(pricingMapper[lowercaseVeh])


        }
    }, [vehicle])

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth > 1024) {
                setWindowWidth(window.innerWidth);
                console.log('large screen')
                setLargeScreen(true)
            } else {
                console.log('small screen')
                setLargeScreen(false)
            }
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [windowWidth])
    return (
        <div className="min-h-[100vh] w-full bg-white flex flex-col items-center montFont">
            <div className="h-[4%] w-full flex justify-center items-end lg:mt-[2rem]">
                <h2 className="text-[16px] lg:text-[20px] font-semibold text-red-500">Washing Price</h2>
            </div>
            <div className="h-[6%] w-full flex justify-center items-end">
                <h2 className="text-[28px] lg:text-[32px] font-bold text-jetBlack">Choose Your Plan</h2>
            </div>
            <div className="h-[10%] w-[80%] flex justify-center lg:items-end">
                <p className="h-full lg:h-1/2 w-full text-center text-[13px] lg:text-[16px] font-thin">
                    Our versatile options enables our customers to tailor their auto-detailing needs with our multi-faceted auto-detailing service - no need to pay extra for a service you do not need!
                </p>
            </div>
            {/* vehicle choice */}
            <div className="h-[40%] md:h-[30%] lg:h-[40%] w-full lg:w-[70%] ml-auto mr-auto flex flex-col lg:flex-row lg:items-center p-[1rem] gap-[1rem]">
                <div className="h-[50%] w-full flex md:justify-center gap-[1rem] lg:gap-[2.5rem]">
                    <div className={`${vehicle === 'SEDAN' ? 'greyBorder' : undefined} h-full w-1/2 md:w-[40%] pb-[4px] rounded-lg cursor-pointer hover:-translate-y-5`} onClick={() => setVehicle('SEDAN')}>
                        <img src={sedan6} alt="" className='h-[90%] w-full object-cover md:object-contain md:scale-150 lg:scale-105' />
                        <h3 className='max-h-[14%] text-center relative bottom-[6px] text-[14px] font-bold'>Sedan</h3>
                    </div>
                    <div className={`${vehicle === 'SUV' ? 'greyBorder' : undefined} h-full w-1/2 md:w-[40%] pb-[4px] rounded-lg cursor-pointer hover:-translate-y-5 hover:scale-110`} onClick={() => setVehicle('SUV')}>
                        <img src={suv} alt="" className='h-[86%] w-full object-contain' />
                        <h3 className='max-h-[14%] text-center text-[14px] font-bold'>SUV</h3>
                    </div>
                </div>
                <div className="h-[50%] w-full flex md:justify-center gap-[1rem] lg:gap-[2.5rem]">
                    <div className={`${vehicle === 'PICKUP' ? 'greyBorder' : undefined} h-full w-1/2 md:w-[40%] pb-[4px] rounded-lg cursor-pointer hover:-translate-y-5 hover:scale-110`} onClick={() => setVehicle('PICKUP')}>
                        <img src={pickupTruck} alt="" className='h-[86%] w-full object-contain' />
                        <h3 className='max-h-[14%] text-center text-[14px] font-bold'>Pickup Truck</h3>
                    </div>
                    <div className={`${vehicle === 'HIGH-END' ? 'greyBorder' : undefined} h-full w-1/2 md:w-[40%] pb-[4px] rounded-lg cursor-pointer hover:-translate-y-5 hover:scale-110`} onClick={() => setVehicle('HIGH-END')}>
                        <img src={exotic} alt="" className='h-[86%] w-full object-contain' />
                        <h3 className='max-h-[14%] text-center text-[14px] font-bold'>High-End</h3>
                    </div>
                </div>
            </div>
            {/* pricing cards */}
            {!largeScreen ?
                <div className="h-[40%] md:h-1/2 lg:h-[40%] w-full deskSm:w-[90%] md:w-[70%] flex flex-col pt-[1rem] pl-[1rem] pr-[1rem] md:px-[3rem]" >
                    <div id={'pricingCard'} className='h-[90%] w-full flex flex-col greyBorder rounded-xl boxShadow1'>
                        <div className='h-[10%] w-full flex justify-center items-end font-semibold text-darkBlue'>
                            <h3>{title}</h3>
                        </div>
                        <div className='h-[20%] w-full flex justify-center items-start font-semibold text-[32px]'>
                            <h3>{price}</h3>
                        </div>
                        <div className={`${checklist && checklist.length === 5 ? 'gap-[7%]' : 'gap-[10%]'} h-[40%] w-full flex flex-col items-center justify-end font-thin text-[16px]`}>
                            {checklist && checklist.map((item, i) => {
                                return <div key={`${item}-${i}`} className='h-[15%] w-full flex justify-center items-center'>
                                    {item.check ? <MdCheck className='text-green-500' /> : <RxCross2 className='text-red-500' />}
                                    <h4>{item.service}</h4>
                                </div>
                            })}

                        </div>
                        <div className='h-[30%] w-full flex justify-between items-center insetShadow mt-[10px] roundedBtmBorder'>
                            <div className='w-1/2 h-full flex justify-start items-center gap-[10px] pl-[10px]'>
                                <AiOutlineClockCircle size={'22px'} className='text-red-500' />
                                <h3 className='font-semibold'>{time}</h3>
                            </div>
                            <div className='w-1/2 h-full flex justify-end items-center pr-[10px]'>
                                <button className='h-[70%] w-[84%] bg-darkBlue rounded-full text-white font-semibold' onClick={() => quickBooking({ vehicle: vehicle.toUpperCase(), package: { title, price, checklist } })}>Book Now</button>
                            </div>
                        </div>
                    </div>
                    <div className='h-[10%] w-full flex justify-center items-end md:items-start gap-[40%] mt-[10px]'>
                        <AiFillLeftCircle size={'28px'} className='text-darkBlue cursor-pointer' onClick={() => prevSlide()} />
                        <AiFillRightCircle size={'28px'} className='text-darkBlue cursor-pointer' onClick={() => nextSlide()} />
                    </div>
                </div>
                : <div className="h-[40%] md:h-1/2 lg:h-[40%] w-full flex justify-evenly items-center lg:gap-[1%] pt-[1rem] pl-[1rem] pr-[1rem] md:px-[3rem] lg:pb-[1rem]" >
                    <HomePage4Card vehicle={vehicle} options={largeScreenOptions.exterior} />
                    <HomePage4Card vehicle={vehicle} options={largeScreenOptions.interior} />
                    <HomePage4Card vehicle={vehicle} options={largeScreenOptions.basicCombo} />
                    <HomePage4Card vehicle={vehicle} options={largeScreenOptions.premiumCombo} />
                    <HomePage4Card vehicle={vehicle} options={largeScreenOptions.ultraCombo} />
                </div>}
        </div>
    )
}

export default HomePage4