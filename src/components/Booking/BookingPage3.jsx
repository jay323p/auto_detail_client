import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Calendar from "../Calendar/Calendar"
import InformationForm from "../InformationForm/InformationForm"
import { selectDateChosen } from "../../redux/features/account/accountSlice"
import { SET_ERROR_MSG, selectIsLoggedIn } from "../../redux/features/auth/authSlice"
import carbonFiber from '../../assets/carbonFiber.jpeg'

const BookingPage3 = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const dateChosenRedux = useSelector(selectDateChosen)
    const isLoggedInRedux = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (!isLoggedInRedux) {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please create an account or login before continuing!' }))
            navigate('/authentication')
        }
    }, [isLoggedInRedux])

    return (
        <div
            className="min-h-[100vh] w-full overflow-y-scroll bg-matteBlack pt-[10vh] montFont"
        >
            <div className="h-full w-full flex flex-col"
                style={{ background: `url(${carbonFiber}) center center / cover` }}
            >
                {!dateChosenRedux ?
                    <>
                        <div className="h-[10%] w-full flex flex-col items-center justify-center gap-[20%] insetShadow bg-matteBlack bg-opacity-50 p-[4px]">
                            <h3 className="h-[30%] w-full text-center text-[16px] lg:text-[18px] text-brightRed font-thin">STEP 4</h3>
                            <h1 className="h-[30%] w-full text-center text-[22px] md:text-[24px] lg:text-[26px] text-white font-bold">CHOOSE APPOINTMENT DATE</h1>
                        </div>
                        <div className="h-[90%] w-full flex justify-center">
                            <Calendar />
                        </div>
                    </>
                    : <InformationForm />}
            </div>
        </div>
    )
}

export default BookingPage3
