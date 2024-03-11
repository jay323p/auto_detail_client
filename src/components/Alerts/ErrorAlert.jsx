import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ERROR_MSG, selectErrorMsg, selectShowErrMsg } from '../../redux/features/auth/authSlice'

const ErrorAlert = () => {
    const dispatch = useDispatch()

    const showErrMsgRedux = useSelector(selectShowErrMsg)
    const errorMsgRedux = useSelector(selectErrorMsg)

    useEffect(() => {
        if (showErrMsgRedux) {
            setTimeout(() => {
                dispatch(SET_ERROR_MSG({ showErrMsg: false, errorMsg: '' }))
            }, 5000)
        }
    })
    return (
        <div className={`${showErrMsgRedux ? 'slideCardFromLeft' : 'slideCardReverse hidden'} h-[100px] md:h-[200px] w-[200px] md:w-[300px] absolute bottom-3 left-[50%] translate-x-[-50%] md:top-3 md:left-3 md:translate-x-0 flex justify-center items-center bg-brightRed text-white text-[13px] z-[100] rounded-lg text-center`}>
            <div className='absolute top-2 right-2 montFont'>
                <ImCross className='text-matteBlack cursor-pointer' onClick={() => dispatch(SET_ERROR_MSG({ showErrMsg: false, errorMsg: '' }))} />
            </div>
            {typeof errorMsgRedux === 'string' ? errorMsgRedux : errorMsgRedux.message}</div>
    )
}
ErrorAlert.propTypes = {
    decider: PropTypes.bool,
    message: PropTypes.string,
}
export default ErrorAlert