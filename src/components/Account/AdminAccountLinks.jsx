import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountSecurity from './AccountSecurity'
import AccountCalendar from './AccountCalendar'
import AdminAccountClientContacts from './AdminAccountClientContacts'
import AdminAccountGallery from './AdminAccountGallery'
import AdminAccountOrders from './AdminAccountOrders'
import { selectArchivedOrders, selectOrders } from '../../redux/features/account/accountSlice'
import { SET_ERROR_MSG, SET_SUCCESS_MSG, selectEmailVerified, selectUser } from '../../redux/features/auth/authSlice'
import { sendEmailVerificationLink } from '../../services/authService'
import { adminAccountLinksMapper } from '../../data/staticArrays'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import PropTypes from 'prop-types'

const BasicAccountLinks = ({ accountPage, setAccountPage }) => {
    const dispatch = useDispatch()
    const activeOrdersRedux = useSelector(selectOrders)
    const archivedOrdersRedux = useSelector(selectArchivedOrders)
    const emailVerifiedRedux = useSelector(selectEmailVerified)
    const userRedux = useSelector(selectUser)

    const [collapseSideBar, setCollapseSideBar] = useState(false)

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
        <div className="h-full w-full relative flex flex-col md:flex-row overflow-y-scroll">
            {!collapseSideBar &&
                <div className="min-h-[60%] md:min-h-full md:w-1/3 md:place-items-start w-full grid grid-cols-twoCols md:grid-cols-1 md:row-span-[200px] place-items-center md:mt-[1rem] overflow-y-scroll fixGridRows md:grid-rows-sixRows">
                    {/* if more links to be added, fix grid-template-rows to have the respective rows (8 links = 4 rows needed for repeat(4, 200px)) */}
                    {!emailVerifiedRedux &&
                        <div className='h-full w-full flex flex-col items-center justify-center gap-[2%]'>
                            <span className='text-[12px] text-brightRed pl-[4%]'>Please verify your email</span>
                            <button className='h-[20%] w-[50%] bg-brightRed bg-opacity-20 rounded-sm text-[12px] font-semibold cursor-pointer hover:bg-opacity-80' onClick={() => resendEmailVerification()}>Resend</button>
                        </div>
                    }
                    {adminAccountLinksMapper.map((item) => {
                        return <>
                            <div key={item.id} className={`${item.title === accountPage ? 'bg-opacity-50' : 'bg-opacity-10'} h-[80%] md:h-[80%] lg:h-[80%] xl:h-[80%] w-[90%] xl:w-[70%] flex flex-col items-center bg-darkBlue rounded-lg hoverShadowBlue cursor-pointer pt-[3%] px-[3%] m-auto`} onClick={() => setAccountPage(item.title)}>
                                <img src={item.img} alt="" className={`${item.title === 'Manage Orders' ? ' h-[36%] scale-150' : 'h-[34%]'}`} />
                                <h3 className={`${item.title === 'Manage Orders' ? '' : ''} text-darkBlue text-[17px] font-semibold text-center`}>{item.title}</h3>
                                <p className={`${item.title === 'Manage Orders' ? '' : ''} text-white text-[12px] text-center`}>{item.description}</p>
                            </div>
                        </>
                    })}

                </div>
            }
            <div className="min-h-[80%] md:min-h-[70%] w-[98%] relative flex lg:w-[80%] ml-auto mr-auto justify-center items-center text-white bg-darkBlue bg-opacity-20 mt-[1rem] rounded-lg">
                {!collapseSideBar ?
                    <AiOutlineMenuFold className='absolute top-1 left-1 text-darkGrayBlue text-[30px] md:text-[32px] cursor-pointer z-50' onClick={() => setCollapseSideBar(true)} />
                    : <AiOutlineMenuUnfold className='absolute top-1 left-1 text-darkGrayBlue text-[30px] md:text-[32px] cursor-pointer z-50' onClick={() => setCollapseSideBar(false)} />}
                {accountPage === 'Login & Security' ?
                    <AccountSecurity />
                    : accountPage === 'Manage Orders' ? <AdminAccountOrders orderType={'Active'} orderData={activeOrdersRedux} /> : accountPage === 'Archived Orders' ? <AdminAccountOrders orderType={'Archive'} orderData={archivedOrdersRedux} /> : accountPage === 'Manage Gallery' ? <AdminAccountGallery /> : accountPage === 'Edit Calendar' ? <AccountCalendar /> : accountPage === 'Client Contacts' ? <AdminAccountClientContacts /> : ''}
            </div>
        </div>
    )
}

BasicAccountLinks.propTypes = {
    accountPage: PropTypes.string,
    setAccountPage: PropTypes.func,
}

export default BasicAccountLinks