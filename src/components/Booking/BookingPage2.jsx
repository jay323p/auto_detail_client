import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NavbarModal from '../Navbar/NavbarModal'
import { SET_ERROR_MSG, selectIsLoggedIn, selectShowNavModal } from '../../redux/features/auth/authSlice'
import { SET_ADD_ADD_ONS, SET_ADD_ONS_CHOSEN, SET_VEHICLE_PACKAGE_CHOSEN } from '../../redux/features/account/accountSlice'
import { MdTimer, MdAddCircle } from 'react-icons/md'
import { FaWallet } from 'react-icons/fa'
import { extraPackages } from '../../data/staticArrays'
import { intialChosenPackages } from '../../data/staticObjects'
import droplets from '../../assets/droplets.jpg'

const BookingPage2 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showNavbarModalRedux = useSelector(selectShowNavModal)
    const isLoggedInRedux = useSelector(selectIsLoggedIn)

    const [chosenPackages, setChosenPackages] = useState(intialChosenPackages)
    const [totalPrice, setTotalPrice] = useState(0)
    const [skip, setSkip] = useState(true)

    const cancelVehiclePackage = () => {
        dispatch(SET_VEHICLE_PACKAGE_CHOSEN(false))
    }

    const choosePackage = (i) => {
        const packageBoolean = chosenPackages[i]
        const packagePrice = extraPackages[i].numPrice

        if (packageBoolean) {
            setChosenPackages({ ...chosenPackages, [i]: false })
            setTotalPrice((prev) => prev - packagePrice)
        } else {
            setChosenPackages({ ...chosenPackages, [i]: true })
            setTotalPrice((prev) => prev + packagePrice)
        }
    }


    const checkIfPackagesChosen = useCallback(() => {
        let packagesChosen = false

        for (let i = 0; i < Object.keys(chosenPackages).length; i++) {
            if (chosenPackages[i]) {
                packagesChosen = true
            }
        }
        if (packagesChosen) {
            setSkip(false)
        } else {
            setSkip(true)
        }
    }, [chosenPackages])

    const confirmAddOns = () => {
        let addOnsArray = []

        for (let i = 0; i < Object.keys(chosenPackages).length; i++) {
            let addOnsObj = {
                title: '',
                titleIcon: '',
                price: '',
                numPrice: 0,
            }
            if (chosenPackages[i]) {
                addOnsObj.title = extraPackages[i].title
                addOnsObj.titleIcon = extraPackages[i].titleIcon
                addOnsObj.price = extraPackages[i].price
                addOnsObj.numPrice = extraPackages[i].numPrice

                addOnsArray.push(addOnsObj)
            } else {
                continue
            }
        }
        dispatch(SET_ADD_ADD_ONS(addOnsArray))
        dispatch(SET_ADD_ONS_CHOSEN(true))
    }

    useEffect(() => {
        checkIfPackagesChosen()
    }, [chosenPackages, checkIfPackagesChosen])

    useEffect(() => {
        if (!isLoggedInRedux) {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please create an account or login before continuing!' }))
            return navigate('/authentication')
        }
    }, [isLoggedInRedux])

    return (
        <div className="min-h-[100vh] w-full flex flex-col overflow-y-scroll bg-matteBlack pt-[10vh] montFont"
            style={{ background: `url(${droplets}) center center / cover` }}
        >
            {showNavbarModalRedux ? <NavbarModal /> : <div className='h-full w-full flex flex-col justify-start lg:items-center overflow-y-scroll'>
                <div className='h-[10%] w-full lg:w-[70%] flex flex-col justify-center items-center bg-matteBlack bg-opacity-30'>
                    <h3 className="h-[30%] w-full text-center text-[14px] lg:text-[18px] text-brightRed font-thin">STEP 3</h3>
                    <h1 className="h-[70%] w-full text-center text-[18px] tall:text-[20px] md:text-[24px] lg:text-[26px] text-matteBlack font-bold">CHOOSE ADDITIONAL OPTIONS</h1>
                </div>
                <div className='h-[84%] md:h-[80%] lg:w-[80%] w-full flex flex-col md:grid md:grid-cols-twoCols place-items-center deskSm:items-center gap-[1.5rem] p-[12px] bg-matteBlack overflow-y-scroll '>
                    {extraPackages.map((extraPackage, i) => {
                        return <div key={extraPackage.title} className={`${chosenPackages[i] ? 'bg-white' : undefined} min-h-[40%] md:min-h-[80%] w-full deskSm:w-[82%] md:w-[90%] md:relative flex flex-col insetShadow brightness-125 rounded-md cursor-pointer pt-[1rem] px-[0.5rem]`} onClick={() => choosePackage(i)}>
                            <div className='h-[30%] md:h-[50px] w-full flex justify-center items-center md:items-end gap-[14%]'>
                                {/* <PiVanFill size={'32px'} className='text-darkBlue' /> */}
                                {extraPackage.titleIcon}
                                <h2 className='text-darkBlue text-[17px] tall:text-[18px] font-bold'>{extraPackage.title}</h2>
                            </div>
                            <div className='h-[60%] md:h-[140px] mt-[1.4rem] w-full flex flex-col items-center'>
                                <div className='h-[40%] md:h-[30px] w-full flex justify-center'>
                                    <p className='h-full w-full text-[12px] text-center text-darkBlue font-semibold'>{extraPackage.description}</p>
                                </div>
                                <div className='h-[60%] md:h-[40px] w-full flex justify-evenly items-center md:mt-[1rem]'>
                                    <div className='h-full w-1/2 flex justify-center items-center gap-[5%]'>
                                        <MdTimer className='text-darkBlue text-[40px]' />
                                        <h4 className='w-[80%] deskSm:w-[60%] h-[28px] leading-[28px] text-[15px] md:text-[17px] text-darkBlue md:font-thin'>{extraPackage.time}</h4>
                                    </div>
                                    <div className='h-full w-1/2 flex justify-center items-center gap-[5%]'>
                                        <FaWallet className='text-darkBlue text-[34px]' />
                                        <h4 className='w-[80%] deskSm:w-[60%] h-[28px] leading-[28px] text-[15px] md:text-[17px] text-darkBlue md:font-thin'>{extraPackage.price}</h4>
                                    </div>
                                </div>
                                <div className="h-[10%] w-full flex justify-center items-center md:absolute md:bottom-2 -translate-y-3 md:translate-y-0">
                                    <div className='h-[33%] w-full flex justify-center items-start'>
                                        <MdAddCircle size={'40px'} className='text-darkBlue cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <div className='h-[10%] w-full lg:w-[80%] flex justify-start items-center'>
                    <div className="h-full w-full lg:w-full flex justify-center items-center bg-matteBlack bg-opacity-30  p-[4px] ">
                        <div className='h-[80%] w-1/5 flex justify-center items-center text-darkBlue text-[18px] lg:text-[22px] font-bold bg-matteBlack bg-opacity-90 rounded-md brightness-200'>${totalPrice}</div>
                        <div className='h-full w-3/5 flex justify-end items-center pr-[4px] gap-[5%]'>
                            <button
                                className='h-[80%] w-[70%] md:w-[30%] rounded-lg font-bold text-white cursor-pointer insetShadow bg-brightRed bg-opacity-30 hover:bg-opacity-100' onClick={() => cancelVehiclePackage()}>CANCEL</button>
                            <button
                                className='h-[80%] w-[70%] md:w-[30%] rounded-lg font-bold text-white cursor-pointer insetShadow1 changeBg' onClick={() => confirmAddOns()}>{skip ? 'SKIP' : 'CONTINUE'}</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default BookingPage2