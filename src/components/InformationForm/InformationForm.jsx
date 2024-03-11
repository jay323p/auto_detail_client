import { useDispatch, useSelector } from "react-redux"
import { SET_ADD_ADD_ONS, SET_DATE, SET_DATE_CHOSEN_BOOLEAN, SET_NEW_ORDER_ADDED, SET_ORDERS, SET_PUSH_ADD_ADD_ONS, SET_RESET_ORDER, selectOrder } from "../../redux/features/account/accountSlice"
import { SET_ERROR_MSG, SET_SUCCESS_MSG, selectUser } from '../../redux/features/auth/authSlice'
import { monthMapper } from "../../data/staticObjects"
// import { useEffect } from "react"
import { TbArrowBackUp } from 'react-icons/tb'
import sedan from '../../assets/sedan6.png'
import suv from '../../assets/suv.png'
import pickupTruck from '../../assets/pickupTruck.png'
import exotic from '../../assets/exotic.png'
import { useEffect, useState } from "react"
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import { PiVanFill, PiHeadlightsFill, PiEngineFill } from 'react-icons/pi'
import { BiSolidSprayCan } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { extraPackages } from "../../data/staticArrays"
import { getUserOrders, submitUserOrder } from "../../services/orderService"
import { useNavigate } from "react-router-dom"
import Loader1 from '../Loaders/Loader1'
import { reserveTimeSlotForUser } from "../../services/calendarService"
const addOnsMapper = {
    'HEADLIGHTS RESTORATION': (
        <PiHeadlightsFill className="text-[24px] md:text-[32px]" />
    ),
    'MOBILE DETAILING': <PiVanFill className="text-[24px] md:text-[32px]" />,
    'ENGINE BAY CLEANING': (
        <PiEngineFill className="text-[24px] md:text-[32px]" />
    ),
    'INTERIOR FRESHEN': (
        <BiSolidSprayCan className="text-[24px] md:text-[32px]" />
    ),
};

let addOnsTrackerInitialState = {
    'MOBILE DETAILING': false,
    'HEADLIGHTS RESTORATION': false,
    'ENGINE BAY CLEANING': false,
    'INTERIOR FRESHEN': false,
}

const orderInitialState = {
    vehicle: '',
    packageChosen: '',
    addOns: [],
    ttlPrice: 0,
    date: '',
    mobileRequired: false,
    address: '',
    county: '',
    phone: '',
    email: '',
    name: '',
    vehicleMake: '',
    vehicleModel: '',
    plateNumber: ''
}

const InformationForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const orderRedux = useSelector(selectOrder)
    const userRedux = useSelector(selectUser)
    // const dateChosenReduxBoolean = useSelector(selectDateChosen)

    const [isLoading, setIsLoading] = useState(false)
    const [img, setImg] = useState()
    const [addOnHeading, setAddOnHeading] = useState()
    const [addOnIcon, setAddOnIcon] = useState()
    const [addOnPrice, setAddOnPrice] = useState()
    const [addOnsSliderCounter, setAddOnsSliderCounter] = useState(0)
    const [addressRequired, setAddressRequired] = useState(false)
    const [addOnsTracker, setAddOnsTracker] = useState(addOnsTrackerInitialState)
    const [areaPrice, setAreaPrice] = useState(0)
    const [orderPrice, setOrderPrice] = useState(0)
    const [editAddOns, setEditAddOns] = useState(false)
    const [finalOrder, setFinalOrder] = useState(orderInitialState)
    const { address, county, phone, email, name, vehicleMake, vehicleModel, plateNumber } = finalOrder

    const goBackToCalendar = () => {
        dispatch(SET_DATE_CHOSEN_BOOLEAN(false))
    }

    const nextSlide = () => {
        if (orderRedux && addOnsSliderCounter < orderRedux.addOns.length) {
            let next = addOnsSliderCounter + 1
            setAddOnHeading(orderRedux.addOns[next].title)
            setAddOnIcon(addOnsMapper[orderRedux.addOns[next].title])
            setAddOnPrice(orderRedux.addOns[next].price)
            setAddOnsSliderCounter((p) => p + 1)
        }
    }
    const prevSlide = () => {
        if (orderRedux && addOnsSliderCounter > 0) {
            let next = addOnsSliderCounter - 1
            setAddOnHeading(orderRedux.addOns[next].title)
            setAddOnIcon(addOnsMapper[orderRedux.addOns[next].title])
            setAddOnPrice(orderRedux.addOns[next].price)
            setAddOnsSliderCounter((p) => p - 1)
        }
    }

    const changeAreaPrice = (e) => {
        console.log(e.target)
        setAreaPrice(parseFloat(e.target.value))
        setFinalOrder({ ...finalOrder, county: e.target.value })
    }

    const updateOrderPrice = () => {
        let totalPrice = 0
        for (let i = 0; i < orderRedux.addOns.length; i++) {
            totalPrice += orderRedux.addOns[i].numPrice
        }
        totalPrice += orderRedux.ttlPrice
        setOrderPrice(totalPrice)
    }

    const toggleAddOn = (title) => {
        // addOntracker
        // orderRedux.addOns
        const addOnAdded = addOnsTracker[title]

        if (addOnAdded) {
            setAddOnsTracker({ ...addOnsTracker, [title]: false })
            const newAddOns = orderRedux.addOns.filter((addOn) => addOn.title !== title)
            dispatch(SET_ADD_ADD_ONS(newAddOns))
        } else {
            setAddOnsTracker({ ...addOnsTracker, [title]: true })
            let addOnObject = {
                title,
                price: '',
                numPrice: 0,
            }
            for (let i = 0; i < extraPackages.length; i++) {
                if (extraPackages[i].title === title) {
                    addOnObject.price = extraPackages[i].price
                    addOnObject.numPrice = extraPackages[i].numPrice
                }
            }
            dispatch(SET_PUSH_ADD_ADD_ONS(addOnObject))
        }
    }

    const confirmOrder = async () => {
        const orderDetails = {
            userRefId: userRedux.userId,
            id: '',
            vehicle: '',
            packageChosen: '',
            addOns: [],
            ttlPrice: 0,
            date: '',
            mobileRequired: false,
            address: '',
            county: '',
            phone: '',
            email: '',
            name: '',
            vehicleMake: '',
            vehicleModel: '',
            plateNumber: ''
        }
        orderDetails.vehicle = orderRedux.vehicle
        orderDetails.packageChosen = orderRedux.package
        orderDetails.addOns = orderRedux.addOns
        orderDetails.ttlPrice = orderPrice
        orderDetails.date = orderRedux.date
        orderDetails.mobileRequired = addressRequired
        orderDetails.address = finalOrder.address
        orderDetails.county = finalOrder.county
        orderDetails.phone = finalOrder.phone
        orderDetails.email = finalOrder.email
        orderDetails.name = finalOrder.name
        orderDetails.vehicleMake = finalOrder.vehicleMake
        orderDetails.vehicleModel = finalOrder.vehicleModel
        orderDetails.plateNumber = finalOrder.plateNumber

        if (orderDetails.mobileRequired && orderDetails.address === '') {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please provide address for mobile-detailing!' }))
            return
        }
        if (orderDetails.mobileRequired && areaPrice === 0) {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please select your county for proper billing!' }))
            return
        }

        if (orderDetails.name === '' || orderDetails.phone === '' || orderDetails.email === '' || orderDetails.vehicleMake === '' || orderDetails.vehicleModel === '' || orderDetails.plateNumber === '') {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please fill out all fields!' }))
            return
        }
        const idPart1 = orderDetails.vehicle.slice(0, 4)
        const idPart2 = orderDetails.packageChosen.title.slice(0, 4)
        const idPart3 = orderDetails.vehicleMake.slice(0, 4)
        const idPart4 = orderDetails.vehicleModel.slice(0, 4)
        const dateNow = Date.now()
        const idArr = [idPart1, idPart2, idPart3, idPart4, dateNow]
        const orderId = idArr.join('/')
        orderDetails.id = orderId

        setIsLoading(true)
        try {
            const slot = {
                dateChosen: orderDetails.date.dateChosen.localDate,
                timeSlot: orderDetails.date.interval,
                userId: userRedux.userId
            }
            let dateObj = {
                interval: orderDetails.date.interval,
                dateChosen: orderDetails.date.dateChosen
            }
            const reservationData = await reserveTimeSlotForUser(slot)

            if (reservationData) {
                dispatch(SET_DATE(dateObj))
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Time Slot Booked!' }))
                console.log(reservationData)

                try {
                    console.log('tryingggggggggggggggggggggg')
                    const confirmedOrder = await submitUserOrder(orderDetails)
                    if (confirmedOrder) {
                        console.log('in hereeeeeeeeeeeeeeeeeeeeeee')
                        console.log(confirmedOrder)
                        const userOrderRef = {
                            activeOrders: confirmedOrder.activeOrders
                        }
                        const userOrders = await getUserOrders(userOrderRef)

                        if (userOrders) {
                            dispatch(SET_NEW_ORDER_ADDED(true))
                            dispatch(SET_ORDERS(userOrders))
                            dispatch(SET_RESET_ORDER())
                            navigate('/account')
                        }
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
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: message }))
        }
        setIsLoading(false)

    }

    useEffect(() => {
        if (orderRedux && orderRedux.vehicle !== '') {
            if (orderRedux.vehicle === 'SEDAN') {
                setImg(sedan)
            } else if (orderRedux.vehicle === 'SUV') {
                setImg(suv)
            } else if (orderRedux.vehicle === 'PICKUP') {
                setImg(pickupTruck)
            } else if (orderRedux.vehicle === 'HIGH-END') {
                setImg(exotic)
            }
        }

        if (orderRedux && orderRedux.addOns.length > 0) {
            setAddOnHeading(orderRedux.addOns[0].title)
            setAddOnIcon(addOnsMapper[orderRedux.addOns[0].title])
            setAddOnPrice(orderRedux.addOns[0].price)
        }
    }, [orderRedux])

    useEffect(() => {
        if (addressRequired && areaPrice > 0) {
            let totalPrice = 0
            for (let i = 0; i < orderRedux.addOns.length; i++) {
                totalPrice += orderRedux.addOns[i].numPrice
            }
            totalPrice += areaPrice
            totalPrice += orderRedux.ttlPrice
            setOrderPrice(totalPrice)
        }
        if (!addressRequired) {
            let totalPrice = 0
            for (let i = 0; i < orderRedux.addOns.length; i++) {
                totalPrice += orderRedux.addOns[i].numPrice
            }
            totalPrice += orderRedux.ttlPrice
            setOrderPrice(totalPrice)
        }
    }, [addressRequired, areaPrice, orderRedux.addOns, orderRedux.ttlPrice])

    useEffect(() => {
        if (!editAddOns) {
            console.log('fire if')
            let tracker = {
                'MOBILE DETAILING': false,
                'HEADLIGHTS RESTORATION': false,
                'ENGINE BAY CLEANING': false,
                'INTERIOR FRESHEN': false,
            }
            let mobileDetailingChosen = false
            for (let i = 0; i < orderRedux.addOns.length; i++) {
                let addOn = orderRedux.addOns[i].title
                tracker[addOn] = true
                if (orderRedux.addOns[i].title === 'MOBILE DETAILING') {
                    setAddressRequired(true)
                    mobileDetailingChosen = true
                }
            }
            if (!mobileDetailingChosen) {
                setAddressRequired(false)
            }
            setAddOnsTracker(tracker)
        }
        if (orderRedux) {
            updateOrderPrice()
        }
    }, [editAddOns, orderRedux.addOns, orderRedux])

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }, [isLoading])

    return (

        <>
            {isLoading ? <Loader1 /> :
                <div
                    className="h-full w-full flex flex-col justify-center items-center overflow-y-scroll bg-matteBlack bg-opacity-70 montFont pt-[1rem]"
                >
                    <div className="h-[10%] w-full flex flex-col items-center">
                        <h3 className="h-[30%] w-full text-center text-[16px] lg:text-[18px] text-brightRed font-thin">STEP 5</h3>
                        <h1 className="h-[70%] w-full text-center text-[18px] tall:text-[20px] md:text-[24px] lg:text-[26px] text-white font-bold">SUBMIT PERSONAL INFORMATION</h1>
                    </div>
                    <div className="h-[86%] w-[90%] md:w-[84%] lg:w-[75%] xl:w-[60%] bg-white bg-opacity-75 rounded-lg">
                        {/* date and vehicle */}
                        <div className="h-[14%] w-full relative flex justify-end items-center gap-[5%] rounded-tl-lg rounded-tr-lg bg-jetBlack bg-opacity-50 pr-[5px]">
                            <div className="h-[90%] w-[50%] flex justify-center items-center">
                                <img src={img} alt="" className="h-full object-contain" />
                            </div>
                            <div className="h-[90%] w-[33%] flex flex-col items-center bg-white bg-opacity-75 rounded-lg insetShadow">
                                <div className="h-[20%] w-full flex justify-center items-center">
                                    <h4 className="h-full text-[13px] md:text-[15px] text-darkBlue font-semibold">{orderRedux && monthMapper[orderRedux?.date?.dateChosen?.localDate.slice(0, 2)]}</h4>
                                </div>
                                <div className="h-[55%] w-full flex justify-center items-center text-[22px] md:text-[30px] text-darkBlue font-bold">
                                    {
                                        orderRedux && orderRedux.date.dateChosen.localDate[2] === '/' && orderRedux.date.dateChosen.localDate[4] === '/' ? orderRedux.date.dateChosen.localDate.slice(3, 4) : orderRedux.date.dateChosen.localDate[2] === '/' && orderRedux.date.dateChosen.localDate[5] === '/' ?
                                            orderRedux.date.dateChosen.localDate.slice(3, 5) : orderRedux.date.dateChosen.localDate[1] === '/' && orderRedux.date.dateChosen.localDate[3] === '/' ? orderRedux.date.dateChosen.localDate.slice(2, 3) : orderRedux.date.dateChosen.localDate.slice(2, 4)}
                                </div>
                                <div className="h-[25%] w-full flex justify-center items-start">
                                    <h4 className="h-[80%] text-[13px] md:text-[15px] text-darkBlue font-semibold">{orderRedux && orderRedux.date.interval}</h4>
                                </div>
                            </div>
                            <TbArrowBackUp className="absolute left-1 top-1 text-matteBlack cursor-pointer" size={'32px'} onClick={() => goBackToCalendar()} />
                        </div>
                        {/* package and addons */}
                        <div className="h-[20%] w-full flex gap-[0.5rem] p-[0.5rem] insetShadow2">
                            {/* package */}
                            <div className="h-full w-1/3 flex flex-col bg-matteBlack bg-opacity-30 rounded-md">
                                <div className="h-[20%] w-full flex justify-center items-center">
                                    <h3 className="h-[80%] w-full text-center text-[13px] md:text-[15px] font-semibold">{orderRedux && orderRedux.package.title} </h3>
                                </div>
                                <div className="max-h-[80%] w-full relative flex flex-col items-end gap-[1px] overflow-y-scroll ">
                                    <h3 className="min-h-[45%] tall:min-h-[35%] md:min-h-[25%] w-full text-center text-[12px] tall:text-[14px] md:text-[16px] bg-jetBlack text-darkBlue font-semibold bg-opacity-30">${orderRedux && orderRedux.ttlPrice}</h3>
                                    {orderRedux && orderRedux.package.checklist.map((item) => {
                                        return <h3 key={item.service} className="min-h-[45%] tall:min-h-[35%] md:min-h-[25%] w-full text-center text-[10px] tall:text-[12px] md:text-[14px]  font-thin bg-jetBlack bg-opacity-30">{item.service} </h3>
                                    })}
                                </div>
                            </div>
                            {/* addOns */}
                            <div className="h-full w-2/3 flex flex-col items-center bg-matteBlack bg-opacity-30 rounded-md overflow-x-hidden">
                                <div className="h-[20%] w-full flex justify-between items-center pr-[4px]">
                                    <h3 className="h-[80%] w-[80%] text-center text-[13px] md:text-[15px] tall:text-[15px] font-semibold">Your Add Ons - <span className="text-darkBlue font-bold">{orderRedux && orderRedux.addOns.length}</span></h3>
                                    {editAddOns ? <MdCancel className="cursor-pointer" onClick={() => setEditAddOns((prev) => !prev)} /> :
                                        <FaEdit className="cursor-pointer" onClick={() => setEditAddOns((prev) => !prev)} />
                                    }
                                </div>
                                {!editAddOns ?
                                    <>
                                        <div className="h-[85%] w-full flex justify-evenly items-center py-[4px]">
                                            <div className="h-full w-[15%] flex justify-center items-center">
                                                {orderRedux && orderRedux.addOns.length > 0 &&
                                                    <AiFillLeftCircle className={`${orderRedux && addOnsSliderCounter === 0 ? 'hidden' : ''} text-matteBlack cursor-pointer text-[24px] md:text-[30px]`} onClick={() => prevSlide()} />
                                                }
                                            </div>
                                            <div className="h-full w-[60%] md:w-[50%] flex flex-col bg-jetBlack bg-opacity-30 rounded-sm">
                                                {orderRedux && orderRedux.addOns.length === 0 ? <h2 className="h-[90%] w-full text-center text-[12px] md:text-[16px] tall:text-[14px]">No Add Ons Selected</h2>
                                                    : <>
                                                        <div className="h-[40%] w-full flex items-center">
                                                            <h2 className="h-[90%] w-full text-center text-[12px] md:text-[16px] tall:text-[14px]">{addOnHeading}</h2>
                                                        </div>
                                                        <div className="h-[60%] w-full flex items-center tall:items-start tall:pt-[10px] justify-evenly">
                                                            {addOnIcon}
                                                            <h3 className="text-darkBlue font-semibold text-[12px] md:text-[19px]">+{addOnPrice}</h3>
                                                        </div>
                                                    </>}
                                            </div>
                                            <div className="h-full w-[15%] flex justify-center items-center">
                                                {orderRedux && orderRedux.addOns.length > 0 &&
                                                    <AiFillRightCircle className={`${orderRedux && orderRedux.addOns.length - 1 === addOnsSliderCounter ? 'hidden' : ''} text-matteBlack text-[24px] md:text-[30px] cursor-pointer`} onClick={() => nextSlide()} />
                                                }
                                            </div>
                                        </div>

                                    </> : <div className="h-[85%] w-full grid grid-cols-2 bg-matteBlack opacity-50">
                                        {extraPackages.map((pack) => {
                                            return <div key={pack.title} className="h-full w-full flex justify-center items-center gap-[1px] p-[2px]">
                                                <div className={`${addOnsTracker[pack.title] === true ? 'bg-darkBlue' : 'bg-black'} h-[90%] w-[90%] flex justify-center items-center rounded-sm cursor-pointer`} onClick={() => toggleAddOn(pack.title)}>
                                                    <h3 className={` h-[80%] w-full text-[8px] tall:text-[9px] deskSm:text-[10px] md:text-[12px] text-white text-center bg-opacity-40`}>{pack.title}</h3>
                                                </div>
                                            </div>
                                        })}
                                    </div>}
                            </div>
                        </div>
                        {/* form */}
                        <div className="h-[70%] w-full flex flex-col items-center bg-jetBlack bg-opacity-50 pb-[8px] px-[8px] overflow-y-scroll">
                            <div className="h-[90%] w-full flex flex-col items-center pt-[10px] rounded-md bg-white bg-opacity-70 insetShadow mt-[3%]">
                                {addressRequired && <>
                                    <div className="areaSelect bg-jetBlack bg-opacity-30">
                                        <select className="text-matteBlack text-[14px] font-thin" placeholder="Houston Area" onClick={(e) => changeAreaPrice(e)}>
                                            <option hidden name='county' value={county} className="bg-matteBlack bg-opacity-40 text-[13px] text-brightRed" >
                                                Please Select Houston County
                                            </option>
                                            <option name='county' value={10} className="bg-matteBlack bg-opacity-40 text-[13px] cursor-pointer" >
                                                Fort Bend County-- $10
                                            </option>
                                            <option name='30' value={30} className="bg-matteBlack bg-opacity-40 text-[13px] cursor-pointer">
                                                Harris County-- $30
                                            </option>
                                            <option name='50' value={50} className="bg-matteBlack bg-opacity-40 text-[13px] cursor-pointer">
                                                Waller County-- $50
                                            </option>
                                            <option name='70' value={70} className="bg-matteBlack bg-opacity-40 text-[13px] cursor-pointer">
                                                Wharton County-- $70
                                            </option>
                                            <option name='100' value={100} className="bg-matteBlack bg-opacity-40 text-[13px] cursor-pointer">
                                                Montgomery County-- $100
                                            </option>
                                        </select>
                                    </div>

                                    <div className="min-h-[8%] w-full flex justify-center gap-[3%] items-end">
                                        <h5 className="text-[12px]">MOBILE DETAILING:</h5>
                                        <h5 className="text-[12px] font-semibold text-brightRed">ADDRESS REQUIRED</h5>
                                    </div>
                                    <div className="min-h-[10%] w-full flex justify-center items-start">
                                        <input name='address' value={address} type="text" className="h-[80%] w-[90%] md:w-[70%] lg:w-[50%] bg-jetBlack bg-opacity-40 text-[13px] font-semibold text-matteBlack outline-none text-center rounded-md" placeholder="123 Greenbriar Dr 77083 Apt 526" onChange={(e) => setFinalOrder({ ...finalOrder, address: e.target.value })} />
                                    </div>
                                </>}
                                <div className={`${!addressRequired ? 'min-h-[80%] lg:min-h-[90%]' : 'min-h-[70%]'} overflow-y-scroll w-full relative flex flex-col items-center bg-white bg-opacity-20`}>
                                    <div className="min-h-[20%] w-full flex items-end">
                                        <h2 className="h-[70%] w-full text-center font-bold tall:text-[18px]">PERSONAL INFORMATION</h2>
                                    </div>
                                    <div className="min-h-[25%] tall:min-h-[22%] w-[90%] flex items-start justify-center gap-[5%]">
                                        <div className="h-full w-1/2 flex flex-col items-center">
                                            <label htmlFor="order-name" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Name</label>
                                            <input id="order-name" name="name" value={name} type="text" placeholder="John Gonzalez" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required onChange={(e) => setFinalOrder({ ...finalOrder, name: e.target.value })} />
                                        </div>
                                        <div className="h-full w-1/2 flex flex-col items-center">
                                            <label htmlFor="order-phone" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Phone #</label>
                                            <input id="order-phone" name="phone" value={phone} type="text" placeholder="873-827-9012" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required onChange={(e) => setFinalOrder({ ...finalOrder, phone: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="min-h-[25%] tall:min-h-[22%] w-[90%] flex items-start justify-center gap-[5%]">
                                        <div className="h-full w-1/2 flex flex-col items-center">
                                            <label htmlFor="order-email" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Email</label>
                                            <input id="order-email" name="email" value={email} type="text" placeholder="jGonzalez@gmail.com" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required onChange={(e) => setFinalOrder({ ...finalOrder, email: e.target.value })} />
                                        </div>
                                        <div className="h-full w-1/2 flex flex-col items-center">
                                            <label htmlFor="order-vehicleMake" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Vehicle Make</label>
                                            <input id="order-vehicleMake" name="vehicleMake" value={vehicleMake} type="text" placeholder="Toyota" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required onChange={(e) => setFinalOrder({ ...finalOrder, vehicleMake: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="min-h-[25%] tall:min-h-[22%] w-[90%] flex items-start justify-center gap-[5%]">
                                        <div className="h-full w-1/2 flex flex-col items-center">
                                            <label htmlFor="order-vehicleModel" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Vehicle Model</label>
                                            <input id="order-vehicleModel" name="vehicleModel" value={vehicleModel} type="text" placeholder="Camry" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required onChange={(e) => setFinalOrder({ ...finalOrder, vehicleModel: e.target.value })} />
                                        </div>
                                        <div className="h-full w-1/2 flex flex-col items-center">
                                            <label htmlFor="order-plateNumber" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Plate Number</label>
                                            <input id="order-plateNumber" name="plateNumber" value={plateNumber} type="text" placeholder="4CB69S" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required onChange={(e) => setFinalOrder({ ...finalOrder, plateNumber: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="min-h-[25%] tall:min-h-[22%] w-[90%] flex items-start justify-center gap-[5%]">

                                        <div className="h-full w-1/2 flex flex-col items-center justify-center">
                                            <button className="h-[56%] w-[80%] bg-darkBlue rounded-md insetShadow text-white font-semibold text-[16px] cursor-pointer" onClick={() => confirmOrder()}>Submit</button>
                                        </div>
                                    </div>
                                    <div className="min-h-[25%] w-full flex flex-col items-center">
                                        <h3 className="text-[16px]">Order Price: <span className="text-darkBlue font-semibold">${orderPrice}</span></h3>
                                        <h5 className="min-h-[40%] w-full  text-center text-[12px]">**All payments made in person until stripe integration**</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default InformationForm
