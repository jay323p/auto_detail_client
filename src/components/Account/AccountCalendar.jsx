import { useDispatch, useSelector } from "react-redux"
import Calendar from "../Calendar/Calendar"
import { SET_CALENDAR_DATES, selectCalendarId } from "../../redux/features/calendar/calendarSlice"
import { getCalendarDates, initCalendar, updateCalendarStartingDate } from "../../services/calendarService"
import { SET_ERROR_MSG, SET_SUCCESS_MSG } from "../../redux/features/auth/authSlice"
import { useEffect } from "react"
import { selectOrders } from "../../redux/features/account/accountSlice"

const AccountCalendar = () => {
    const dispatch = useDispatch()
    const calendarIdRedux = useSelector(selectCalendarId)
    const ordersRedux = useSelector(selectOrders)

    const updateDates = async () => {
        try {
            const calendarId = {
                id: calendarIdRedux
            }
            const data = await updateCalendarStartingDate(calendarId)

            if (data) {
                dispatch(SET_CALENDAR_DATES({ thisYearDates: data.dates.thisYearOrganized, nextYearDates: data.dates.nextYearOrganized, calendarId: data._id }))
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Update Success: Please only update once a day if needed!' }))
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

    const checkIfCalendarInited = async () => {
        try {
            const res = await getCalendarDates()
            if (res) {
                dispatch(SET_CALENDAR_DATES({ thisYearDates: res.dates.thisYearOrganized, nextYearDates: res.dates.nextYearOrganized, calendarId: res._id }))
            } else {
                try {
                    const newCalendar = await initCalendar()
                    if (newCalendar) {
                        dispatch(SET_CALENDAR_DATES({ thisYearDates: newCalendar.dates.thisYearOrganized, nextYearDates: newCalendar.dates.nextYearOrganized, calendarId: newCalendar._id }))
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
    }

    useEffect(() => {
        if (ordersRedux && ordersRedux.length === 0) {
            checkIfCalendarInited()
        }
    }, [ordersRedux])
    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-[8%] w-full bg-darkBlue bg-opacity-40 flex items-center rounded-tl-lg rounded-tr-lg">
                <h1 className="h-[80%] w-full text-center text-[20px] md:text-[22px] font-semibold">Manage Calendar</h1>
            </div>
            <div className="h-[92%] w-full flex justify-center items-center">
                <Calendar calendarType={'adminCal'} updateDates={updateDates} />
            </div>
        </div>
    )
}

export default AccountCalendar