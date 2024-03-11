import Spinner1 from '../Loaders/Spinner1'
import { weekMapper } from '../../data/staticObjects'
import PropTypes from 'prop-types'
import { TiArrowBack } from 'react-icons/ti'

const HourlyIntervals = ({ setDateChosen, dateChosen, chooseDate, dayIntervals, isLoading }) => {
    return (
        <div className={`${isLoading ? 'cursor-progress' : ''} h-[90%] w-[90%] md:w-[80%] lg:w-[60%] flex flex-col bg-darkBlue bg-opacity-90 rounded-sm`}>
            {isLoading ? <Spinner1 /> :
                <>

                    <div className='h-[10%] w-full p-[4px] bg-darkBlue'>
                        <div className='h-full w-full bg-matteBlack bg-opacity-50 relative flex items-center justify-center insetShadow'>
                            <TiArrowBack size={'32px'} className='text-white cursor-pointer absolute left-1' onClick={() => setDateChosen(null)} />
                            <div className='h-full w-[50%] flex items-center justify-center gap-[5%]'>
                                <h2 className='text-[18px] lg:text-[22px] text-white'>{dateChosen !== null && weekMapper[dateChosen.day]}</h2>
                                <h2 className='text-[18px] lg:text-[22px] text-white'>{dateChosen !== null && dateChosen.localDate}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='h-[90%] w-full flex'>
                        <div className='h-full w-[18%] p-[4px] bg-opacity-50 insetShadow2 flex flex-col justify-evenly items-center'>
                            {dayIntervals && dayIntervals.map((interval) => {
                                return <div key={interval.time} className='h-[7.6%] w-full text-[12px] lg:text-[15px] flex justify-center items-center insetShadow text-white' >{interval.time}</div>
                            })}
                        </div>
                        <div className='h-full w-[88%] flex flex-col justify-evenly items-center p-[4px] insetShadow2 gap-[1px]'>
                            {dayIntervals.map((interval) => {
                                return <button key={`${interval.time}-booking`} className={`${!interval.reserved ? 'cursor-pointer shadowHover bg-opacity-30' : 'bg-opacity-90'} h-[7.6%] w-full text-[12px] lg:text-[14px] flex justify-center items-center bg-matteBlack  text-white `} onClick={() => chooseDate(interval.time)} disabled={interval.reserved} >{interval.reserved ? 'Unavailable' : 'Reserve Now'}</button>
                            })}
                        </div>
                    </div>
                </>}
        </div>
    )
}

HourlyIntervals.propTypes = {
    setDateChosen: PropTypes.func,
    dateChosen: PropTypes.any,
    chooseDate: PropTypes.func,
    dayIntervals: PropTypes.array,
    isLoading: PropTypes.bool,
}

export default HourlyIntervals