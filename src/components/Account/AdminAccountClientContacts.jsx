import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ERROR_MSG } from '../../redux/features/auth/authSlice'
import { SET_INIT_CLIENT_CONTACTS, selectClientContacts, selectQtyClientUpdates, selectQtyNewClients } from '../../redux/features/contacts/contactsSlice'
import { getSingleCustomerOrder } from '../../services/orderService'
import { acknowledgeContactUpdates, initContactsInfo } from '../../services/contactsService'
import { getClientEmailVerificationFromDb } from '../../services/authService'
import { monthMapper } from '../../data/staticObjects'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { TbArrowBackUp } from 'react-icons/tb'
import sedan from '../../assets/sedan6.png'
import suv from '../../assets/suv.png'
import pickupTruck from '../../assets/pickupTruck.png'
import exotic from '../../assets/exotic.png'


const initialSearchState = {
    userSearchTerm: ''
}
const AdminAccountClientContacts = () => {
    const dispatch = useDispatch()

    const clientContactsRedux = useSelector(selectClientContacts)
    const qtyNewClientsRedux = useSelector(selectQtyNewClients)
    const qtyClientUpdatesRedux = useSelector(selectQtyClientUpdates)

    const [chosenContact, setChosenContact] = useState(undefined)
    const [chosenOrder, setChosenOrder] = useState(undefined)
    const [img, setImg] = useState(undefined)
    const [orderCounter, setOrderCounter] = useState(undefined)
    const [allOrdersId, setAllOrdersId] = useState(undefined)
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [searchTerm, setSearchTerm] = useState(initialSearchState)
    const { userSearchTerm } = searchTerm
    const [searchResults, setSearchResults] = useState(undefined)
    const [clientEmailVerified, setClientEmailVerified] = useState(false)

    const goBackToAllContactsView = () => {
        setChosenContact(undefined)
        setChosenOrder(undefined)
        setImg(undefined)
    }

    const showSingleUserOrder = async (id) => {
        const orderData = { orderId: id }

        try {
            const res = await getSingleCustomerOrder(orderData)

            if (res) {
                setChosenOrder(res)
                if (res.vehicle === 'SEDAN') {
                    setImg(sedan)
                }
                if (res.vehicle === 'SUV') {
                    setImg(suv)
                }
                if (res.vehicle === 'PICKUP') {
                    setImg(pickupTruck)
                }
                if (res.vehicle === 'HIGH-END') {
                    setImg(exotic)
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

        setTimeout(() => {
        }, 2000)
    }

    const showNextOrder = () => {
        let next;
        if (orderCounter === undefined) {
            next = 0
        } else {
            next = orderCounter + 1
        }

        if (next < allOrdersId.length) {
            showSingleUserOrder(allOrdersId[next])
            setOrderCounter(next)
        } else {
            showSingleUserOrder(allOrdersId[0])
            setOrderCounter(0)
        }
    }
    const showPreviousOrder = () => {
        let next;
        if (orderCounter === undefined || orderCounter === 0) {
            next = allOrdersId.length - 1
        } else {
            next = orderCounter - 1
        }

        if (next >= 0) {
            showSingleUserOrder(allOrdersId[next])
            setOrderCounter(next)
        } else {
            showSingleUserOrder(allOrdersId[-1])
            setOrderCounter(allOrdersId.length - 1)
        }
    }

    const initiateContacts = async () => {
        try {
            const res = await initContactsInfo()
            if (res) {
                const allContactsInfo = {
                    clientContacts: res.clientContacts,
                    clientUpdates: res.clientUpdates,
                    newClients: res.newClients,
                    qtyClientUpdates: res.qtyClientUpdates,
                    qtyNewClients: res.qtyNewClients,
                }
                dispatch(SET_INIT_CLIENT_CONTACTS(allContactsInfo))
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

    const searchClients = () => {
        const filteredClients = clientContactsRedux.filter((contact) => {
            if (contact.name.toLowerCase().includes(searchTerm.userSearchTerm.toLowerCase())) {
                return contact
            }

        })

        if (filteredClients.length > 0) {
            setSearchResults(filteredClients)
        } else {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'No client found with search term!' }))
        }
    }

    const toggleSearchBar = () => {
        setShowSearchBar((prev) => !prev)
        setSearchResults(undefined)
    }

    const acknowledgeUpdates = async () => {
        try {
            const res = await acknowledgeContactUpdates()
            if (res) {
                const allContactsInfo = {
                    clientContacts: res.clientContacts,
                    clientUpdates: res.clientUpdates,
                    newClients: res.newClients,
                    qtyClientUpdates: res.qtyClientUpdates,
                    qtyNewClients: res.qtyNewClients,
                }
                dispatch(SET_INIT_CLIENT_CONTACTS(allContactsInfo))
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

    const getClientEmailVerificationStatus = async () => {
        const emailData = {
            email: chosenContact.email
        }

        try {
            const res = await getClientEmailVerificationFromDb(emailData)

            if (res) {
                setClientEmailVerified(res)
            }
        } catch (error) {
            setClientEmailVerified(false)
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
        if (chosenContact && chosenContact.name !== '') {
            getClientEmailVerificationStatus()
        }
    }, [chosenContact])

    useEffect(() => {
        if (chosenContact) {
            const ordersArr = []

            for (let i = 0; i < chosenContact.activeOrders.length; i++) {
                if (chosenContact.activeOrders[i]) {
                    ordersArr.push(chosenContact.activeOrders[i])
                }
            }
            for (let i = 0; i < chosenContact.archivedOrders.length; i++) {
                if (chosenContact.archivedOrders[i]) {
                    ordersArr.push(chosenContact.archivedOrders[i])
                }
            }

            setAllOrdersId(ordersArr)
        }
    }, [chosenContact])

    useEffect(() => {
        initiateContacts()
    }, [])

    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-[8%] w-full bg-darkBlue bg-opacity-40 flex items-center rounded-tl-lg rounded-tr-lg">
                <h1 className="h-[80%] w-full text-center text-[20px] md:text-[22px] font-semibold">Client Contacts</h1>
            </div>
            <div className="h-[10%] w-full bg-matteBlack flex justify-start items-center">
                {!showSearchBar ?
                    // default quick view of new clients/orders
                    <div className='h-full w-3/5 flex justify-evenly items-center gap-[2%] p-[5px]'>
                        <button className='text-[12px] md:text-[14px] h-full w-full rounded-md' ><span className='h-[90%] w-[10%] text-[14px] md:text-[16px] text-darkBlue font-bold pr-[8px]'>{qtyNewClientsRedux}</span>New Clients</button>
                        <button className='text-[12px] md:text-[14px] h-full w-full rounded-md' ><span className='h-[90%] w-[10%] text-[14px] md:text-[16px] text-loaderGreen font-bold pr-[8px]'>{qtyClientUpdatesRedux}</span>New Orders</button>
                        {qtyNewClientsRedux > 0 && qtyClientUpdatesRedux > 0 &&
                            <button className='text-[11px] md:text-[13px] h-[80%] md:h-[50%] bg-darkBlue text-matteBlack font-semibold w-[80%] rounded-md px-[2px] insetShadow hover:bg-opacity-30 hover:text-highLightBlue' onClick={() => acknowledgeUpdates()}>Acknowledge</button>
                        }
                    </div>
                    // search bar
                    : <div className='h-full w-3/5 flex justify-evenly items-center gap-[2%] p-[5px]'>
                        <input type="search" name='userSearchTerm' value={userSearchTerm} className='outline-none h-[3vh] w-[70%] md:w-[60%] bg-white bg-opacity-80 rounded-md text-center text-[12px] md:text-[14px] text-matteBlack font-semibold' onChange={(e) => setSearchTerm({ userSearchTerm: e.target.value })} />
                        <button className='text-[11px] md:text-[13px] h-[60%] md:h-[50%] bg-loaderGreen text-matteBlack font-semibold w-[30%] md:w-[20%] rounded-md px-[2px] insetShadow hover:bg-opacity-30 hover:text-green-300' onClick={() => searchClients()}>Search</button>
                    </div>}
                <div className='h-full w-2/5 flex flex-col justify-center items-end pr-[8px]'>
                    <h4 className='h-[30%] w-80%] text-end text-[12px] md:text-[14px] text-loaderGreen brightness-75'>{clientContactsRedux.length} clients total</h4>
                    <button className={`${showSearchBar ? 'bg-brightRed hover:text-red-500' : 'bg-loaderGreen text-green-300'} text-[11px] md:text-[13px] h-[50%] md:h-[44%] text-matteBlack font-semibold w-[60%] md:w-[30%] rounded-md px-[2px] insetShadow hover:bg-opacity-30`} onClick={() => toggleSearchBar()}>{showSearchBar ? 'Cancel' : 'Search'}</button>
                </div>
            </div>
            {chosenContact === undefined ?
                // search results
                <div className='h-[82%] w-full flex flex-col overflow-y-scroll'>
                    {searchResults !== undefined && searchResults.length > 0 ? searchResults.map((contact, i) => {
                        return <div key={contact._id} className={`${i % 2 === 0 ? 'bg-opacity-30' : 'bg-opacity-60'} bg-matteBlack min-h-[7vh] w-full flex items-center justify-evenly text-[8px] tall:text-[9px] md:text-[12px] px-[4px] cursor-pointer hover:bg-opacity-100`} onClick={() => setChosenContact(contact)}>
                            <h3>{contact.name}</h3>
                            <h3>{contact.phone}</h3>
                            <h3>{contact.email}</h3>
                            <h3>{contact.activeOrders.length + contact.archivedOrders.length} total orders</h3>
                        </div>
                    }) : clientContactsRedux && clientContactsRedux.length > 0 ? clientContactsRedux.map((contact, i) => {
                        return <div key={contact._id} className={`${i % 2 === 0 ? 'bg-opacity-30' : 'bg-opacity-60'} bg-matteBlack min-h-[7vh] w-full flex items-center justify-evenly text-[8px] tall:text-[9px] md:text-[12px] px-[4px] cursor-pointer hover:bg-opacity-100`} onClick={() => setChosenContact(contact)}>
                            <h3>{contact.name}</h3>
                            <h3>{contact.phone}</h3>
                            <h3>{contact.email}</h3>
                            <h3>{contact.activeOrders.length + contact.archivedOrders.length} total orders</h3>
                        </div>
                    }) : ''}
                </div>
                : <div className='h-[82%] w-full relative flex flex-col overflow-y-scroll'>
                    {/* view single contact */}
                    <div className='h-[8%] w-full flex justify-evenly items-center'>
                        <TbArrowBackUp className='absolute left-2 text-[24px] tall:text-[26px] deskSm:text-[30px] md:text-[34px] cursor-pointer hover:text-darkGrayBlue' onClick={() => goBackToAllContactsView()} />
                        <h3 className='text-[12px] md:text-[15px] text-loaderGreen'>{chosenContact.activeOrders.length} active order</h3>
                        <h3 className='text-[12px] md:text-[15px] text-darkGrayBlue'>{chosenContact.archivedOrders.length} archived order</h3>
                        <IoArrowForward className='absolute right-2 text-[24px] tall:text-[28px] deskSm:text-[30px] md:text-[34px] cursor-pointer text-white hover:text-darkGrayBlue' onClick={() => showNextOrder()} />
                        <IoArrowBack className='absolute right-10 text-[24px] tall:text-[28px] deskSm:text-[30px] md:text-[34px] cursor-pointer text-white hover:text-darkGrayBlue' onClick={() => showPreviousOrder()} />
                    </div>
                    <div className='h-[30%] w-full flex flex-col gap-[4px] mt-[5%]'>
                        <div className='h-1/3 w-full flex items-center justify-evenly text-[10px] md:text-[14px]'>
                            <h4>{chosenContact.name}</h4>
                            <h4>{chosenContact.email} <span className={`min-h-[1%] min-w-[2%] rounded-full ${clientEmailVerified ? 'bg-loaderGreen text-loaderGreen' : 'bg-brightRed text-brightRed brightness-150'}`}>he</span></h4>
                            <h4>{chosenContact.phone}</h4>
                        </div>
                        <div className='h-[5vh] w-full relative flex flex-col items-center text-[10px] text-loaderGreen overflow-y-scroll md:text-[14px]'>
                            <h5 className='h-[2px] w-full text-start sticky top-1 pl-[4px] text-loaderGreen'>Active</h5>
                            {chosenContact.activeOrders.length > 0 ? chosenContact.activeOrders.map((order, i) => {
                                if (order) {
                                    return <div key={order} className={`${i % 2 === 0 ? 'bg-opacity-30' : 'bg-opacity-60'} min-h-[5vh] text-loaderGreen bg-matteBlack w-full flex justify-center items-center cursor-pointer`} onClick={() => showSingleUserOrder(order)}>{`${i + 1} : `}{order}</div>
                                }
                            }) : <div className='min-h-full w-full flex justify-center items-center'>No Active Orders</div>}

                        </div>
                        <div className='h-[5vh] w-full relative flex flex-col items-center text-[10px] text-darkGrayBlue overflow-y-scroll md:text-[14px]'>
                            <h5 className='h-[2px] w-full text-start sticky top-1 pl-[4px] text-darkGrayBlue'>Archived</h5>
                            {chosenContact.archivedOrders.length > 0 ? chosenContact.archivedOrders.map((order, i) => {
                                if (order) {
                                    return <div key={order} className={`${i % 2 === 0 ? 'bg-opacity-30' : 'bg-opacity-60'} min-h-[5vh] bg-matteBlack text-darkGrayBlue w-full flex justify-center items-center cursor-pointer`} onClick={() => showSingleUserOrder(order)}>{`${i + 1} : `}{order}</div>
                                }
                            }) : <div className='min-h-full w-full flex justify-center items-center'>No Archived Orders</div>}
                        </div>
                    </div>
                    <div className='h-[62%] w-full flex flex-col items-center'>
                        {chosenOrder === undefined ? <div className='h-full w-full flex justify-center text-center items-center'>Please Scroll Through and Choose Order ID for Viewing</div> : <div className='h-full w-full flex flex-col'>
                            <div className='h-[30%] w-full flex items-center justify-evenly'>
                                <div className="h-[90%] w-[30%] flex justify-center items-center">
                                    <img src={img} alt="" className="h-full object-contain" />
                                </div>

                                <div className="h-[80%] w-[33%] md:w-[25%] flex flex-col items-center gap-[2px] bg-white bg-opacity-75 rounded-lg insetShadow ">
                                    <div className="h-[20%] w-full flex justify-center items-center">
                                        <h4 className="h-full text-[12px] tall:text-[13px] md:text-[15px] text-darkBlue font-semibold">{chosenOrder && monthMapper[chosenOrder?.date?.dateChosen?.localDate.slice(0, 2)]}</h4>
                                    </div>
                                    <div className="h-[30%] w-full flex justify-center items-start tall:items-center text-[22px] md:text-[30px] text-darkBlue font-bold">
                                        <h4 className="h-[80%]  text-darkBlue font-semibold">{
                                            chosenOrder && chosenOrder?.date?.dateChosen.localDate[2] === '/' && chosenOrder?.date?.dateChosen.localDate[4] === '/' ? chosenOrder?.date?.dateChosen.localDate.slice(3, 4) : chosenOrder?.date?.dateChosen.localDate[2] === '/' && chosenOrder?.date?.dateChosen.localDate[5] === '/' ?
                                                chosenOrder?.date?.dateChosen.localDate.slice(3, 5) : chosenOrder?.date?.dateChosen.localDate[1] === '/' && chosenOrder?.date?.dateChosen.localDate[3] === '/' ? chosenOrder?.date?.dateChosen.localDate.slice(2, 3) : chosenOrder?.date?.dateChosen.localDate.slice(2, 4)}</h4>
                                    </div>
                                    <div className="h-[50%] w-full flex justify-center items-end">
                                        <h4 className="h-[60%] text-[12px] tall:text-[13px] md:text-[15px] text-darkBlue font-semibold">{chosenOrder && chosenOrder?.date?.interval}</h4>
                                    </div>
                                </div>

                                <div className='h-[90%] w-1/3 flex flex-col items-center bg-matteBlack bg-opacity-30 rounded-md'>
                                    <h4 className='text-[10px] md:text-[14px]'>{chosenOrder.packageChosen.title}</h4>
                                    <h4 className='text-[10px] md:text-[14px]'>${chosenOrder.ttlPrice}</h4>
                                    <h4 className='text-[10px] md:text-[14px]'>{chosenOrder.addOns.length} add-ons</h4>
                                    <h4 className={`${chosenOrder.completed ? 'text-brightRed' : 'text-loaderGreen'} text-[10px] md:text-[14px]`}>{chosenOrder.completed ? 'Completed' : 'Active'}</h4>
                                </div>
                            </div>
                            <div className='h-[60%] w-full flex flex-col gap-[3%] py-[1%]'>
                                <div className='h-[30%] w-full flex justify-evenly items-center gap-[2px] px-[2px]'>
                                    {chosenOrder.addOns.length > 0 &&
                                        <div className='h-full w-1/6 text-[8px] md:text-[11px] bg-darkBlue bg-opacity-30 flex justify-center items-center text-center rounded-sm'>Add-Ons</div>
                                    }
                                    {chosenOrder.addOns.length > 0 ? chosenOrder.addOns.map((addOn) => {
                                        return <div key={addOn.title} className='h-full w-1/6 text-[8px] md:text-[11px] bg-matteBlack bg-opacity-30 flex justify-center items-center text-center rounded-sm'>{addOn.title}</div>
                                    }) : <div className='h-3/4 w-full flex justify-center items-center text-center text-[10px] md:text-[14px]'>No Add Ons Selected To Show</div>}
                                </div>
                                <div className='h-[70%] w-full flex flex-col'>
                                    <div className='h-[40%] w-full flex justify-evenly items-center gap-[2px] px-[2px]'>
                                        <div className='h-full w-1/6 text-[8px] md:text-[11px] bg-darkBlue bg-opacity-30 flex justify-center items-center text-center rounded-sm'>Vehicle Info</div>
                                        <div className='h-full w-1/6 text-[8px] md:text-[11px] bg-highLightBlue bg-opacity-30 flex justify-center items-center text-center rounded-sm'>{chosenOrder.vehicle}</div>
                                        <div className='h-full w-1/6 text-[8px] md:text-[11px] bg-highLightBlue bg-opacity-30 flex justify-center items-center text-center rounded-sm'>{chosenOrder.vehicleMake}</div>
                                        <div className='h-full w-1/6 text-[8px] md:text-[11px] bg-highLightBlue bg-opacity-30 flex justify-center items-center text-center rounded-sm'>{chosenOrder.vehicleModel}</div>
                                        <div className='h-full w-1/6 text-[8px] md:text-[11px] bg-highLightBlue bg-opacity-30 flex justify-center items-center text-center rounded-sm'>{chosenOrder.plateNumber}</div>
                                    </div>
                                    {chosenOrder.mobileRequired ?
                                        <div className='h-[60%] w-full flex justify-center items-end'>
                                            <div className='h-[40%] w-[80%] flex items-center'>
                                                <div className='h-full w-1/4 text-center flex items-center justify-center text-[12px] md:text-[14px] bg-white bg-opacity-70 text-darkBlue brightness-75 rounded-tl-md rounded-bl-md'>
                                                    <h4 className='h-[60%]'>
                                                        Address
                                                    </h4>
                                                </div>
                                                <div className='h-full w-3/4 pl-[4px] flex items-center justify-start text-[11px] md:text-[13px] bg-matteBlack bg-opacity-70 text-darkBlue brightness-200 rounded-br-md rounded-tr-md'>
                                                    {chosenOrder.address}
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className='h-[60%] w-full flex justify-center text-center items-end text-[12px] md:text-[14px]'>Mobile Detail Not Required For This Order</div>
                                    }
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>}
        </div>
    )
}

export default AdminAccountClientContacts