import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { deleteUserOrderChosen, getUserOrders, updateUserOrderChosen } from "../../services/orderService"
import { unreserveTimeSlotForUser } from "../../services/calendarService"
import { SET_ACTIVE_ORDERS, SET_ERROR_MSG, SET_SUCCESS_MSG, selectUser } from "../../redux/features/auth/authSlice"
import { SET_ORDERS, SET_REVIEW_HANDLING, selectReviewHandling } from '../../redux/features/account/accountSlice'
import { countiesMapper, monthMapper } from "../../data/staticObjects"
import PropTypes from 'prop-types'
import { MdCancel } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import { PiEngineFill, PiHeadlightsFill, PiVanFill } from "react-icons/pi"
import { BiSolidSprayCan } from "react-icons/bi"
import sedan from '../../assets/sedan6.png'
import suv from '../../assets/suv.png'
import pickupTruck from '../../assets/pickupTruck.png'
import exotic from '../../assets/exotic.png'
import emptyOrder from '../../assets/emptyOrder.png'

const addOnsMapper = {
    'HEADLIGHTS RESTORATION': (
        <PiHeadlightsFill className="text-[24px] md:text-[32px] text-matteBlack" />
    ),
    'MOBILE DETAILING': (
        <PiVanFill className="text-[24px] md:text-[32px] text-matteBlack" />
    ),
    'ENGINE BAY CLEANING': (
        <PiEngineFill className="text-[24px] md:text-[32px] text-matteBlack" />
    ),
    'INTERIOR FRESHEN': (
        <BiSolidSprayCan className="text-[24px] md:text-[32px] text-matteBlack" />
    ),
};


