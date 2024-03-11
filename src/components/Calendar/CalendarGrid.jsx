import { useDispatch } from "react-redux";
import { SET_ADD_ONS_CHOSEN, SET_ORDER, SET_VEHICLE_PACKAGE_CHOSEN } from "../../redux/features/account/accountSlice";
import { initialOrderState, monthMapper } from "../../data/staticObjects";
import PropTypes from 'prop-types'
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const CalendarGrid = ({ prevMonth, nextMonth, focusedMonth, toggleDateChoosing, calendarType, updateDates }) => {
    const dispatch = useDispatch()

    const goBack = () => {
        dispatch(SET_ADD_ONS_CHOSEN(false))
    }
    const restart = () => {
        dispatch(SET_ADD_ONS_CHOSEN(false))
        dispatch(SET_VEHICLE_PACKAGE_CHOSEN(false))
        dispatch(SET_ORDER(initialOrderState))
    }
    return (
        <div className='h-[90%] w-[90%] md:w-[80%] lg:w-[60%] flex flex-col bg-darkBlue bg-opacity-90 rounded-sm'>
            <div className='h-[10%] w-full bg-matteBlack bg-opacity-50 flex items-center justify-between'>
                <AiFillCaretLeft size={'32px'} className='text-white cursor-pointer' onClick={() => prevMonth()} />
                <div className='h-full w-[50%] flex items-center justify-center gap-[10%]'>
                    <h2 className='text-[18px] lg:text-[24px] text-white'>{focusedMonth && focusedMonth.length > 0 && monthMapper[focusedMonth[0].localDate.slice(0, 2)]}</h2>
                    <h2 className='text-[18px] lg:text-[24px] text-white'>{focusedMonth && focusedMonth.length > 0 && focusedMonth[0].localDate.slice(-4)}</h2>
                </div>
                <AiFillCaretRight size={'32px'} className='text-white cursor-pointer' onClick={() => nextMonth()} />
            </div>
            <div className='h-[10%] w-full grid grid-cols-calendar place-items-center text-white insetShadow2 text-[16px] lg:text-[22px]'>
                <h2>Sun</h2>
                <h2>Mon</h2>
                <h2>Tue</h2>
                <h2>Wed</h2>
                <h2>Thu</h2>
                <h2>Fri</h2>
                <h2>Sat</h2>
            </div>
            <div className='h-[80%] w-full grid grid-cols-calendar grid-rows-6 gap-[1px] p-[2px] place-items-start items-start justify-center'>
                {focusedMonth && focusedMonth.map((day, i) => {
                    if (i === 0) {
                        let dayNum = day.day
                        let gridClass;
                        if (dayNum === 0) {
                            gridClass = 'col-start-0'
                        } else if (dayNum === 1) {
                            gridClass = 'col-start-2'
                        } else if (dayNum === 2) {
                            gridClass = 'col-start-3'
                        } else if (dayNum === 3) {
                            gridClass = 'col-start-4'
                        } else if (dayNum === 4) {
                            gridClass = 'col-start-5'
                        } else if (dayNum === 5) {
                            gridClass = 'col-start-6'
                        } else if (dayNum === 6) {
                            gridClass = 'col-start-7'
                        }
                        return <>
                            <div key={day.localDate} className={` ${gridClass} h-full w-full flex justify-center items-center hover:bg-black hover:bg-opacity-40 cursor-pointer border-darkBlue border-[1px]`} onClick={() => toggleDateChoosing(false, day, day.timeSlots)} >
                                <h2 className={`text-white font-bold text-[18px] lg:text-[22px] w-full text-center`} key={day.localDate}>{
                                    day.localDate[2] === '/' && day.localDate[4] === '/' ? day.localDate.slice(3, 4) : day.localDate[2] === '/' && day.localDate[5] === '/' ?
                                        day.localDate.slice(3, 5) : day.localDate[1] === '/' && day.localDate[3] === '/' ? day.localDate.slice(2, 3) : day.localDate.slice(2, 4)}</h2>
                            </div>
                        </>
                    }
                    return <>
                        <div key={`${day.localDate}-notFirst`} className={`h-full w-full flex justify-center items-center hover:bg-black hover:bg-opacity-40 cursor-pointer border-darkBlue border-[2px]`}
                            onClick={() => toggleDateChoosing(false, day, day.timeSlots)}
                        >
                            <h2
                                className={`w-full text-center lg:text-[21px]`}
                            >{
                                    day.localDate[2] === '/' && day.localDate[4] === '/' ? day.localDate.slice(3, 4) : day.localDate[2] === '/' && day.localDate[5] === '/' ?
                                        day.localDate.slice(3, 5) : day.localDate[1] === '/' && day.localDate[3] === '/' ? day.localDate.slice(2, 3) : day.localDate.slice(2, 4)}</h2>
                        </div>
                    </>
                })}
            </div>
            <div className="h-[10%] w-full flex justify-center items-center bg-matteBlack bg-opacity-50 gap-[20%]">
                {calendarType !== 'adminCal' ?
                    <>
                        <button className="h-[60%] w-[30%] md:w-[25%] bg-brightRed bg-opacity-80 insetShadow text-[13px] md:text-[15px] rounded-md cursor-pointer text-white hover:bg-opacity-40" onClick={() => goBack()}>Edit Add Ons</button>
                        <button className="h-[60%] w-[30%] md:w-[25%] bg-brightRed bg-opacity-80 insetShadow text-[13px] md:text-[15px] rounded-md cursor-pointer text-white hover:bg-opacity-40" onClick={() => restart()}>Start Over</button>
                    </>
                    : <>
                        <button className="h-[60%] w-[30%] md:w-[25%] bg-loaderGreen bg-opacity-80 insetShadow text-[13px] md:text-[15px] rounded-md cursor-pointer text-white hover:bg-opacity-40" onClick={() => updateDates()}>Update Dates</button>
                        <button className="h-[60%] w-[30%] md:w-[25%] bg-brightRed bg-opacity-80 insetShadow text-[13px] md:text-[15px] rounded-md cursor-pointer text-white hover:bg-opacity-40" onClick={() => restart()}>Mark Holiday</button>
                    </>}
            </div>
        </div>
    )
}

CalendarGrid.propTypes = {
    prevMonth: PropTypes.func,
    nextMonth: PropTypes.func,
    toggleDateChoosing: PropTypes.func,
    focusedMonth: PropTypes.array,
    calendarType: PropTypes.string,
    updateDates: PropTypes.func,
}


export default CalendarGrid