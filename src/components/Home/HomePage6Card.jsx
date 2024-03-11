import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'
import PropTypes from 'prop-types'

const HomePage6Card = ({ quote, image, name, description }) => {
    return (
        <div id='reviewCard' className='h-[60%] w-full flex flex-col items-center'>
            <div className='h-[10%] lg:h-[6%] w-full flex justify-center items-end'>
                <ImQuotesLeft size={'32px'} className='text-brightRed' />
            </div>
            <div className='h-[25%] lg:h-[15%] w-full flex justify-center items-center px-[12px]'>
                <p className='text-center text-[14px] deskSm:text-[16px] md:text-[18px] lg:text-[20px] lg:w-[80%]'>{quote}</p>
            </div>
            <div className='h-[10%] lg:h-[6%] w-full flex justify-center items-start'>
                <ImQuotesRight size={'32px'} className='text-brightRed' />
            </div>
            <div className='h-[50%] lg:h-[73%] w-full flex flex-col items-center justify-center'>
                <div className='h-[40%] w-full flex justify-center items-center'>
                    <img src={image} alt="" className='h-full lg:aspect-square rounded-md lg:rounded-full ' />
                </div>
                <div className='h-[30%] w-full flex flex-col items-center justify-center'>
                    <h4 className='h-[30%] text-brightRed text-[14px] md:text-[18px] lg:text-[20px] font-bold'>{name}</h4>
                    <h5 className='h-[40%] text-white text-[12px] md:text-[14px] lg:text-[15px] font-thin'>{description}</h5>
                </div>
            </div>
        </div>
    )
}

HomePage6Card.propTypes = {
    quote: PropTypes.string,
    image: PropTypes.any,
    name: PropTypes.string,
    description: PropTypes.string,
}
export default HomePage6Card