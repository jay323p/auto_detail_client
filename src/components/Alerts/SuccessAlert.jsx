import { useEffect } from 'react'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SUCCESS_MSG, selectShowSuccessMsg, selectSuccessMsg } from '../../redux/features/auth/authSlice'

const SuccessAlert = () => {
    const dispatch = useDispatch()

    const showSuccessMsgRedux = useSelector(selectShowSuccessMsg)
    const successMsgRedux = useSelector(selectSuccessMsg)

    useEffect(() => {
        if (showSuccessMsgRedux) {
            setTimeout(() => {
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: false, successMsg: '' }))
            }, 5000)
        }
    })
    return (
        <div className={`${showSuccessMsgRedux ? 'slideCardFromLeft' : 'slideCardReverse hidden'} h-[100px] md:h-[200px] w-[200px] md:w-[300px] absolute bottom-3 left-[50%] translate-x-[-50%] md:top-3 md:left-3 md:translate-x-0 flex justify-center items-center bg-darkBlue text-white z-[100] rounded-lg text-center montFont text-[10px] md:text-[14px]`}>
            <div className='absolute top-2 right-2'>
                <ImCross className='text-matteBlack cursor-pointer' onClick={() => dispatch(SET_SUCCESS_MSG({ showSuccessMsg: false, successMsg: '' }))} />
            </div>
            {successMsgRedux}</div>
    )
}

export default SuccessAlert