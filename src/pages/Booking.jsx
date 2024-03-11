import Navbar from "../components/Navbar/Navbar"
import BookingPage1 from "../components/Booking/BookingPage1"
import SuccessAlert from '../components/Alerts/SuccessAlert'
import ErrorAlert from '../components/Alerts/ErrorAlert'
import { useDispatch, useSelector } from "react-redux"
import { SET_ERROR_MSG, selectIsLoggedIn, selectShowNavModal } from "../redux/features/auth/authSlice"
import { useEffect } from "react"
import { getCalendarDates } from "../services/calendarService"
import { SET_CALENDAR_DATES } from "../redux/features/calendar/calendarSlice"
import NavbarModal from "../components/Navbar/NavbarModal"
const Booking = () => {
    const dispatch = useDispatch()

    const isLoggedInRedux = useSelector(selectIsLoggedIn)
    const showNavbarModalRedux = useSelector(selectShowNavModal)

    const getBookingDates = async () => {
        try {
            const data = await getCalendarDates()
            if (data) {
                // dispatch if empty
                console.log(data)
                const thisYearDates = data.dates.thisYearOrganized
                const nextYearDates = data.dates.nextYearOrganized
                const calendarId = data._id
                dispatch(SET_CALENDAR_DATES({ thisYearDates, nextYearDates, calendarId }))
            }
        } catch (error) {
            console.log(error)
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
        if (isLoggedInRedux) {
            getBookingDates()
        }
    }, [isLoggedInRedux])
    return (
        <div className="h-[100vh] w-full flex flex-col overflow-y-scroll"
        >
            <SuccessAlert />
            <ErrorAlert />
            <Navbar />
            {showNavbarModalRedux ? <NavbarModal /> :
                <BookingPage1 />
            }
        </div>
    )
}

export default Booking