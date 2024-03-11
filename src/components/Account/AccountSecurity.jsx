import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_ERROR_MSG, SET_SUCCESS_MSG, SET_USER_INFO, selectUser } from "../../redux/features/auth/authSlice"
import { editUserProfile, resetUserPassword } from "../../services/authService"

const initialUserInfo = {
    name: '',
    phone: '',
}
const passworInfo = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
}

const AccountSecurity = () => {
    const dispatch = useDispatch()

    const userRedux = useSelector(selectUser)

    const [userInfo, setUserInfo] = useState(initialUserInfo)
    const { name, phone } = userInfo
    const [userPassInfo, setUserPassInfo] = useState(passworInfo)
    const { oldPassword, newPassword, confirmNewPassword } = userPassInfo

    const submitPasswordResetRequest = async () => {
        const dataToSend = {
            oldPassword, newPassword, confirmNewPassword, userRefId: userRedux.userId
        }

        try {
            const res = await resetUserPassword(dataToSend)
            if (res) {
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Password Reset Successful!' }))
                const dataObj = {
                    name: res.name,
                    email: res.email,
                    phone: res.phone,
                    privilege: res.privilege,
                    userId: res._id,
                    activeOrders: res.activeOrders,
                    archivedOrders: res.archivedOrders,
                }
                dispatch(SET_USER_INFO(dataObj))
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

    const submitEditUserProfileRequest = async () => {
        const dataToSend = {
            name, phone, userRefId: userRedux.userId
        }

        try {
            const res = await editUserProfile(dataToSend)
            if (res) {
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: `Our new contact for you, ${res.name}, is ${res.phone}` }))
                const dataObj = {
                    name: res.name,
                    email: res.email,
                    phone: res.phone,
                    privilege: res.privilege,
                    userId: res._id,
                    activeOrders: res.activeOrders,
                    archivedOrders: res.archivedOrders,
                }
                dispatch(SET_USER_INFO(dataObj))
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
        if (userRedux) {
            setUserInfo({
                name: userRedux.name,
                phone: userRedux.phone,
            })
        }
    }, [userRedux])
    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-[8%] w-full bg-darkBlue bg-opacity-40 flex items-center rounded-tl-lg rounded-tr-lg">
                <h1 className="h-[80%] w-full text-center text-[20px] md:text-[22px] font-semibold">Login & Security</h1>
            </div>
            <div className="h-[86%] w-full md:w-[80%] lg:w-[70%] ml-auto mr-auto flex flex-col items-center overflow-y-scroll">
                <div className="min-h-[25%] tall:min-h-[22%] w-[90%] flex items-start justify-center gap-[5%]">
                    <div className="h-full w-1/2 flex flex-col items-center justify-end">
                        <label htmlFor="security-name" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Name</label>
                        <input id="security-name" name="name" value={name} type="text" placeholder="John Gonzalez" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlacwhite outline-none text-center rounded-md" onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} autoComplete={name} />
                    </div>
                    <div className="h-full w-1/2 flex flex-col items-center justify-end">
                        <label htmlFor="security-phone" className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Phone #</label>
                        <input id="security-phone" name="phone" value={phone} type="text" placeholder="873-827-9012" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlacwhite outline-none text-center rounded-md" onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} autoComplete={phone} />
                    </div>
                </div>
                <div className="min-h-[25%] tall:min-h-[22%] w-[90%] flex items-start justify-center gap-[5%]">

                    <div className="h-full w-1/2 flex justify-center items-center">
                        <button className="h-[36%] w-[90%] bg-darkBlue rounded-lg insetShadow hover:bg-opacity-40" onClick={() => submitEditUserProfileRequest()}>EDIT</button>
                    </div>
                </div>
                <div className="min-h-[50%] w-[90%] flex items-start justify-center gap-[5%] py-[1rem]">
                    <div className="h-full w-full flex flex-col items-center justify-start bg-darkBlue bg-opacity-40 rounded-lg">
                        <div className="min-h-[16%] w-full flex items-center bg-matteBlack bg-opacity-20">
                            <h4 className="text-[14px] h-[80%] w-full text-center">Password Reset</h4>
                        </div>
                        <div className="min-h-[60%] w-[90%] flex items-start justify-center gap-[5%]">
                            <div className="h-[80%] w-1/2 flex flex-col items-center justify-end">
                                <label htmlFor="security-oldPassword" className="text-[10px] md:text-[13px] lg:text-[15px] w-full h-[30%] text-center">Old Password</label>
                                <input id="security-oldPassword" name="oldPassword" value={oldPassword} type="password" placeholder="Password" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-white outline-none text-center rounded-md" required onChange={(e) => setUserPassInfo({ ...userPassInfo, oldPassword: e.target.value })} />
                            </div>
                            <div className="h-[80%] w-1/2 flex flex-col items-center justify-end">
                                <label htmlFor="security-newPassword" className="text-[10px] md:text-[13px] lg:text-[15px] w-full h-[30%] text-center">New Password</label>
                                <input id="security-newPassword" name="newPassword" value={newPassword} type="password" placeholder="Password" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-white outline-none text-center rounded-md" required onChange={(e) => setUserPassInfo({ ...userPassInfo, newPassword: e.target.value })} />
                            </div>
                            <div className="h-[80%] w-1/2 flex flex-col items-center justify-end">
                                <label htmlFor="security-newPassword" className="text-[10px] md:text-[13px] lg:text-[15px] w-full h-[30%] text-center">Confirm Pass</label>
                                <input id="security-newPassword2" name="confirmNewPassword" value={confirmNewPassword} type="password" placeholder="Password" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-white outline-none text-center rounded-md" required onChange={(e) => setUserPassInfo({ ...userPassInfo, confirmNewPassword: e.target.value })} />
                            </div>
                        </div>
                        <div className="h-[20%] w-full flex justify-center items-end">
                            <button className="h-[90%] w-[50%] bg-loaderGreen cursor-pointer rounded-lg insetShadow hover:bg-opacity-40" onClick={() => submitPasswordResetRequest()}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSecurity