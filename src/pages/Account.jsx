import Navbar from "../components/Navbar/Navbar"
import { useEffect, useState } from "react"
import SuccessAlert from "../components/Alerts/SuccessAlert"
import ErrorAlert from "../components/Alerts/ErrorAlert"
import { useDispatch, useSelector } from "react-redux"
import { SET_EMAIL_VERIFIED, SET_ERROR_MSG, SET_SUCCESS_MSG, selectEmailVerified, selectShowNavModal, selectUser } from "../redux/features/auth/authSlice"
import BasicAccountLinks from "../components/Account/BasicAccountLinks"
import AdminAccountLinks from "../components/Account/AdminAccountLinks"
import NavbarModal from "../components/Navbar/NavbarModal"
import { SET_ORDERS_REVIEWED, SET_REVIEW_HANDLING, selectReviewHandling } from "../redux/features/account/accountSlice"
import { MdCancel, MdDelete } from "react-icons/md"
import sedan from '../assets/sedan6.png'
import suv from '../assets/suv.png'
import exotic from '../assets/exotic.png'
import pickupTruck from '../assets/pickupTruck.png'
import { monthMapper } from "../data/staticObjects"
import { quickReviewImageDelete, quickReviewImageUpload, submitUserReview } from "../services/reviewService"
import { BiSolidStar } from "react-icons/bi"
import { getEmailVerificationFromDb } from "../services/authService"




//     reviewedBy: {
//         type: String,
//   },
//     rating: {
//         type: Number,
//             min: 1,
//                 max: 5,
//                     validate: {
//             validator: Number.isInteger,
//                 message: 'Please provide integer between 1-5',
//     },
//     },
//     orderDetails: {
//         type: Object,
//     default: {
//     packageChosen: '',
//         vehicleName: '',
//             ttlPrice: 0,
//     },
//   },
// imgSrcs: {
//     type: Array,
//   },
// review: {
//     type: String,
//   },
// checklist: {
//     type: Object,
//     default: {
//         timelyService: false,
//             needsFulfilled: false,
//                 professionalCrew: false,
//                     useServiceAgain: false,
//                         recommendToOthers: false,
//     },
// },

const initialTextAreaState = {
    userText: ''
}

const ratingMapper = [1, 2, 3, 4, 5]

const ratingRelatedTextMapper = ['We always strive for the best, so please give us your full criticism', 'Customer satisfaction is our gaol, so please give us your full criticism', 'We are always excited to hear our strengths and weaknesses, please tell us more', 'Awesome, we are thrilled to hear more about how we can improve', 'This is what we strive for everytime, please tell us about your experience']

const checklistMapper = [{ title: 'Needs Fulfilled', checklistKey: 'needsFulfilled' }, { title: 'Professional Crew', checklistKey: 'professionalCrew' }, { title: 'Timely Service', checklistKey: 'timelyService' }, { title: 'Use Service Again', checklistKey: 'useServiceAgain' }, { title: 'Recommend To Others', checklistKey: 'recommendToOthers' }]

const checklistInitialState = {
    'needsFulfilled': false,
    'professionalCrew': false,
    'timelyService': false,
    'useServiceAgain': false,
    'recommendToOthers': false,
}

