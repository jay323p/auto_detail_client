import { useDispatch, useSelector } from 'react-redux'
import AccountSecurity from './AccountSecurity'
import AccountOrders from './AccountOrders'
import AccountGallery from './AccountGallery'
import { selectArchivedOrders, selectOrders } from '../../redux/features/account/accountSlice'
import { SET_ERROR_MSG, SET_SUCCESS_MSG, selectEmailVerified, selectUser } from '../../redux/features/auth/authSlice'
import { sendEmailVerificationLink } from '../../services/authService'
import { accountLinksMapper } from '../../data/staticArrays'
import PropTypes from 'prop-types'

const BasicAccountLinks = ({ accountPage, setAccountPage }) => {
    const dispatch = useDispatch()

    const userRedux = useSelector(selectUser)
    const emailVerifiedRedux = useSelector(selectEmailVerified)
    const activeOrdersRedux = useSelector(selectOrders)
    const archivedOrdersRedux = useSelector(selectArchivedOrders)

    const resendEmailVerification = async () => {
        const userData = {
            email: userRedux.email
        }

        try {
            const res = await sendEmailVerificationLink(userData)

            if (res) {
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Email verification sent!' }))
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
    return (
        <div className="h-full w-full flex flex-col overflow-y-scroll">
            <div className='h-[8%] min-w-full flex items-center justify-between px-[3%]'>
                <h2 className="text-darkBlue text-[21px] md:text-[24px] lg:text-[26px] xl:text-[28px] font-semibold brightness-150">Your Account </h2>
                {!emailVerifiedRedux &&
                    <div className='h-full w-[60%] flex items-center justify-end gap-[2%]'>
                        <span className='text-[12px] text-brightRed pl-[4%]'>Please verify your email</span>
                        <button className='h-[70%] w-[20%] bg-brightRed bg-opacity-20 rounded-sm text-[12px] font-semibold cursor-pointer hover:bg-opacity-80' onClick={() => resendEmailVerification()}>Resend</button>
                    </div>
                }
            </div>
            <div className="min-h-[80%] md:min-h-[20%] lg:min-h-[20%] md:place-items-start w-full grid grid-cols-twoCols md:grid-cols-4 place-items-center md:mt-[1rem]">
                {accountLinksMapper.map((item) => {
                    return <>
                        <div key={item.id} className={`${item.title === accountPage ? 'bg-opacity-50' : 'bg-opacity-10'} h-[60%] md:h-[60%] lg:h-[50%] xl:h-[30%] w-[90%] flex flex-col items-center md:justify-center bg-darkBlue rounded-lg hoverShadowBlue cursor-pointer pt-[3%] px-[3%]`} onClick={() => setAccountPage(item.title)}>
                            <img src={item.img} alt="" className={`${item.title === 'Manage Orders' ? ' h-[36%] scale-150' : 'h-[34%]'}`} />
                            <h3 className={`${item.title === 'Manage Orders' ? '' : ''} text-darkBlue text-[17px] font-semibold`}>{item.title}</h3>
                            <p className={`${item.title === 'Manage Orders' ? '' : ''} text-white text-[12px] text-center`}>{item.description}</p>
                        </div>
                    </>
                })}

            </div>
            <div className="min-h-[80%] md:min-h-[70%] w-[98%] flex lg:w-[80%] ml-auto mr-auto justify-center items-center text-white bg-darkBlue bg-opacity-20 mt-[1rem] rounded-lg">
                {accountPage === 'Login & Security' ?
                    <AccountSecurity />
                    : accountPage === 'Manage Orders' ? <AccountOrders orderType={'Active'} orderData={activeOrdersRedux} /> : accountPage === 'Archived Orders' ? <AccountOrders orderType={'Archive'} orderData={archivedOrdersRedux} /> : <AccountGallery />}
            </div>
        </div>
    )
}

BasicAccountLinks.propTypes = {
    accountPage: PropTypes.string,
    setAccountPage: PropTypes.func,
}

export default BasicAccountLinks