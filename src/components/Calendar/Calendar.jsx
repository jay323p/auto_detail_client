import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CalendarGrid from './CalendarGrid'
import HourlyIntervals from './HourlyIntervals'
import { SET_DATE, SET_DATE_CHOSEN_BOOLEAN } from '../../redux/features/account/accountSlice'
import { selectNextYearDates, selectThisYearDates } from '../../redux/features/calendar/calendarSlice'
import PropTypes from 'prop-types'

const Calendar = ({ calendarType, updateDates }) => {
    const dispatch = useDispatch()

    const thisYearDatesRedux = useSelector(selectThisYearDates)
    const nextYearDatesRedux = useSelector(selectNextYearDates)

    const [focusedMonth, setFocusedMonth] = useState(thisYearDatesRedux[0])
    const [dayIntervals, setDayIntervals] = useState()
    const [thisYearRemainingMonths, setThisYearRemainingMonths] = useState(0)
    const [monthCount, setMonthCount] = useState(0)
    const [dateChosen, setDateChosen] = useState(null)

    const nextMonth = () => {
        if (monthCount < 12) {
            if (monthCount === thisYearRemainingMonths - 1) {
                let next = 0
                setFocusedMonth(nextYearDatesRedux[next])
                setMonthCount((prev) => prev + 1)
            } else if (monthCount < thisYearRemainingMonths) {
                let next = monthCount + 1
                setFocusedMonth(thisYearDatesRedux[next])
                setMonthCount((prev) => prev + 1)
            } else {
                let next = (monthCount + 1) - thisYearRemainingMonths
                setFocusedMonth(nextYearDatesRedux[next])
                setMonthCount((prev) => prev + 1)
            }
        }
    }
    const prevMonth = () => {
        if (monthCount > 0) {
            if (monthCount === thisYearRemainingMonths) {
                let next = thisYearRemainingMonths - 1
                setFocusedMonth(thisYearDatesRedux[next])
                setMonthCount((prev) => prev - 1)
            } else if (monthCount > thisYearRemainingMonths) {
                let next = monthCount - thisYearRemainingMonths - 1
                setFocusedMonth(nextYearDatesRedux[next])
                setMonthCount((prev) => prev - 1)
            } else {
                let next = monthCount - 1
                setFocusedMonth(thisYearDatesRedux[next])
                setMonthCount((prev) => prev - 1)
            }
        }
    }

    const toggleDateChoosing = (cancelDate, date, timeSlots) => {
        if (cancelDate === true) {
            setDateChosen(null)
            setDayIntervals([])
        } else {
            setDateChosen(date)
            setDayIntervals(timeSlots)
        }
    }

    const chooseDate = (interval) => {
        let dateObj = {
            interval,
            dateChosen,
        }
        dispatch(SET_DATE(dateObj))
        dispatch(SET_DATE_CHOSEN_BOOLEAN(true))
    }

    useEffect(() => {
        setThisYearRemainingMonths(thisYearDatesRedux.length)
    }, [thisYearDatesRedux.length, nextYearDatesRedux.length])

    return (
        <div className="h-full w-full flex flex-col items-center p-[1rem] montFont">
            {/* calendar */}
            {dateChosen === null ? <CalendarGrid prevMonth={prevMonth} nextMonth={nextMonth} toggleDateChoosing={toggleDateChoosing} focusedMonth={focusedMonth} calendarType={calendarType} updateDates={updateDates} /> : <HourlyIntervals setDateChosen={setDateChosen} dateChosen={dateChosen} chooseDate={chooseDate} dayIntervals={dayIntervals} />}
        </div>
    )
}

Calendar.propTypes = {
    calendarType: PropTypes.string,
    updateDates: PropTypes.func
}
export default Calendar