const Account = () => {
    const dispatch = useDispatch()

    const userRedux = useSelector(selectUser)
    const showNavbarModalRedux = useSelector(selectShowNavModal)
    const reviewHandlingRedux = useSelector(selectReviewHandling)
    const emailVerifiedRedux = useSelector(selectEmailVerified)

    const [accountPage, setAccountPage] = useState('Manage Orders')
    const [vehImgSrc, setVehImgSrc] = useState()
    const [uploadedImgUrls, setUploadedImgUrls] = useState([])
    const [imagesState, setImagesState] = useState([]);
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false)
    const [showFinalReviewForm, setShowFinalReviewForm] = useState(false)
    const [rating, setRating] = useState(1)
    const [ratingRelatedText, setRatingRelatedText] = useState('')
    const [userTextProvided, setUserTextProvided] = useState(initialTextAreaState)
    const { userText } = userTextProvided
    const [checklist, setChecklist] = useState(checklistInitialState)
    const [readyToSubmit, setReadyToSubmit] = useState(false)


    const selectFilesHandler = async (e) => {
        setIsUploading(false)
        const imagesData = [];
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            imagesData.push(readFileHandler(files[i]));
        }
    };

    const readFileHandler = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagesState((curr) => [...curr, reader.result]);
            return reader.result;
        };
    };

    const resetImgUpload = () => {
        setIsUploading(false)
        setImagesState([])
        setMessage('Ready To Upload')
    }


    const uploadFilesHandler = async () => {
        setIsUploading(true)
        setMessage("Uploading...");

        if (imagesState[0] === undefined) {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please select an image to upload first' }))
            return resetImgUpload()
        }

        if (uploadedImgUrls.length === 5) {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Maximum 5 Uploads Allowed Per Review' }))
            return resetImgUpload()
        }

        const dataToSend = {
            file: imagesState[0],
        }

        console.log(dataToSend)
        try {
            const res = await quickReviewImageUpload(dataToSend)
            console.log('res ----------------------------------------------')
            console.log(res)
            if (res) {
                let prevImgUrls = uploadedImgUrls
                prevImgUrls.push(res)
                setUploadedImgUrls(prevImgUrls)
                setMessage("Done!");
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Image successfully uploaded! View in gallery' }))
                resetImgUpload()
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: message }))
            setMessage("Error! Could not upload");
            setIsUploading(false)
        }
    };

    const deleteImage = async (id) => {
        setIsUploading(false)
        const dataToSend = { publicId: id }
        setMessage('Deleting...')

        try {
            const res = await quickReviewImageDelete(dataToSend)

            if (res) {
                const newUploadedImgs = uploadedImgUrls.filter((item) => item.publicId !== id)
                setUploadedImgUrls(newUploadedImgs)
                setMessage('Deletion Successful')
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Deletion Successful' }))
                resetImgUpload()
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: message }))
            setMessage("Error! Could not delete");
        }
    }

    const proceedWithReview = () => {
        dispatch(SET_REVIEW_HANDLING({
            isReviewing: true,
            orderReviewing: reviewHandlingRedux.orderReviewing,
            orderReview: {
                reviewedBy: reviewHandlingRedux.orderReviewing.name,
                rating: 1,
                imgSrcs: uploadedImgUrls,
                review: '',
                checklist: {
                    timelyService: false,
                    needsFulfilled: false,
                    professionalCrew: false,
                    useServiceAgain: false,
                    recommendToOthers: false,
                }
            }
        }))
        setShowFinalReviewForm(true)
    }

    const toggleChecklist = (id) => {
        const respectiveToggleText = document.getElementById(`${id}`)
        if (respectiveToggleText.innerText === 'No') {
            respectiveToggleText.innerText = 'Yes'
            setChecklist({ ...checklist, [id]: true })
        } else {
            respectiveToggleText.innerText = 'No'
            setChecklist({ ...checklist, [id]: false })
        }
    }

    const submitReview = async () => {
        // const { reviewedBy, rating, orderDetails, imgSrcs, review, checklist } =
        //     req.body;

        const reviewData = {
            reviewedBy: userRedux.name,
            rating,
            orderDetails: {
                packageChosen: reviewHandlingRedux.orderReviewing.packageChosen.title,
                vehicleName: `${reviewHandlingRedux.orderReviewing.vehicleMake} ${reviewHandlingRedux.orderReviewing.vehicleModel}`,
                ttlPrice: reviewHandlingRedux.orderReviewing.ttlPrice,
            },
            imgSrcs: uploadedImgUrls,
            review: userText,
            checklist,
        }

        try {
            const res = await submitUserReview(reviewData)

            if (res) {
                console.log(res)
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Thank you for your feedback and review!' }))
                setReadyToSubmit(false)
                setShowFinalReviewForm(false)
                resetImgUpload()
                const orderId = reviewHandlingRedux.orderReviewing._id
                const newOrderReviewed = {
                    [orderId]: true
                }
                dispatch(SET_ORDERS_REVIEWED(newOrderReviewed))
                dispatch(SET_REVIEW_HANDLING({
                    isReviewing: false,
                    orderReviewing: {},
                    orderReview: {},
                }))
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

        console.log(reviewData)
    }

    const getEmailVerificationUpdate = async () => {
        const userData = {
            email: userRedux.email
        }
        try {
            const res = await getEmailVerificationFromDb(userData)

            if (res) {
                dispatch(SET_EMAIL_VERIFIED(res))
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
        if (reviewHandlingRedux.orderReview && reviewHandlingRedux.orderReview.imgSrcs && reviewHandlingRedux.orderReview.imgSrcs.length > 0) {
            setUploadedImgUrls(reviewHandlingRedux.orderReview.imgSrcs)
        }
    }, [reviewHandlingRedux, showFinalReviewForm])

    useEffect(() => {
        if (reviewHandlingRedux && reviewHandlingRedux.orderReviewing.vehicle === 'SEDAN') {
            setVehImgSrc(sedan)
        }
        if (reviewHandlingRedux && reviewHandlingRedux.orderReviewing.vehicle === 'SUV') {
            setVehImgSrc(suv)
        }
        if (reviewHandlingRedux && reviewHandlingRedux.orderReviewing.vehicle === 'PICKUP') {
            setVehImgSrc(pickupTruck)
        }
        if (reviewHandlingRedux && reviewHandlingRedux.orderReviewing.vehicle === 'HIGH-END') {
            setVehImgSrc(exotic)
        }
        console.log('hello')
    }, [reviewHandlingRedux])

    useEffect(() => {
        if (rating >= 1) {
            let corrIndex = rating - 1
            setRatingRelatedText(ratingRelatedTextMapper[corrIndex])
        }
    }, [rating])

    useEffect(() => {
        if (emailVerifiedRedux !== true) {
            getEmailVerificationUpdate()
        }
    }, [emailVerifiedRedux])

    // {reviewedBy: '', rating: 1, orderDetails: {}, imgSrcs: [], review: '', checklist: {}}

    return (
        <>
            {/* add blur-sm below based off modal state management */}
            <div className={`min-h-[100vh] w-full flex flex-col bg-matteBlack montFont ${reviewHandlingRedux.isReviewing === true ? 'blur-md' : 'blur-0'}`}>
                {showNavbarModalRedux ? <NavbarModal /> : <>
                    <Navbar />
                    <SuccessAlert />
                    <ErrorAlert />
                    <div className="h-[90vh] w-full flex flex-col items-center justify-center mt-[10vh] bg-matteBlack bg-opacity-80 p-[1rem]"
                    >
                        {userRedux.privilege === 'Basic' ? <BasicAccountLinks accountPage={accountPage} setAccountPage={setAccountPage} /> : <AdminAccountLinks accountPage={accountPage} setAccountPage={setAccountPage} />}
                    </div>
                </>}
            </div>
            {reviewHandlingRedux.isReviewing === true &&
                <>
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[90vh] w-[90%] lg:w-[75%] xxl:w-[60%] bg-darkBlue rounded-md flex flex-col items-center gap-[1%] z-[100] montFont">
                        <MdCancel className="text-[24px] md:text-[34px] text-brightRed absolute left-2 top-2 cursor-pointer z-[100]" onClick={() => dispatch(SET_REVIEW_HANDLING({ isReviewing: false, orderReviewing: {}, orderReview: {} }))} />
                        {/* date and vehicle */}
                        <div className="h-[22%] w-full relative flex justify-between items-center gap-[5%] rounded-tl-lg rounded-tr-lg bg-jetBlack bg-opacity-50 pr-[5px]">
                            <div className="h-[90%] w-[50%] flex justify-center items-center">
                                <img src={vehImgSrc} alt="" className="h-full object-contain" />
                            </div>
                            <div className="h-[84%] md:h-[50%] w-[33%] md:w-[25%] flex flex-col items-center bg-white bg-opacity-75 rounded-lg insetShadow md:absolute top-2 right-2">
                                <div className="h-[20%] w-full flex justify-center items-center">
                                    <h4 className="h-full text-[12px] tall:text-[13px] md:text-[15px] text-darkBlue font-semibold">{reviewHandlingRedux.orderReviewing && monthMapper[reviewHandlingRedux.orderReviewing?.date?.dateChosen?.localDate.slice(0, 2)]}</h4>
                                </div>

                                <div className="h-[55%] w-full flex justify-center items-center text-[22px] md:text-[30px] text-darkBlue font-bold">
                                    {
                                        reviewHandlingRedux.orderReviewing && reviewHandlingRedux.orderReviewing?.date?.dateChosen.localDate[2] === '/' && reviewHandlingRedux.orderReviewing?.date?.dateChosen.localDate[4] === '/' ? reviewHandlingRedux.orderReviewing?.date?.dateChosen.localDate.slice(3, 4) : reviewHandlingRedux.orderReviewing?.date?.dateChosen.localDate[2] === '/' && reviewHandlingRedux.orderReviewing?.date?.dateChosen.localDate[5] === '/' ?
                                            reviewHandlingRedux.orderReviewing?.date?.dateChosen.localDate.slice(3, 5) : reviewHandlingRedux.orderReviewing?.date?.dateChosen.localDate[1] === '/' && reviewHandlingRedux.orderReviewing?.date?.dateChosen.localDate[3] === '/' ? reviewHandlingRedux.orderReviewing?.date?.dateChosen.localDate.slice(2, 3) : reviewHandlingRedux.orderReviewing?.date?.dateChosen.localDate.slice(2, 4)}
                                </div>
                                <div className="h-[25%] w-full flex justify-center items-start">
                                    <h4 className="h-[80%] text-[12px] tall:text-[13px] md:text-[15px] text-darkBlue font-semibold">{reviewHandlingRedux.orderReviewing && reviewHandlingRedux.orderReviewing?.date?.interval}</h4>
                                </div>
                            </div>
                            <div className="absolute bottom-2 left-2 h-[2vh] w-[64%] deskSm:w-full flex justify-evenly items-center">
                                <h4 className="insetShadow text-white font-semibold text-[8px] deskSm:text-[10px] md:text-[12px] lg:text-[15px] w-[25%] deskSm:w-[15%] text-center">{reviewHandlingRedux && reviewHandlingRedux.orderReviewing && reviewHandlingRedux.orderReviewing.vehicleMake + ' ' + reviewHandlingRedux.orderReviewing.vehicleModel}</h4>
                                <h4 className="insetShadow text-white font-semibold text-[8px] deskSm:text-[10px] md:text-[12px] lg:text-[15px] w-[25%] deskSm:w-[15%] text-center">{reviewHandlingRedux && reviewHandlingRedux.orderReviewing && reviewHandlingRedux.orderReviewing.packageChosen.title}</h4>
                                <h4 className="insetShadow text-loaderGreen font-semibold text-[8px] deskSm:text-[10px] md:text-[12px] lg:text-[15px] w-[25%] deskSm:w-[15%] text-center">${reviewHandlingRedux && reviewHandlingRedux.orderReviewing && reviewHandlingRedux.orderReviewing.ttlPrice}</h4>
                            </div>
                        </div>
                        {!showFinalReviewForm ?
                            <div className="h-[78%] w-full lg:w-[90%] xxl:w-[80%] flex flex-col items-center gap-[1%] p-[3%] bg-matteBlack bg-opacity-10">
                                <div className="h-[4vh] w-full flex items-center gap-[2%]">
                                    <input type="file" className="w-[70%] bg-matteBlack text-darkBlue bg-opacity-70" onChange={selectFilesHandler}
                                        accept="image/*" />
                                    <button className={`h-full w-[30%] bg-loaderGreen bg-opacity-30 font-semibold rounded-sm cursor-pointer ${isUploading ? 'hover:bg-opacity-30 cursor-default' : 'hover:bg-opacity-90 cursor-pointer'}`} disabled={isUploading} onClick={() => uploadFilesHandler()}>Upload</button>
                                </div>
                                <h2 className="text-[10px] lg:text-[13px]  insetShadow text-white w-full text-center">Max 5 Photos -- Please Do Not Submit Plate/Personal Info</h2>
                                <h2 className="text-[10px] lg:text-[12px] text-loaderGreen w-[50%] text-center">{message}</h2>
                                <div className="h-[78%] w-full flex flex-col items-center gap-[5%] bg-matteBlack bg-opacity-30 insetShadow rounded-md overflow-y-scroll py-[6%] px-[3%]">
                                    {uploadedImgUrls && uploadedImgUrls.length > 0 && uploadedImgUrls.map((urlInfo) => {
                                        return <>
                                            <div className="h-[80%] w-full flex relative justify-center items-center border-[1px] border-darkBlue border-opacity-70 rounded-lg insetShadowBlue">
                                                <img key={urlInfo.publicId} src={urlInfo.urls[0]} className="rounded-md h-[90%]" alt="" />
                                                <MdDelete className="absolute top-4 left-5 text-[24px] text-red-800 cursor-pointer" onClick={() => deleteImage(urlInfo.publicId)} />
                                            </div>
                                        </>
                                    })}
                                </div>
                                {uploadedImgUrls && uploadedImgUrls.length > 0 && !isUploading &&
                                    <div className="h-[6%] w-full flex justify-center items-center">
                                        <button className="h-full w-[30%] bg-loaderGreen bg-opacity-30 font-semibold rounded-sm cursor-pointer hover:bg-opacity-90" onClick={() => proceedWithReview()}>Next</button>
                                    </div>
                                }
                            </div>
                            : <div className="h-[78%] w-full lg:w-[90%] xxl:w-[80%] flex flex-col items-center gap-[1%] p-[3%] bg-matteBlack bg-opacity-10">
                                <div className="h-[10%] w-full flex justify-evenly items-center bg-matteBlack bg-opacity-25 insetShadow">
                                    <div className="h-full w-[80%] flex justify-evenly items-center ">
                                        {ratingMapper.map((num) => {
                                            if (rating === 5) {
                                                return <div key={num} onMouseEnter={() => setRating(num)} className="h-full w-1/5 flex justify-center items-center cursor-pointer">
                                                    <BiSolidStar onClick={() => setRating(num)} className={`text-[24px] text-yellow-400 cursor-pointer`} />
                                                </div>
                                            } else if (rating === 4) {
                                                if (num <= 4) {
                                                    return <div key={num} onMouseEnter={() => setRating(num)} className="h-full w-1/5 flex justify-center items-center cursor-pointer">
                                                        <BiSolidStar onClick={() => setRating(num)} className={`text-[24px] text-yellow-400 cursor-pointer`} />
                                                    </div>
                                                } else {
                                                    return <div key={num} onMouseEnter={() => setRating(num)} className="h-full w-1/5 flex justify-center items-center cursor-pointer">
                                                        <BiSolidStar onClick={() => setRating(num)} className={`text-[24px] text-yellow-100 cursor-pointer`} />
                                                    </div>
                                                }
                                            } else if (rating === 3) {
                                                if (num <= 3) {
                                                    return <div key={num} onMouseEnter={() => setRating(num)} className="h-full w-1/5 flex justify-center items-center cursor-pointer">
                                                        <BiSolidStar onClick={() => setRating(num)} className={`text-[24px] text-yellow-400 cursor-pointer`} />
                                                    </div>
                                                } else {
                                                    return <div key={num} onMouseEnter={() => setRating(num)} className="h-full w-1/5 flex justify-center items-center cursor-pointer">
                                                        <BiSolidStar onClick={() => setRating(num)} className={`text-[24px] text-yellow-100 cursor-pointer`} />
                                                    </div>
                                                }
                                            }
                                            else if (rating === 2) {
                                                if (num <= 2) {
                                                    return <div key={num} onMouseEnter={() => setRating(num)} className="h-full w-1/5 flex justify-center items-center cursor-pointer">
                                                        <BiSolidStar onClick={() => setRating(num)} className={`text-[24px] text-yellow-400 cursor-pointer`} />
                                                    </div>
                                                } else {
                                                    return <div key={num} onMouseEnter={() => setRating(num)} className="h-full w-1/5 flex justify-center items-center cursor-pointer">
                                                        <BiSolidStar onClick={() => setRating(num)} className={`text-[24px] text-yellow-100 cursor-pointer`} />
                                                    </div>
                                                }
                                            } else {
                                                if (num <= 1) {
                                                    return <div key={num} onMouseEnter={() => setRating(num)} className="h-full w-1/5 flex justify-center items-center cursor-pointer">
                                                        <BiSolidStar onClick={() => setRating(num)} className={`text-[24px] text-yellow-400 cursor-pointer`} />
                                                    </div>
                                                } else {
                                                    return <div key={num} onMouseEnter={() => setRating(num)} className="h-full w-1/5 flex justify-center items-center cursor-pointer">
                                                        <BiSolidStar onClick={() => setRating(num)} className={`text-[24px] text-yellow-100 cursor-pointer`} />
                                                    </div>
                                                }
                                            }
                                        })}
                                    </div>
                                    <div className="h-full w-[15%] flex items-center">
                                        <button className="h-[80%] w-[70%] bg-yellow-400 bg-opacity-60 text-[26px] rounded-md insetShadow text-matteBlack font-bold" disabled>{rating}</button>
                                    </div>
                                </div>
                                <div className="h-[50%] w-full bg-matteBlack bg-opacity-60 flex flex-col items-center">
                                    <div className="h-[20%] w-full flex justify-center items-center">
                                        <h2 className={`${rating === 1 ? 'text-yellow-100' : rating === 2 ? 'text-yellow-200' : rating === 3 ? 'text-yellow-300' : rating === 4 ? 'text-yellow-400' : 'text-loaderGreen'} text-center`}>{ratingRelatedText}</h2>
                                    </div>
                                    <div className="h-[80%] w-full p-[3%] flex justify-center items-center">
                                        <div className="h-full w-full bg-matteBlack bg-opacity-50 rounded-sm p-[1%]">
                                            <textarea className="min-h-full w-full bg-matteBlack bg-opacity-60 text-[12px] outline-none rounded-sm text-white p-[1%]" name="userText" value={userText} onChange={(e) => setUserTextProvided({ userText: e.target.value })} type="text"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[32%] w-full bg-matteBlack bg-opacity-60 flex flex-col items-center px-[1%] py-[1%]">
                                    <div className="h-full w-full flex flex-col items-center bg-matteBlack bg-opacity-80">
                                        {reviewHandlingRedux && reviewHandlingRedux.orderReview && checklistMapper.map((item, i) => {
                                            return <>
                                                <div key={item.title} className={`${i % 2 === 0 ? 'bg-matteBlack' : 'bg-jetBlack'} bg-opacity-30 h-1/5 w-full flex items-center justify-evenly px-[1%] gap-[2%]`}>
                                                    <h3 className="h-[70%] w-[50%] text-darkBlue font-semibold brightness-125">{item.title}</h3>
                                                    <label className="switch">
                                                        <input type="checkbox" onClick={() => toggleChecklist(item.checklistKey)} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <h3 id={`${item.checklistKey}`} className="h-[70%] w-[20%] text-darkBlue font-semibold brightness-125">No</h3>
                                                </div>
                                            </>
                                        })}
                                    </div>
                                </div>
                                <div className="h-[8%] w-full flex justify-center items-center gap-[5%]">
                                    <button className={`${readyToSubmit ? 'bg-brightRed' : 'bg-loaderGreen'} h-[80%] w-[30%] bg-opacity-30 rounded-sm text-matteBlack font-semibold hover:bg-opacity-90`} onClick={() => setReadyToSubmit((prev) => !prev)}>{readyToSubmit ? 'Cancel' : 'Submit'}</button>
                                    {readyToSubmit && <button className="h-[80%] w-[30%] bg-loaderGreen bg-opacity-30 rounded-sm text-matteBlack text-[14px] font-semibold hover:bg-opacity-90" onClick={() => submitReview()}>{`Confirm ${rating}-Star Review`}</button>}
                                </div>
                            </div>}
                        <SuccessAlert />
                        <ErrorAlert />
                    </div>
                </>
            }
        </>
    )
}

export default Account