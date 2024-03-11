import PropTypes from 'prop-types'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdCheck } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ADD_ONS_CHOSEN, SET_DATE_CHOSEN_BOOLEAN, SET_QUICK_BOOK, SET_VEHICLE_PACKAGE_CHOSEN } from '../../redux/features/account/accountSlice'
import { useNavigate } from 'react-router-dom'
import { SET_ERROR_MSG, selectIsLoggedIn } from '../../redux/features/auth/authSlice'

const HomePage4Card = ({ vehicle, options }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedInRedux = useSelector(selectIsLoggedIn)

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
                packageChosen: vehiclePackage.packageChosen
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
    return (
        <div className='h-full w-1/5 flex flex-col greyBorder rounded-xl boxShadow1'>
            <div className='h-[10%] w-full flex justify-center items-end font-semibold text-darkBlue lg:text-[14px]'>
                <h3>{options.title}</h3>
            </div>
            <div className={`h-[20%] w-full flex justify-center items-start font-semibold text-[32px] lg:text-[24px] ${options.price.length > 7 ? 'lg:text-[20px]' : 'lg:text-[24px]'}`}>
                <h3 className='text-center'>{options.price}</h3>
            </div>
            <div className={`${options.checklist && options.checklist.length === 5 ? 'gap-[7%]' : 'gap-[10%]'} h-[40%] w-full flex flex-col items-center justify-end font-thin text-[16px]`}>
                {options.checklist && options.checklist.map((item, i) => {
                    return <div key={`${item}-${i}`} className='h-[15%] lg:h-[25%] w-full flex justify-center items-center'>
                        {item.check ? <MdCheck className='text-green-500' /> : <RxCross2 className='text-red-500' />}
                        <h4 className='lg:text-[12px]'>{item.service}</h4>
                    </div>
                })}

            </div>
            <div className='h-[30%] w-full flex justify-between items-center insetShadow mt-[10px] roundedBtmBorder'>
                <div className='w-1/2 h-full flex justify-start items-center gap-[10px] pl-[10px]'>
                    <AiOutlineClockCircle size={'22px'} className='text-red-500' />
                    <h3 className='font-semibold lg:text-[14px]'>{options.time}</h3>
                </div>
                <div className='w-1/2 h-full flex justify-end items-center pr-[10px]'>
                    <button className='h-[70%] w-[84%] bg-darkBlue rounded-xl text-white font-semibold insetShadow hover:bg-opacity-70' onClick={() => quickBooking({ vehicle, packageChosen: { title: options.title, price: options.price, checklist: options.checklist, } })}>Book Now</button>
                </div>
            </div>
        </div>
    )
}
HomePage4Card.propTypes = {
    options: PropTypes.object,
    vehicle: PropTypes.string

}
export default HomePage4Card