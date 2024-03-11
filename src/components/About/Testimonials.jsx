import { AiFillLeftSquare, AiFillRightSquare } from "react-icons/ai"
import { RxCross1 } from "react-icons/rx"
import { BsDot } from "react-icons/bs"
import { MdCheck, MdStarRate } from "react-icons/md"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_ERROR_MSG, selectUser } from "../../redux/features/auth/authSlice"
import { SET_ALL_REVIEWS, selectAllReviews } from "../../redux/features/reviews/reviewsSlice"
import carRestored from '../../assets/carRestored.jpg'
import interiorDirty from '../../assets/interiorDirty.jpg'
import interiorCleaned from '../../assets/interiorCleaned.jpg'
import exteriorDirty from '../../assets/exteriorDirty.jpg'
import exteriorCleaned from '../../assets/exteriorCleaned.jpg'
import { deleteUserReview, getAllUserReviews } from "../../services/reviewService"

const imgs = [carRestored, interiorDirty, interiorCleaned, exteriorDirty, exteriorCleaned]
const checklistObjIndexer = ['needsFulfilled', 'professionalCrew', 'timelyService', 'useServiceAgain', 'recommendToOthers']
const checklistObjTitleIndexer = ['Needs Fulfilled', 'Professional Crew', 'Timely Services', 'Use Service Again', 'Recommend To Others']
const textOverlay = 'Jay\'s Auto Spa'

const Testimonials = () => {
    const dispatch = useDispatch()

    const userRedux = useSelector(selectUser)
    const allReviewsRedux = useSelector(selectAllReviews)

    const [ratingQty, setRatingQty] = useState(0)
    const [reviewIndexer, setReviewIndexer] = useState(0)
    const [focusedReview, setFocusedReview] = useState(undefined)
    const [reviewPics, setReviewPics] = useState(imgs)
    const [currentPic, setCurrentPic] = useState(0)
    const [imgSrc, setImgSrc] = useState(carRestored)
    const [rating, setRating] = useState([true, true, true, true, true])
    const [reviewText, setReviewText] = useState('')
    const [orderInfo, setOrderInfo] = useState()
    const [checkList, setChecklist] = useState([{
        title: 'Timely Service',
        achieved: true,
    }, {
        title: 'Needs Fulfilled',
        achieved: true,
    }, {
        title: 'Professional Crew',
        achieved: true,
    }, {
        title: 'Use Service Again',
        achieved: true,
    }, {
        title: 'Recommend To Others',
        achieved: true,
    },])
    const [confirmDelete, setConfirmDelete] = useState(false)

    const nextPic = () => {
        if (currentPic < reviewPics.length - 1) {
            let next = currentPic + 1
            const reviewPic = document.getElementById('reviewPic')
            reviewPic.classList.add('fade')

            setTimeout(() => {
                setImgSrc(reviewPics[next].urls[0])
                reviewPic.classList.remove('fade')
                reviewPic.classList.add('fade-in')
                setCurrentPic(next)

                setTimeout(() => {
                    reviewPic.classList.remove('fade-in')
                }, 700)
            }, 700)
        } else {
            let next = 0
            const reviewPic = document.getElementById('reviewPic')
            reviewPic.classList.add('fade')

            setTimeout(() => {
                setImgSrc(reviewPics[next].urls[0])
                reviewPic.classList.remove('fade')
                reviewPic.classList.add('fade-in')
                setCurrentPic(next)

                setTimeout(() => {
                    reviewPic.classList.remove('fade-in')
                }, 700)
            }, 700)
        }
    }
    const prevPic = () => {
        if (currentPic !== 0) {
            let next = currentPic - 1
            const reviewPic = document.getElementById('reviewPic')
            reviewPic.classList.add('fade')

            setTimeout(() => {
                setImgSrc(reviewPics[next].urls[0])
                reviewPic.classList.remove('fade')
                reviewPic.classList.add('fade-in')
                setCurrentPic(next)

                setTimeout(() => {
                    reviewPic.classList.remove('fade-in')
                }, 700)
            }, 700)
        } else {
            let next = reviewPics.length - 1
            const reviewPic = document.getElementById('reviewPic')
            reviewPic.classList.add('fade')

            setTimeout(() => {
                setImgSrc(reviewPics[next].urls[0])
                reviewPic.classList.remove('fade')
                reviewPic.classList.add('fade-in')
                setCurrentPic(next)

                setTimeout(() => {
                    reviewPic.classList.remove('fade-in')
                }, 700)
            }, 700)
        }
    }

    const getUserReviews = async () => {
        try {
            const res = await getAllUserReviews()

            if (res) {
                dispatch(SET_ALL_REVIEWS(res))
                setFocusedReview(res[0])
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

    const getUserReviewsCallback = useCallback(getUserReviews, [dispatch])

    const nextReview = () => {
        let next = reviewIndexer + 1
        let nextReview = allReviewsRedux[next]

        if (nextReview) {
            setFocusedReview(nextReview)
            setReviewIndexer(next)
        } else {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'No further reveiws.' }))
        }
    }

    const prevReview = () => {
        let next = reviewIndexer - 1
        let nextReview = allReviewsRedux[next]

        if (nextReview) {
            setFocusedReview(nextReview)
            setReviewIndexer(next)
        } else {
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'No further reveiws.' }))
        }
    }

    const resetReviews = () => {
        setFocusedReview(allReviewsRedux[0])
        setReviewIndexer(0)
    }

    const deleteReview = async () => {
        try {
            const idToSend = {
                id: focusedReview._id
            }

            const res = await deleteUserReview(idToSend)

            if (res) {
                dispatch(SET_ALL_REVIEWS(res))
                setFocusedReview(res[0])
                setReviewIndexer(0)
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
        setConfirmDelete(false)
    }

    useEffect(() => {
        getUserReviewsCallback()
    }, [getUserReviewsCallback])

    useEffect(() => {
        if (focusedReview) {
            setReviewPics(focusedReview.imgSrcs)
            setImgSrc(focusedReview.imgSrcs[0].urls[0])
            setCurrentPic(0)

            const checklistArr = []
            for (let i = 0; i < Object.keys(focusedReview.checklist).length; i++) {
                let checklistObj = {
                    title: checklistObjTitleIndexer[i],
                    achieved: focusedReview.checklist[checklistObjIndexer[i]]
                }
                checklistArr.push(checklistObj)
            }
            setChecklist(checklistArr)
            setReviewText(focusedReview.review)
            setOrderInfo(focusedReview.orderDetails)

            if (focusedReview.rating === 5) {
                setRating([true, true, true, true, true])
            } else if (focusedReview.rating === 4) {
                setRating([true, true, true, true, false])
            } else if (focusedReview.rating === 3) {
                setRating([true, true, true, false, false])
            } else if (focusedReview.rating === 2) {
                setRating([true, true, false, false, false])
            } else if (focusedReview.rating === 1) {
                setRating([true, false, false, false, false])
            }
        }
    }, [focusedReview])

    useEffect(() => {
        if (rating) {
            let counter = 0
            for (let i = 0; i < rating.length; i++) {
                if (rating[i] === true) {
                    counter += 1
                }
            }
            setRatingQty(counter)
        }
    }, [rating])

    return (
        <>
            <div className='mt-[10vh] h-[8%] w-full flex justify-center items-center text-[22px] md:text-[26px] bg-matteBlack text-darkBlue '>TESTIMONIALS</div>
            <div className='bg-matteBlack h-full md:max-h-[60%] w-full flex justify-center items-center p-[1rem] '>
                <div className='h-full w-full flex flex-col md:flex-row items-center md:items-start bg-matteBlack rounded-lg md:rounded-tl-none'>
                    <div className='h-[40%] md:h-full w-full relative flex justify-center items-center'>
                        <img id='reviewPic' src={imgSrc} className='h-full w-full rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg object-cover' alt="" />
                        {currentPic !== 0 && <>
                            <AiFillLeftSquare className='text-[30px] text-darkBlue cursor-pointer absolute bottom-3 left-2' onClick={() => prevPic()} />
                        </>}
                        <div className='absolute bottom-4 w-[30%] h-[5%] flex justify-center items-center'>
                            {reviewPics && reviewPics.length > 1 && reviewPics.map((item, i) => {
                                return <BsDot key={item.publicId} className={`${i === currentPic ? 'text-darkBlue scale-[2]' : 'text-white'}`} />
                            })}
                        </div>

                        {currentPic < reviewPics.length - 1 && <>
                            <AiFillRightSquare className='text-[30px] text-darkBlue cursor-pointer absolute bottom-3 right-2' onClick={() => nextPic()} />
                        </>}
                        <h2 className='absolute top-1 left-2 text-[18px] text-darkBlue bg-matteBlack bg-opacity-40 font-bold px-[2px] rounded-lg hover:bg-opacity-100'>{textOverlay}</h2>
                        {userRedux && userRedux.privilege === 'Admin' &&
                            <>
                                <div className="w-full absolute top-1 right-2 flex justify-end gap-[3%]">
                                    <button className={`${confirmDelete ? 'bg-paleYellow' : 'bg-brightRed'}  text-[18px] text-matteBlack bg-opacity-40 font-bold px-[2px] rounded-md hover:bg-opacity-100`} onClick={() => setConfirmDelete((prev) => !prev)}>{confirmDelete ? 'Cancel' : 'Delete'}</button>
                                    {confirmDelete && <button className=' text-[18px] text-matteBlack bg-brightRed bg-opacity-40 font-bold px-[2px] rounded-md hover:bg-opacity-100' onClick={() => deleteReview()}>Confirm</button>}
                                </div>
                            </>
                        }
                    </div>
                    <div className='min-h-[60%] md:h-full w-full relative flex flex-col bg-darkBlue bg-opacity-80 insetShadow rounded-tl-lg rounded-tr-lg md:rounded-tl-none md:rounded-bl-none md:rounded-br-lg -translate-y-2 md:translate-y-0'>
                        <div className='h-[8%] w-full flex justify-between items-center px-[6px] bg-darkBlue rounded-tl-lg rounded-tr-lg md:rounded-tl-none md:rounded-bl-none'>
                            <h4 className='text-[14px] font-thin text-slate-400 italic'>{orderInfo?.packageChosen}</h4>
                            <div className='h-full w-[20%] flex justify-end items-center gap-[5px]'>
                                <MdStarRate className='text-[20px] text-rateYellow' />
                                <h5 className='text-[16px] text-slate-400 font-semibold'>{ratingQty}.0</h5>
                            </div>
                        </div>
                        <div className="h-[12%] tall:h-[10%] w-full flex items-end px-[6px]">
                            <h2 className='h-[80%] w-full text-matteBlack text-[26px] font-semibold'>{orderInfo?.vehicleName}</h2>
                        </div>
                        <div className="h-[14%] tall:h-[10%] w-full flex items-center px-[12px] gap-[4px]">
                            <h2 className='h-[80%] w-[26%] md:w-[22%] lg:w-[18%] xxl:w-[13%] text-green-400 text-[22px] font-bold'>${orderInfo?.ttlPrice}</h2>
                            <h6 className='text-[12px] text-slate-400'>total detailing cost</h6>
                        </div>
                        <div className='h-[60%] w-full flex justify-center items-center p-[6px]'>
                            <div className='h-full w-full flex bg-matteBlack bg-opacity-30 insetShadow2 rounded-md'>
                                <div className='h-full w-2/3 flex flex-col items-center gap-[10%] border-r-[2px] border-darkBlue border-opacity-50 rounded-sm'>
                                    <div className='h-[10%] md:h-[3vh] tall:h-[10%] w-full flex items-center px-[10px]'>
                                        <h4 className='h-[80%] w-[30%] text-slate-400 text-[12px]'>Jay Patel</h4>
                                        <div className='h-full w-[70%] flex justify-end items-center'>
                                            {rating && rating.length > 0 && rating.map((item, i) => {
                                                if (item === true) {
                                                    return <MdStarRate key={`rating-${i}`} className='text-rateYellow' />
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <div className='h-[70%] w-full flex justify-center items-start overflow-y-scroll'>
                                        <p className='text-[12px] px-[6px] text-center text-slate-400'>{reviewText}</p>
                                    </div>
                                </div>
                                <div className='h-full w-1/3 flex flex-col items-center bg-matteBlack bg-opacity-80 rounded-tr-md rounded-br-md px-[6px] py-[12px] overflow-y-scroll'>
                                    {checkList && checkList.length > 0 && checkList.map((item) => {
                                        return <div key={item.title} className='min-h-[5vh] w-full flex items-center'>
                                            <h2 className={`${item.achieved === true ? 'text-green-400' : 'text-brightRed'} h-[40%] w-[80%] text-[10px] tall:text-[12px] lg:text-[13px] italic`}>
                                                {item.title}
                                            </h2>
                                            {item.achieved === true ? <MdCheck className='text-green-400' /> : <RxCross1 className='text-brightRed' />}
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='h-[10%] w-full pl-[10px] flex items-center md:justify-center gap-[4%] bg-matteBlack bg-opacity-70 md:absolute md:bottom-1'>
                            <div className='h-full w-1/4 flex items-center justify-end'>
                                <AiFillLeftSquare className='text-[24px] text-darkBlue cursor-pointer' onClick={() => prevReview()} />
                                <h4 className='text-[11px] text-darkBlue' >Prev Review</h4>
                            </div>
                            <div className='h-full w-1/4 flex items-center'>
                                <button className='h-[50%] md:h-[2vh] w-full text-[14px] bg-darkBlue flex items-center justify-center rounded-md cursor-pointer' onClick={() => resetReviews()}>RESET</button>
                            </div>
                            <div className='h-full w-1/4 flex items-center'>
                                <h4 className='text-[11px] text-darkBlue'>Next Review</h4>
                                <AiFillRightSquare className='text-[24px] text-darkBlue cursor-pointer' onClick={() => nextReview()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonials