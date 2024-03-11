import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BookingPage2 from './BookingPage2'
import BookingPage3 from './BookingPage3'
import { SET_ORDER, SET_QUICK_BOOK, SET_VEHICLE_PACKAGE_CHOSEN, selectAddOnsChosen, selectQuickBook, selectVehiclePackageChosen } from '../../redux/features/account/accountSlice'
import { SET_ERROR_MSG, selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { packageMapper, pricingMapper, pricingMapperShort } from '../../data/staticObjects'
import { AiFillLeftCircle, AiFillRightCircle, AiFillCar } from 'react-icons/ai'
import { MdCheck } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { GiVacuumCleaner, GiCheckMark } from 'react-icons/gi'
import { BiSolidCartAdd } from 'react-icons/bi'
import { BsFillCalendarCheckFill } from 'react-icons/bs'
import garage from '../../assets/garage.jpg'
import sedan from '../../assets/sedan6.png'
import exotic from '../../assets/exotic.png'

const initialOrderState = {
    vehicle: '',
    package: '',
    addOns: [],
    ttlPrice: 0,
    date: '',
}

const BookingPage1 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const vehiclePackageChosenRedux = useSelector(selectVehiclePackageChosen)
    const addOnsChosenRedux = useSelector(selectAddOnsChosen)
    const quickBookRedux = useSelector(selectQuickBook)
    const isLoggedInRedux = useSelector(selectIsLoggedIn)

    const [vehicle, setVehicle] = useState('SEDAN')
    const [imgSrc, setImgSrc] = useState(sedan)
    const [title, setTitle] = useState(pricingMapper['sedan'].interior.title)
    const [price, setPrice] = useState(pricingMapper['sedan'].interior.price)
    const [checklist, setChecklist] = useState(pricingMapper['sedan'].interior.checklist)
    const [slideCounter, setSlideCounter] = useState(0)
    const [packageCounter, setPackageCounter] = useState(0)
    const [order, setOrder] = useState(initialOrderState)

    const nextSlide = () => {
        setPackageCounter(0)
        if (slideCounter !== 3) {
            let next = slideCounter + 1
            const newImgSrc = pricingMapperShort[next].imgSource
            const newVehicle = pricingMapperShort[next].vehicle
            const vehicleImg = document.getElementById('vehicleImg')
            setSlideCounter((prev) => prev + 1)
            vehicleImg.classList.add('slideCard')
            setVehicle(newVehicle)
            if (newVehicle === 'HIGH-END') {
                setTitle(pricingMapper['highEnd'].interior.title)
                setPrice(pricingMapper['highEnd'].interior.price)
                setChecklist(pricingMapper['highEnd'].interior.checklist)
            } else {
                const lowercase = newVehicle.toLowerCase()
                setTitle(pricingMapper[lowercase].interior.title)
                setPrice(pricingMapper[lowercase].interior.price)
                setChecklist(pricingMapper[lowercase].interior.checklist)
            }
            setTimeout(() => {
                vehicleImg.classList.remove('slideCard')
                setImgSrc(newImgSrc)
                vehicleImg.classList.add('slideCardFromRight')

                setTimeout(() => {
                    vehicleImg.classList.remove('slideCardFromRight')
                }, 700)
            }, 700)
        } else {
            const vehicleImg = document.getElementById('vehicleImg')
            setSlideCounter(0)
            vehicleImg.classList.add('slideCard')
            setVehicle('SEDAN')
            setTitle(pricingMapper['sedan'].interior.title)
            setPrice(pricingMapper['sedan'].interior.price)
            setChecklist(pricingMapper['sedan'].interior.checklist)
            setTimeout(() => {
                vehicleImg.classList.remove('slideCard')
                setImgSrc(sedan)
                vehicleImg.classList.add('slideCardFromRight')

                setTimeout(() => {
                    vehicleImg.classList.remove('slideCardFromRight')
                }, 700)
            }, 700)
        }
    }
    const prevSlide = () => {
        setPackageCounter(0)
        if (slideCounter !== 0) {
            let next = slideCounter - 1
            const newImgSrc = pricingMapperShort[next].imgSource
            const newVehicle = pricingMapperShort[next].vehicle
            const vehicleImg = document.getElementById('vehicleImg')

            setSlideCounter((prev) => prev - 1)
            vehicleImg.classList.add('slideCardReverse')
            setVehicle(newVehicle)
            const lowercase = newVehicle.toLowerCase()
            setTitle(pricingMapper[lowercase].interior.title)
            setPrice(pricingMapper[lowercase].interior.price)
            setChecklist(pricingMapper[lowercase].interior.checklist)
            setTimeout(() => {
                vehicleImg.classList.remove('slideCardReverse')
                setImgSrc(newImgSrc)
                vehicleImg.classList.add('slideCardFromLeft')

                setTimeout(() => {
                    vehicleImg.classList.remove('slideCardFromLeft')
                }, 700)
            }, 700)
        } else {
            const vehicleImg = document.getElementById('vehicleImg')
            setSlideCounter(4)
            vehicleImg.classList.add('slideCardReverse')
            setVehicle('HIGH-END')
            setTitle(pricingMapper['highEnd'].interior.title)
            setPrice(pricingMapper['highEnd'].interior.price)
            setChecklist(pricingMapper['highEnd'].interior.checklist)
            setTimeout(() => {
                vehicleImg.classList.remove('slideCardReverse')
                setImgSrc(exotic)
                vehicleImg.classList.add('slideCardFromLeft')

                setTimeout(() => {
                    vehicleImg.classList.remove('slideCardFromLeft')
                }, 700)
            }, 700)
        }
    }

    const changeVehicle = (e) => {
        setPackageCounter(0)
        let newImgSrc;
        const desiredVehicle = e.target.innerText
        const vehicleImg = document.getElementById('vehicleImg')

        vehicleImg.classList.add('slideCard')
        if (desiredVehicle === 'SEDAN') {
            setSlideCounter(0)
            newImgSrc = pricingMapperShort[0].imgSource
            setVehicle(desiredVehicle)
            setTitle(pricingMapper['sedan'].interior.title)
            setPrice(pricingMapper['sedan'].interior.price)
            setChecklist(pricingMapper['sedan'].interior.checklist)
        } else if (desiredVehicle === 'SUV') {
            setSlideCounter(1)
            newImgSrc = pricingMapperShort[1].imgSource
            setVehicle(desiredVehicle)
            setTitle(pricingMapper['suv'].interior.title)
            setPrice(pricingMapper['suv'].interior.price)
            setChecklist(pricingMapper['suv'].interior.checklist)
        } else if (desiredVehicle === 'PICKUP') {
            setSlideCounter(2)
            newImgSrc = pricingMapperShort[2].imgSource
            setVehicle(desiredVehicle)
            setTitle(pricingMapper['pickup'].interior.title)
            setPrice(pricingMapper['pickup'].interior.price)
            setChecklist(pricingMapper['pickup'].interior.checklist)
        } else if (desiredVehicle === 'HIGH-END') {
            setSlideCounter(3)
            newImgSrc = pricingMapperShort[3].imgSource
            setVehicle(desiredVehicle)
            setTitle(pricingMapper['highEnd'].interior.title)
            setPrice(pricingMapper['highEnd'].interior.price)
            setChecklist(pricingMapper['highEnd'].interior.checklist)
        }


        setTimeout(() => {
            vehicleImg.classList.remove('slideCard')
            setImgSrc(newImgSrc)
            vehicleImg.classList.add('slideCardFromRight')

            setTimeout(() => {
                vehicleImg.classList.remove('slideCardFromRight')
            }, 700)
        }, 700)
    }

    const nextPackage = () => {
        if (packageCounter !== 4) {
            let lowercaseVeh;
            if (vehicle === 'HIGH-END') {
                lowercaseVeh = 'highEnd'
            } else {
                lowercaseVeh = vehicle.toLowerCase()
            }
            let next = packageCounter + 1
            const packageCard = document.getElementById('package')
            packageCard.classList.add('fade')
            setPackageCounter((prev) => prev + 1)
            setTimeout(() => {
                setTitle(pricingMapper[lowercaseVeh][packageMapper[next]].title)
                setPrice(pricingMapper[lowercaseVeh][packageMapper[next]].price)
                setChecklist(pricingMapper[lowercaseVeh][packageMapper[next]].checklist)
                packageCard.classList.remove('fade')
                packageCard.classList.add('fadeIn')

                setTimeout(() => {
                    packageCard.classList.remove('fadeIn')
                }, 700)
            }, 700)
        } else {
            let lowercaseVeh;
            if (vehicle === 'HIGH-END') {
                lowercaseVeh = 'highEnd'
            } else {
                lowercaseVeh = vehicle.toLowerCase()
            }
            let next = 0
            const packageCard = document.getElementById('package')
            packageCard.classList.add('fade')
            setPackageCounter(0)
            setTimeout(() => {
                setTitle(pricingMapper[lowercaseVeh][packageMapper[next]].title)
                setPrice(pricingMapper[lowercaseVeh][packageMapper[next]].price)
                setChecklist(pricingMapper[lowercaseVeh][packageMapper[next]].checklist)
                packageCard.classList.remove('fade')
                packageCard.classList.add('fadeIn')

                setTimeout(() => {
                    packageCard.classList.remove('fadeIn')
                }, 700)
            }, 700)
        }
    }

    const prevPackage = () => {
        if (packageCounter !== 0) {

            let lowercaseVeh;
            if (vehicle === 'HIGH-END') {
                lowercaseVeh = 'highEnd'
            } else {
                lowercaseVeh = vehicle.toLowerCase()
            }
            let next = packageCounter - 1
            const packageCard = document.getElementById('package')
            packageCard.classList.add('fade')
            setPackageCounter((prev) => prev - 1)
            setTimeout(() => {
                setTitle(pricingMapper[lowercaseVeh][packageMapper[next]].title)
                setPrice(pricingMapper[lowercaseVeh][packageMapper[next]].price)
                setChecklist(pricingMapper[lowercaseVeh][packageMapper[next]].checklist)
                packageCard.classList.remove('fade')
                packageCard.classList.add('fadeIn')

                setTimeout(() => {
                    packageCard.classList.remove('fadeIn')
                }, 700)
            }, 700)
        } else {
            let lowercaseVeh;
            if (vehicle === 'HIGH-END') {
                lowercaseVeh = 'highEnd'
            } else {
                lowercaseVeh = vehicle.toLowerCase()
            }
            let next = 4
            const packageCard = document.getElementById('package')
            packageCard.classList.add('fade')
            setPackageCounter(4)
            setTimeout(() => {
                setTitle(pricingMapper[lowercaseVeh][packageMapper[next]].title)
                setPrice(pricingMapper[lowercaseVeh][packageMapper[next]].price)
                setChecklist(pricingMapper[lowercaseVeh][packageMapper[next]].checklist)
                packageCard.classList.remove('fade')
                packageCard.classList.add('fadeIn')

                setTimeout(() => {
                    packageCard.classList.remove('fadeIn')
                }, 700)
            }, 700)
        }
    }

    const confirmVehiclePackage = () => {
        if (!isLoggedInRedux) {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please create an account or login before continuing!' }))
            return navigate('/authentication')
        }
        let lowercaseVeh;
        if (vehicle === 'HIGH-END') {
            lowercaseVeh = 'highEnd'
        } else {
            lowercaseVeh = vehicle.toLowerCase()
        }
        let numberPrice;

        if (quickBookRedux !== undefined) {
            let fixedTitle;

            if (quickBookRedux.packageChosen.title === 'Exterior Detail') {
                fixedTitle = 'exterior'
            } else if (quickBookRedux.packageChosen.title === 'Interior Detail') {
                fixedTitle = 'interior'
            } else if (quickBookRedux.packageChosen.title === 'Basic Combo') {
                fixedTitle = 'basicCombo'
            } else if (quickBookRedux.packageChosen.title === 'Premium Combo') {
                fixedTitle = 'premiumCombo'
            } else if (quickBookRedux.packageChosen.title === 'Ultra Combo') {
                fixedTitle = 'ultraCombo'
            }
            numberPrice = pricingMapper[lowercaseVeh][fixedTitle].numPrice

        } else {
            numberPrice = pricingMapper[lowercaseVeh][packageMapper[packageCounter]].numPrice
        }

        const newOrderObject = {
            vehicle,
            package: {
                title,
                price,
                checklist
            },
            addOns: [],
            ttlPrice: numberPrice,
            date: '',
        }
        dispatch(SET_ORDER(newOrderObject))
        dispatch(SET_VEHICLE_PACKAGE_CHOSEN(true))
        setOrder({ ...order, vehicle, package: title, ttlPrice: numberPrice })
        dispatch(SET_QUICK_BOOK(undefined))
    }

    useEffect(() => {
        if (quickBookRedux !== undefined) {
            setVehicle(quickBookRedux.vehicle)
            setTitle(quickBookRedux.packageChosen.title)
            setPrice(quickBookRedux.packageChosen.price)
            setChecklist(quickBookRedux.packageChosen.checklist)

            if (quickBookRedux.vehicle === 'SEDAN') {
                setImgSrc(pricingMapperShort[0].imgSource)
            } else if (quickBookRedux.vehicle === 'SUV') {
                setImgSrc(pricingMapperShort[1].imgSource)
            } else if (quickBookRedux.vehicle === 'PICKUP') {
                setImgSrc(pricingMapperShort[2].imgSource)
            } else if (quickBookRedux.vehicle === 'HIGH-END') {
                setImgSrc(pricingMapperShort[3].imgSource)
            }
        }
    }, [quickBookRedux])

    return (
        <div className="min-h-[100vh] w-full flex flex-col overflow-y-scroll bg-matteBlack montFont"
        > {!vehiclePackageChosenRedux ?
            <>
                <div className="h-[60vh] lg:h-[70vh] w-full flex flex-col items-center pt-[10vh]"
                    style={{ background: `url(${garage}) center center / cover` }}
                >
                    <div className='h-[10%] w-full flex justify-center items-end'>
                        <h3 className='text-brightRed text-[16px] font-thin'>STEP 1</h3>
                    </div>
                    <div className='h-[10%] w-full flex justify-center items-start'>
                        <h3 className='text-white text-[24px] font-semibold'>Choose Your Car Type</h3>
                    </div>
                    <div className='h-[15%] w-full flex justify-center items-end z-50'>
                        <button className={`${vehicle === 'SEDAN' ? 'bg-black bg-opacity-30 text-brightRed' : 'bg-transparent text-white'} h-[70%] w-[20%] text-[10px] lg:text-[13px] cursor-pointer rounded-md redTextHover`} onClick={(e) => changeVehicle(e)}>SEDAN</button>
                        <button className={`${vehicle === 'SUV' ? 'bg-black bg-opacity-30 text-brightRed' : 'bg-transparent text-white'} h-[70%] w-[20%] text-[10px] lg:text-[13px] cursor-pointer rounded-md redTextHover`} onClick={(e) => changeVehicle(e)}>SUV</button>
                        <button className={`${vehicle === 'PICKUP' ? 'bg-black bg-opacity-30 text-brightRed' : 'bg-transparent text-white'} h-[70%] w-[20%] text-[10px] lg:text-[13px] cursor-pointer rounded-md redTextHover`} onClick={(e) => changeVehicle(e)}>PICKUP</button>
                        <button className={`${vehicle === 'HIGH-END' ? 'bg-black bg-opacity-30 text-brightRed' : 'bg-transparent text-white'} h-[70%] w-[20%] text-[10px] lg:text-[13px] cursor-pointer rounded-md redTextHover`} onClick={(e) => changeVehicle(e)}>HIGH-END</button>
                    </div>
                    <div className='h-[55%] w-full flex justify-center items-end'>
                        <img id='vehicleImg' src={imgSrc} alt="" className={`${vehicle === 'HIGH-END' ? 'scale-125' : vehicle === 'SEDAN' ? 'scale-125' : ''} w-[80%] tall:w-[90%] deskSm:w-[60%] md:w-[40%] lg:w-[30%] ${vehicle !== 'HIGH-END' && 'xxl:translate-y-[50px] xl:translate-y-[20px]'}`} />
                    </div>
                    <div className='h-[10%] w-full flex justify-center items-center gap-[20%]'>
                        <AiFillLeftCircle size={'32px'} className='text-brightRed cursor-pointer z-50' onClick={() => prevSlide()} />
                        <AiFillRightCircle size={'32px'} className='text-brightRed cursor-pointer z-50' onClick={() => nextSlide()} />
                    </div>
                </div>
                <div className='h-[40vh] lg:h-[30vh] w-full flex justify-center items-center'>
                    <div className='h-full w-full md:w-1/2 flex flex-col items-center'>
                        <div className='h-[10%] w-full flex justify-center items-end'>
                            <h3 className='text-darkBlue cursor-pointer text-[16px] font-thin'>STEP 2</h3>
                        </div>
                        <div className='h-[10%] w-full flex justify-center items-start'>
                            <h3 className='text-white text-[24px] font-semibold'>Choose Detailing Package</h3>
                        </div>
                        <div className='h-[70%] w-full flex justify-between items-center p-[10px]'>
                            <AiFillLeftCircle size={'32px'} className='text-darkBlue cursor-pointer' onClick={() => prevPackage()} />
                            <div id='package' className='h-[90%] w-[70%] flex flex-col items-center gap-[4px] bg-darkBlue text-darkBlue rounded-lg insetShadow'>
                                <div className='h-[20%] lg:h-[20%] w-full flex justify-center items-center gap-[10%] px-[1%]'>
                                    <h3 className='h-[60%] w-1/2 text-[12px] tall:text-[13px] deskSm:text-[14px] font-semibold text-center text-white'>{title}</h3>
                                    <h2 className='h-[60%] w-1/2 text-[12px] tall:text-[13px] deskSm:text-[14px] font-semibold text-center text-green-500'>{price}</h2>
                                </div>
                                <div className={`${checklist && checklist.length === 5 ? 'gap-[4%]' : 'gap-[7%]'} h-[70%] w-full flex flex-col items-start justify-center font-thin text-[16px]`}>
                                    {checklist && checklist.map((item, i) => {
                                        return <div key={`${item}-${i}`} className='h-[16%] lg:h-[18%] w-full flex justify-center items-center gap-[4px]'>
                                            {item.check ? <MdCheck className='text-green-500' /> : <RxCross2 className='text-red-500' />}
                                            <h4 className='text-[12px] md:text-[14px] lg:text-[12px] text-white'>{item.service}</h4>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <AiFillRightCircle size={'32px'} className='text-darkBlue cursor-pointer' onClick={() => nextPackage()} />
                        </div>
                        <div className='h-[10%] w-full flex justify-between md:justify-center items-center px-[4px] bg-jetBlack'>
                            <button
                                className='h-[80%] w-[40%] md:w-[30%] rounded-lg font-bold text-white cursor-pointer insetShadow1 changeBg' onClick={() => confirmVehiclePackage()}>CONFIRM</button>
                            <h3 className='w-[60%] text-[14px] text-center text-white'>{vehicle} -- {title}</h3>

                        </div>
                    </div>
                    <div className='hidden md:flex flex-col items-center justify-center h-full w-1/2 bg-jetBlack insetShadow'>
                        <div className='h-1/6 w-full flex justify-center items-center'>
                            <div className='h-full w-3/4 flex items-center justify-end'>
                                <h3 className='text-brightRed w-[80%]'>STEP 1:<span className='text-white font-bold pl-[1%]'> Choose Your Car Type</span></h3>
                            </div>
                            <div className="h-full w-1/4 flex items-center">
                                <AiFillCar size={'30px'} className='text-brightRed' />
                            </div>
                        </div>
                        <div className='h-1/6 w-full flex justify-center items-center'>
                            <div className='h-full w-3/4 flex items-center justify-end'>
                                <h3 className='text-darkBlue w-[80%]'>STEP 2:<span className='text-white font-bold pl-[1%]'> Choose Detailing Package</span></h3>
                            </div>
                            <div className="h-full w-1/4 flex items-center">
                                <GiVacuumCleaner size={'30px'} className='text-darkBlue' />
                            </div>
                        </div>
                        <div className='h-1/6 w-full flex justify-center items-center'>
                            <div className='h-full w-3/4 flex items-center justify-end'>
                                <h3 className='text-brightRed w-[80%]'>STEP 3:<span className='text-white font-bold pl-[1%]'> Choose Additional Options</span></h3>
                            </div>
                            <div className="h-full w-1/4 flex items-center">
                                <BiSolidCartAdd size={'30px'} className='text-brightRed' />
                            </div>
                        </div>
                        <div className='h-1/6 w-full flex justify-center items-center'>
                            <div className='h-full w-3/4 flex items-center justify-end'>
                                <h3 className='text-darkBlue w-[80%]'>STEP 4:<span className='text-white font-bold pl-[1%]'> Appointment & Information</span></h3>
                            </div>
                            <div className="h-full w-1/4 flex items-center">
                                <BsFillCalendarCheckFill size={'30px'} className='text-darkBlue' />
                            </div>
                        </div>
                        <div className='h-1/6 w-full flex justify-center items-center'>
                            <div className='h-full w-3/4 flex items-center justify-end'>
                                <h3 className='text-brightRed w-[80%]'>STEP 5:<span className='text-white font-bold pl-[1%]'> Confirm Booking</span></h3>
                            </div>
                            <div className="h-full w-1/4 flex items-center">
                                <GiCheckMark size={'30px'} className='text-brightRed' />
                            </div>
                        </div>
                    </div>
                </div>
            </>
            : vehiclePackageChosenRedux && !addOnsChosenRedux ? <BookingPage2 /> : vehiclePackageChosenRedux && addOnsChosenRedux ? <BookingPage3 /> : ''}
        </div>
    )
}

export default BookingPage1