const orderInitialState = {
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

const AccountOrders = ({ orderType, orderData }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRedux = useSelector(selectUser)
    const reviewHandlingRedux = useSelector(selectReviewHandling)

    const [ordersRedux, setOrdersRedux] = useState(orderData)
    const [orderChosen, setOrderChosen] = useState(orderData[0])
    const [addOnsSliderCounter, setAddOnsSliderCounter] = useState(0)
    const [addOnHeading, setAddOnHeading] = useState(0)
    const [addOnIcon, setAddOnIcon] = useState(0)
    const [addOnPrice, setAddOnPrice] = useState(0)
    const [addressRequired, setAddressRequired] = useState(false)
    const [orderPrice, setOrderPrice] = useState(0)
    const [finalOrder, setFinalOrder] = useState(orderInitialState)
    const [editOrder, setEditOrder] = useState(false)
    const [confirmEdit, setConfirmEdit] = useState(false)
    const [confirmCancel, setConfirmCancel] = useState(false)
    const [img, setImg] = useState()
    const { address, county, phone, email, name, vehicleMake, vehicleModel, plateNumber } = finalOrder

    const nextSlide = () => {
        if (orderChosen && addOnsSliderCounter < orderChosen.addOns.length) {
            let next = addOnsSliderCounter + 1
            setAddOnHeading(orderChosen.addOns[next].title)
            setAddOnIcon(addOnsMapper[orderChosen.addOns[next].title])
            setAddOnPrice(orderChosen.addOns[next].price)
            setAddOnsSliderCounter((p) => p + 1)
        }
    }
    const prevSlide = () => {
        if (orderChosen && addOnsSliderCounter > 0) {
            let next = addOnsSliderCounter - 1
            setAddOnHeading(orderChosen.addOns[next].title)
            setAddOnIcon(addOnsMapper[orderChosen.addOns[next].title])
            setAddOnPrice(orderChosen.addOns[next].price)
            setAddOnsSliderCounter((p) => p - 1)
        }
    }
    const changeOrder = (id) => {
        const desiredOne = ordersRedux.filter((order) => order.id === id)
        if (desiredOne) {
            setOrderChosen(desiredOne[0])
            setFinalOrder(desiredOne[0])
        } else {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Unable to retreive order!' }))
        }
    }

    const editOrderDetails = async () => {
        const respectiveOrder = ordersRedux.filter((order) => order.id === orderChosen.id)
        const orderDetails = {
            _id: respectiveOrder[0]._id,
            id: orderChosen.id,
            vehicle: orderChosen.vehicle,
            packageChosen: orderChosen.packageChosen,
            addOns: orderChosen.addOns,
            ttlPrice: orderChosen.ttlPrice,
            date: orderChosen.date,
            mobileRequired: orderChosen.mobileRequired,
            address: finalOrder.address,
            county: orderChosen.county,
            phone: finalOrder.phone,
            email: finalOrder.email,
            name: finalOrder.name,
            vehicleMake: finalOrder.vehicleMake,
            vehicleModel: finalOrder.vehicleModel,
            plateNumber: finalOrder.plateNumber
        }

        try {
            const res = await updateUserOrderChosen(orderDetails)
            if (res) {
                try {
                    const userOrders = await getUserOrders()
                    if (userOrders) {
                        dispatch(SET_ORDERS(userOrders))
                        setOrderChosen(userOrders[0])
                        dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Update Successful! For other booking updates, call 987-675-1827' }))
                    }
                } catch (error) {
                    dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: error.message }))
                }
            }
        } catch (error) {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: error.message }))
        }
        setConfirmEdit(false)
        setEditOrder(false)
    }

    const deleteOrder = async () => {
        const data = {
            _id: orderChosen._id
        }
        try {
            const slot = {
                dateChosen: orderChosen.date.dateChosen.localDate,
                timeSlot: orderChosen.date.interval,
                userId: userRedux.userId
            }
            const reservationData = await unreserveTimeSlotForUser(slot)

            if (reservationData) {
                try {
                    const userProfile = await deleteUserOrderChosen(data)
                    if (userProfile) {
                        dispatch(SET_ACTIVE_ORDERS(userProfile.activeOrders))
                        try {
                            const userOrders = await getUserOrders()
                            if (userOrders) {
                                dispatch(SET_ORDERS(userOrders))
                                if (userOrders.length > 0) {
                                    setOrderChosen(userOrders[0])
                                } else {
                                    setOrderChosen(orderInitialState)
                                }
                                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Order Was Canceled!' }))
                            }
                        } catch (error) {
                            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: error.message }))
                        }
                    }
                } catch (error) {
                    dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: error.message }))
                }
            }
        } catch (error) {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: error.message }))
        }
        setConfirmCancel(false)
        setEditOrder(false)

    }

    useEffect(() => {
        if (orderType === 'Active') {
            setOrdersRedux(orderData)
            setOrderChosen(orderData[0])
        }
        if (orderType === 'Archive') {
            setOrdersRedux(orderData)
            setOrderChosen(orderData[0])
        }

    }, [orderType, orderData])

    useEffect(() => {
        if (orderChosen && orderChosen?.vehicle !== '') {
            if (orderChosen?.vehicle === 'SEDAN') {
                setImg(sedan)
            } else if (orderChosen?.vehicle === 'SUV') {
                setImg(suv)
            } else if (orderChosen?.vehicle === 'PICKUP') {
                setImg(pickupTruck)
            } else if (orderChosen?.vehicle === 'HIGH-END') {
                setImg(exotic)
            }

            let countyChosen;
            if (orderChosen.mobileRequired) {
                countyChosen = countiesMapper[orderChosen.county]
            }
            const filledState = {
                id: orderChosen.id,
                vehicle: orderChosen.vehicle,
                packageChosen: orderChosen.packageChosen,
                addOns: orderChosen.addOns,
                ttlPrice: orderChosen.ttlPrice,
                date: orderChosen.date,
                mobileRequired: orderChosen.mobileRequired,
                address: orderChosen.address,
                county: countyChosen,
                phone: orderChosen.phone,
                email: orderChosen.email,
                name: orderChosen.name,
                vehicleMake: orderChosen.vehicleMake,
                vehicleModel: orderChosen.vehicleModel,
                plateNumber: orderChosen.plateNumber
            }
            setFinalOrder(filledState)
        }

        if (orderChosen && orderChosen?.addOns?.length > 0) {
            setAddOnHeading(orderChosen?.addOns[0]?.title)
            setAddOnIcon(addOnsMapper[orderChosen.addOns[0]?.title])
            setAddOnPrice(orderChosen?.addOns[0]?.price)
        }
    }, [orderChosen])

    useEffect(() => {
        if (addressRequired && orderChosen !== undefined) {
            setFinalOrder({ ...finalOrder, county: countiesMapper[orderChosen?.county] })

            setOrderPrice(orderChosen.ttlPrice)
        }
        if (!addressRequired && orderChosen !== undefined) {
            setOrderPrice(orderChosen.ttlPrice)
        }
    }, [addressRequired, orderChosen])

    useEffect(() => {
        if (orderChosen !== undefined) {

            let tracker = {
                'MOBILE DETAILING': false,
                'HEADLIGHTS RESTORATION': false,
                'ENGINE BAY CLEANING': false,
                'INTERIOR FRESHEN': false,
            }
            let mobileDetailingChosen = false
            for (let i = 0; i < orderChosen.addOns.length; i++) {
                let addOn = orderChosen.addOns[i].title
                tracker[addOn] = true
                if (orderChosen.addOns[i].title === 'MOBILE DETAILING') {
                    setAddressRequired(true)
                    mobileDetailingChosen = true
                }
            }
            if (!mobileDetailingChosen) {
                setAddressRequired(false)
            }
        }
    }, [orderChosen])

    return (
        <>
            {orderChosen && orderChosen._id ?
                <div className={`h-full w-full flex flex-col ${reviewHandlingRedux.isReviewing === true ? 'blur-md' : 'blur-0'}`}>
                    <div className="h-[8%] w-full bg-darkBlue bg-opacity-40 flex items-center rounded-tl-lg rounded-tr-lg">
                        <h1 className="h-[80%] w-full text-center text-[20px] md:text-[22px] font-semibold">Manage Orders</h1>
                    </div>
                    {orderChosen && ordersRedux.length > 0 ?
                        <div className="h-[92%] w-full ml-auto mr-auto flex flex-col gap-[2%] md:flex-row items-center md:justify-evenly overflow-y-auto overflow-x-hidden md:pr-[1rem] pb-[1rem] md:pb-[0rem]">
                            <div className="min-h-[10%] md:h-[50vh] w-full md:w-[16%] flex items-center md:flex-col  gap-[10px] px-[10px] py-[6px]  insetShadow2 bg-matteBlack bg-opacity-40 overflow-x-scroll overflow-y-scroll">
                                {ordersRedux && ordersRedux.map((order) => {
                                    return <div key={order.id} className='md:h-[5vh] md:w-[90%] h-full w-[20vw] bg-darkBlue rounded-md flex justify-center items-center cursor-pointer hover:bg-opacity-50' onClick={() => changeOrder(order.id)}>
                                        <h3 className="md:text-[12px] tall:text-[10px] text-[8px] w-full break-words text-center px-[2px]">{`${order.date.dateChosen.localDate} - ${order.date.interval}`}</h3>
                                    </div>
                                })}
                                {orderType === 'Active' &&
                                    <div className='md:h-[5vh] md:w-[90%] h-full w-[20vw] bg-loaderGreen rounded-md flex justify-center items-center cursor-pointer hover:bg-opacity-50 md:text-[12px] tall:text-[12px] text-[10px] text-matteBlack font-semibold text-center insetShadow' onClick={() => navigate('/booking')}>Add New Booking</div>
                                }
                            </div>
                            <div className="md:min-h-[40%] md:max-h-[96%] w-[86%] md:w-[84%] lg:w-[75%] xl:w-[60%] bg-white bg-opacity-75 rounded-lg p-[0.5rem] translate-y-1 overflow-y-scroll">
                                <div className="max-h-[50%] w-full bg-white bg-opacity-75 rounded-lg">

                                    {/* date and vehicle */}
                                    <div className="min-h-[15vh] w-full relative flex justify-between items-center gap-[5%] rounded-tl-lg rounded-tr-lg bg-jetBlack bg-opacity-50 pr-[5px] mt-[1rem]">
                                        <div className="h-[90%] w-[50%] flex justify-center items-center">
                                            <img src={img} alt="" className="h-full object-contain" />
                                        </div>
                                        <div className="h-[84%] md:h-[50%] w-[33%] md:w-[25%] flex flex-col items-center bg-white bg-opacity-75 rounded-lg insetShadow md:absolute top-2 right-2">
                                            <div className="h-[20%] w-full flex justify-center items-center">
                                                <h4 className="h-full text-[12px] tall:text-[13px] md:text-[15px] text-darkBlue font-semibold">{orderChosen && monthMapper[orderChosen?.date?.dateChosen?.localDate.slice(0, 2)]}</h4>
                                            </div>

                                            <div className="h-[55%] w-full flex justify-center items-center text-[22px] md:text-[30px] text-darkBlue font-bold">
                                                {
                                                    orderChosen && orderChosen?.date?.dateChosen.localDate[2] === '/' && orderChosen?.date?.dateChosen.localDate[4] === '/' ? orderChosen?.date?.dateChosen.localDate.slice(3, 4) : orderChosen?.date?.dateChosen.localDate[2] === '/' && orderChosen?.date?.dateChosen.localDate[5] === '/' ?
                                                        orderChosen?.date?.dateChosen.localDate.slice(3, 5) : orderChosen?.date?.dateChosen.localDate[1] === '/' && orderChosen?.date?.dateChosen.localDate[3] === '/' ? orderChosen?.date?.dateChosen.localDate.slice(2, 3) : orderChosen?.date?.dateChosen.localDate.slice(2, 4)}
                                            </div>
                                            <div className="h-[25%] w-full flex justify-center items-start">
                                                <h4 className="h-[80%] text-[12px] tall:text-[13px] md:text-[15px] text-darkBlue font-semibold">{orderChosen && orderChosen?.date?.interval}</h4>
                                            </div>
                                        </div>

                                    </div>
                                    {/* package and addons */}
                                    <div className="min-h-[20%] w-full flex gap-[0.5rem] p-[0.5rem] insetShadow2 overflow-y-hidden bg-white">
                                        {/* package */}
                                        <div className="h-full w-1/3 flex flex-col bg-matteBlack bg-opacity-30 rounded-md">
                                            <div className="h-[20%] w-full flex justify-center items-center">
                                                <h3 className="h-[80%] w-full text-center text-[10px] tall:text-[12px] md:text-[15px] font-semibold text-matteBlack">{orderChosen && orderChosen?.packageChosen?.title} </h3>
                                            </div>
                                            <div className="h-[80%] w-full relative flex flex-col items-end gap-[1px] overflow-y-scroll ">
                                                <h3 className="min-h-[25%] tall:min-h-[25%] md:min-h-[25%] w-full text-center text-[12px] tall:text-[14px] md:text-[16px] bg-jetBlack text-darkBlue font-semibold bg-opacity-30">{orderChosen && orderChosen.packageChosen.price}</h3>
                                                {orderChosen && orderChosen?.packageChosen?.checklist.map((item) => {
                                                    return <h3 key={item.service} className="min-h-[45%] tall:min-h-[35%] md:min-h-[25%] w-full text-center text-[10px] tall:text-[12px] md:text-[14px]  font-thin bg-jetBlack text-matteBlack bg-opacity-30">{item.service} </h3>
                                                })}
                                            </div>
                                        </div>
                                        {/* addOns */}
                                        <div className="min-h-full w-2/3 flex flex-col items-center bg-matteBlack bg-opacity-30 rounded-md overflow-x-hidden">
                                            <div className="h-[20%] w-full flex justify-between items-center pr-[4px]">
                                                <h3 className="h-[80%] w-full text-center text-[12px] md:text-[15px] tall:text-[15px] font-semibold text-matteBlack">Your Add Ons - <span className="text-darkBlue font-bold">{orderChosen && orderChosen?.addOns?.length}</span></h3>

                                            </div>

                                            <div className="h-[85%] w-full flex justify-evenly items-center py-[4px]">
                                                <div className="h-full w-[15%] flex justify-center items-center">
                                                    {orderChosen && orderChosen?.addOns?.length > 0 &&
                                                        <AiFillLeftCircle className={`${orderChosen && orderChosen.addOns.length === 1 || orderChosen && addOnsSliderCounter === 0 ? 'hidden' : ''} text-matteBlack cursor-pointer text-[24px] md:text-[30px]`} onClick={() => prevSlide()} />
                                                    }
                                                </div>
                                                <div className="h-[70%] md:h-full w-[60%] md:w-[50%] flex flex-col bg-jetBlack bg-opacity-30 rounded-sm">
                                                    {orderChosen && orderChosen?.addOns?.length === 0 ? <h2 className="h-[90%] w-full text-center text-[12px] md:text-[16px] tall:text-[14px] text-matteBlack">No Add Ons Selected</h2>
                                                        : <>
                                                            <div className="h-[40%] w-full flex items-center">
                                                                <h2 className="h-[90%] w-full text-center text-[12px] md:text-[16px] tall:text-[14px] text-matteBlack">{addOnHeading}</h2>
                                                            </div>
                                                            <div className="h-[60%] w-full flex items-center tall:items-start tall:pt-[10px] justify-evenly">
                                                                {addOnIcon}
                                                                <h3 className="text-darkBlue font-semibold text-[12px] md:text-[19px]">+{addOnPrice}</h3>
                                                            </div>
                                                        </>}
                                                </div>
                                                <div className="h-full w-[15%] flex justify-center items-center">
                                                    {orderChosen && orderChosen?.addOns?.length > 0 &&
                                                        <AiFillRightCircle className={`${orderChosen && orderChosen?.addOns?.length - 1 === addOnsSliderCounter || orderChosen && orderChosen.addOns.length === 1 ? 'hidden' : ''} text-matteBlack text-[24px] md:text-[30px] cursor-pointer`} onClick={() => nextSlide()} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* form */}
                                    <div className="h-[70%] w-full flex flex-col items-center bg-jetBlack bg-opacity-50 pb-[8px] px-[8px] overflow-y-scroll">
                                        <div className="h-[90%] w-full flex flex-col items-center pt-[10px] rounded-md bg-white bg-opacity-70 insetShadow mt-[3%]">
                                            {addressRequired && <>
                                                <div className="min-h-[3vh] w-[90%] bg-jetBlack bg-opacity-30">
                                                    <select className="w-full text-matteBlack text-[12px] tall:text-[14px] font-thin text-center" placeholder="Houston Area" disabled>
                                                        <option hidden name='10' value={10} className="w-full bg-matteBlack bg-opacity-40 text-[13px] text-brightRed" >
                                                            {county}
                                                        </option>

                                                    </select>
                                                </div>

                                                <div className="min-h-[4vh] w-full flex justify-center gap-[3%] items-end">
                                                    <h5 className="text-[10px] tall:text-[12px] text-matteBlack">MOBILE DETAILING:</h5>
                                                    <h5 className="text-[10px] tall:text-[12px] font-semibold text-brightRed">ADDRESS REQUIRED</h5>
                                                </div>
                                                <div className="min-h-[10%] w-full flex justify-center items-start">
                                                    <input name='address' value={address} type="text" className="min-h-[4vh] w-[90%] md:w-[70%] lg:w-[50%] bg-jetBlack bg-opacity-40 text-[13px] font-semibold text-matteBlack outline-none text-center rounded-md" placeholder="123 Greenbriar Dr 77083 Apt 526" onChange={(e) => setFinalOrder({ ...finalOrder, address: e.target.value })} />
                                                </div>
                                            </>}
                                            <div className={`${!addressRequired ? 'min-h-[50vh] md:h-[40vh] lg:h-[30vh] lg:min-h-[90%]' : 'min-h-[50vh] mt-[1rem]'} overflow-y-scroll w-full relative flex flex-col items-center bg-white bg-opacity-20`}>
                                                <div className="min-h-[5vh] w-full flex items-center">
                                                    <h2 className="h-[70%] w-[90%] text-center font-bold tall:text-[17px] text-matteBlack">{editOrder ? 'EDIT PERSONAL INFORMATION' : 'VIEW PERSONAL INFORMATION'}
                                                    </h2>
                                                    {editOrder ? <MdCancel className="text-brightRed cursor-pointer text-[20px]" onClick={() => setEditOrder((prev) => !prev)} /> :
                                                        <FaEdit className="text-brightRed cursor-pointer text-[20px]" onClick={() => setEditOrder((prev) => !prev)} />
                                                    }

                                                </div>
                                                <div className="min-h-[8vh] tall:min-h-[6vh] md:h-[5vh] w-[90%] flex items-start justify-center gap-[5%]">
                                                    <div className="h-full w-1/2 flex flex-col items-center">
                                                        <label htmlFor="view-name" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center text-matteBlack">Name</label>
                                                        <input id="view-name" name="name" value={name} type="text" placeholder="John Gonzalez" className="h-[3vh] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required readOnly={!editOrder} onChange={(e) => setFinalOrder({ ...finalOrder, name: e.target.value })} />
                                                    </div>
                                                    <div className="h-full w-1/2 flex flex-col items-center">
                                                        <label htmlFor="view-phone" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center text-matteBlack">Phone #</label>
                                                        <input id="view-phone" name="phone" value={phone} type="text" placeholder="873-827-9012" className="h-[3vh] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required readOnly={!editOrder} onChange={(e) => setFinalOrder({ ...finalOrder, phone: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="min-h-[8vh] tall:min-h-[6vh] md:h-[5vh] w-[90%] flex items-start justify-center gap-[5%]">
                                                    <div className="h-full w-1/2 flex flex-col items-center">
                                                        <label htmlFor="view-email" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center text-matteBlack">Email</label>
                                                        <input id="view-email" name="email" value={email} type="text" placeholder="jGonzalez@gmail.com" className="h-[3vh] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required readOnly={!editOrder} onChange={(e) => setFinalOrder({ ...finalOrder, email: e.target.value })} />
                                                    </div>
                                                    <div className="h-full w-1/2 flex flex-col items-center">
                                                        <label htmlFor="view-vehicleMake" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center text-matteBlack">Vehicle Make</label>
                                                        <input id="view-vehicleMake" name="vehicleMake" value={vehicleMake} type="text" placeholder="Toyota" className="h-[3vh] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required readOnly={!editOrder} onChange={(e) => setFinalOrder({ ...finalOrder, vehicleMake: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="min-h-[8vh] tall:min-h-[6vh] md:h-[5vh] w-[90%] flex items-start justify-center gap-[5%]">
                                                    <div className="h-full w-1/2 flex flex-col items-center">
                                                        <label htmlFor="view-vehicleModel" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center text-matteBlack">Vehicle Model</label>
                                                        <input id="view-vehicleModel" name="vehicleModel" value={vehicleModel} type="text" placeholder="Camry" className="h-[3vh] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required readOnly={!editOrder} onChange={(e) => setFinalOrder({ ...finalOrder, vehicleModel: e.target.value })} />
                                                    </div>
                                                    <div className="h-full w-1/2 flex flex-col items-center">
                                                        <label htmlFor="view-plateNumber" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center text-matteBlack">Plate Number</label>
                                                        <input id="view-plateNumber" name="plateNumber" value={plateNumber} type="text" placeholder="4CB69S" className="h-[3vh] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required readOnly={!editOrder} onChange={(e) => setFinalOrder({ ...finalOrder, plateNumber: e.target.value })} />
                                                    </div>
                                                </div>
                                                {editOrder ?
                                                    <div className="min-h-[12vh] tall:min-h-[5vh] md:h-[5vh] w-[90%] flex items-center justify-center gap-[5%]">
                                                        <div className="h-full w-1/2 flex items-center justify-center gap-[20%]">
                                                            {!confirmEdit && !confirmCancel ?
                                                                <button className="h-[5vh] min-w-[90%] md:min-w-[70%] bg-darkBlue rounded-md insetShadow text-white font-semibold text-[12px] md:text-[16px] cursor-pointer p-[1px]" onClick={() => setConfirmEdit(true)} >Edit Booking</button>
                                                                : confirmEdit && !confirmCancel ? <>
                                                                    <button className="h-[5vh] min-w-[90%] md:min-w-[70%] bg-loaderGreen rounded-md insetShadow text-white font-semibold text-[12px] md:text-[16px] cursor-pointer p-[1px]" onClick={() => editOrderDetails()} >Confirm Edit</button><button className="h-[5vh] min-w-[90%] md:min-w-[70%] bg-brightRed rounded-md insetShadow text-white font-semibold text-[12px] md:text-[16px] cursor-pointer p-[1px]" onClick={() => setConfirmEdit(false)} >Cancel Edit</button>
                                                                </> : ''}
                                                            {!confirmEdit && !confirmCancel ?
                                                                <button className="h-[5vh] min-w-[90%] md:min-w-[70%] bg-brightRed rounded-md insetShadow text-white font-semibold text-[12px] md:text-[16px] cursor-pointer p-[1px]" onClick={() => setConfirmCancel(true)}>Cancel Booking</button>
                                                                : !confirmEdit && confirmCancel ? <>
                                                                    <button className="h-[5vh] min-w-[90%] md:min-w-[70%] bg-brightRed rounded-md insetShadow text-white font-semibold text-[14px] cursor-pointer p-[1px]" onClick={() => deleteOrder()}>Cancel Booking</button><button className="h-[5vh] min-w-[90%] md:min-w-[70%] bg-darkBlue rounded-md insetShadow text-white font-semibold text-[14px] cursor-pointer p-[1px]" onClick={() => setConfirmCancel(false)} >Go Back</button>
                                                                </> : ''}
                                                        </div>
                                                    </div>
                                                    : ''}
                                                <div className="min-h-[8vh] w-full flex flex-col items-center">
                                                    <h3 className="text-[16px] text-matteBlack">Order Price: <span className="text-darkBlue font-semibold">{orderPrice}</span></h3>
                                                    <h5 className="min-h-[40%] w-full text-matteBlack text-center text-[12px]">**All payments made in person until stripe integration**</h5>
                                                    {orderType === 'Archive' &&
                                                        <button className="h-[5vh] w-[60%] deskSm:h-[4vh] deskSm:w-[20%] bg-darkBlue bg-opacity-30 hover:bg-opacity-90 mt-[1rem] rounded-md text-matteBlack text-[14px] font-semibold"
                                                            onClick={() => dispatch(SET_REVIEW_HANDLING({ isReviewing: true, orderReviewing: orderChosen, orderReview: {} }))}
                                                        >Leave A Review</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className="h-[92%] w-full ml-auto mr-auto flex flex-col items-center justify-evenly ">
                            <h2 className="text-[20px]">No Orders Booked</h2>
                            <button className="h-[10%] w-[70%] md:w-[50%] lg:w-[36%] bg-darkBlue rounded-lg insetShadow hover:bg-opacity-50" onClick={() => navigate('/booking')}>Book Now</button>
                            <img src={emptyOrder} alt="" className="aspect-square h-[60%]" /></div>}
                </div>
                : <div className="h-[92%] w-full ml-auto mr-auto flex flex-col items-center justify-evenly ">
                    <h2 className="text-[20px]">No Orders Booked</h2>
                    <button className="h-[10%] w-[70%] md:w-[50%] lg:w-[36%] bg-darkBlue rounded-lg insetShadow hover:bg-opacity-50" onClick={() => navigate('/booking')}>Book Now</button>
                    <img src={emptyOrder} alt="" className="aspect-square h-[60%]" /></div>}
        </>
    )
}

AccountOrders.propTypes = {
    orderType: PropTypes.string,
    orderData: PropTypes.array
}

export default AccountOrders