import { useEffect, useRef, useState } from 'react'
import { getPaginatedGalleryImages } from '../../services/authService'
import { SET_ERROR_MSG } from '../../redux/features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { vehCategories, vehMakes } from '../../data/staticArrays'
import { MdArrowBack } from 'react-icons/md'
import carbonFiber from '../../assets/carbonFiber.jpeg'


const Gallery = () => {
    const dispatch = useDispatch()

    const [categoryChosen, setCategoryChosen] = useState(vehCategories[0])
    const [vehicleChosen, setVehicleChosen] = useState(vehMakes[0])
    const [pageNumber, setPageNumber] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [filterChosen, setFilterChosen] = useState(undefined)
    const [galleryImgs, setGalleryImgs] = useState(undefined)
    const [singleImgView, setSingleImgView] = useState(undefined)

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i)
    const pageNumberRef = useRef(pageNumber)

    const changePaginatedResults = async () => {
        try {
            const res = await getPaginatedGalleryImages(pageNumber, 'noFilter')

            if (res) {
                setGalleryImgs(res.paginatedImgs)
                setNumberOfPages(res.totalPages)
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

    const filterGalleryByTags = async (filter) => {
        if (filter === 'All Categories' || filter === 'All Vehicles') {
            return getAllGalleryImages()
        }
        setCategoryChosen(filter)
        setVehicleChosen(filter)
        setFilterChosen(filter)
        try {
            const res = await getPaginatedGalleryImages(pageNumberRef.current, filter)
            if (res) {
                setGalleryImgs(res.paginatedImgs)
                setNumberOfPages(res.totalPages)
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

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
        pageNumberRef.current = Math.max(0, pageNumber - 1)
        if (filterChosen !== undefined) {
            filterGalleryByTags(filterChosen)
        }
    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
        pageNumberRef.current = Math.min(numberOfPages - 1, pageNumber + 1)
        if (filterChosen !== undefined) {
            filterGalleryByTags(filterChosen)
        }
    };


    useEffect(() => {
        if (pageNumber >= 0) {
            changePaginatedResults()
        }
    }, [pageNumber])

    const getAllGalleryImages = async () => {
        try {
            const res = await getPaginatedGalleryImages(pageNumber, 'noFilter')

            if (res) {
                setGalleryImgs(res.paginatedImgs)
                setNumberOfPages(res.totalPages)
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
        <div className='bg-matteBlack min-h-[100vh] w-full flex flex-col items-center p-[1rem] montFont z-50'>
            <div className='h-[8%] w-full flex justify-center items-center text-[22px] md:text-[26px] bg-matteBlack text-darkBlue '>GALLERY</div>
            <div className="min-h-[80%] w-full rounded-md" style={{ background: `url(${carbonFiber}) center center / cover`, height: '100%' }}>
                <div className='h-full w-full bg-black bg-opacity-90 rounded-md flex flex-col md:flex-row gap-[2%] md:gap-0'>
                    <div className="h-[24%] w-full md:h-full md:w-[15%] flex flex-col">
                        <div className='h-[20%] md:h-[4%] md:w-full flex items-center justify-center bg-darkBlue md:bg-darkBlue font-bold rounded-tl-md text-[18px]'>Categories</div>
                        <div className='h-[80%] md:h-[96%] w-full md:py-[10px] grid grid-cols-6 grid-rows-3  md:flex md:flex-col bg-darkerGray insetShadow bg-opacity-40'>
                            {vehCategories && vehCategories.map((category) => {
                                return <div key={category} className={`${categoryChosen === category ? 'bg-black' : 'bg-darkerGray'} h-full md:h-[5%] w-full md:pl-[10px] border-[1px] md:border-t-0 md:border-l-0 md:border-r-0 md:border-b-[1px] border-darkBlue border-opacity-20 md:border-black text-white text-center text-[10px] cursor-pointer insetShadow hover:bg-black`} onClick={() => filterGalleryByTags(category)} >{category}</div>
                            })}
                        </div>
                    </div>
                    <div className='h-[52%] w-full md:h-full md:w-[70%] flex flex-col px-2 bg-darkerGray bg-opacity-50 overflow-y-scroll'>
                        <div className={` h-full w-full p-[10px]`}>
                            <div className="h-full w-full flex flex-col items-center">
                                <div className={`h-[85%] md:h-[90%] w-full ${singleImgView === undefined ? 'grid grid-cols-1 deskSm:grid-cols-2 gap-[4%] auto-rows-min' : 'flex'} place-items-center bg-matteBlack bg-opacity-30 rounded-md overflow-y-scroll pt-[1rem]`}>
                                    {singleImgView === undefined && galleryImgs && galleryImgs.length > 0 && galleryImgs.map((img) => {
                                        return <div key={img._id} className="min-h-[80%] w-[80%] relative">
                                            <img src={img.urls[0]} className="h-full w-full object-cover rounded-md cursor-pointer insetShadow" onClick={() => setSingleImgView(img.urls[0])}></img>
                                            <span className="opacity-0 rounded-lg scale-[0.9] h-full w-full bg-matteBlack text-white hover:opacity-95 absolute top-0 flex justify-center items-center cursor-pointer insetShadow" onClick={() => setSingleImgView(img.urls[0])}>{img.vehicleDescription}</span>
                                        </div>
                                    })}
                                    {singleImgView !== undefined && < div className="h-[80%] md:min-h-[70vh] md:z-[50] w-full relative flex justify-center items-center cursor-pointer" >
                                        <img src={singleImgView} className="h-[80%] w-[94%] object-contain rounded-md cursor-pointer" onClick={() => setSingleImgView(undefined)}></img>
                                        <MdArrowBack className="absolute top-2 left-2 text-[28px] cursor-pointer text-white" onClick={() => setSingleImgView(undefined)} />
                                    </div >}
                                </div>
                                <div className="h-[10%] deskSm:h-[5%] w-full flex justify-center items-center gap-[5%]">
                                    <button className="h-[80%] w-[25%] md:w-[15%] bg-darkBlue rounded-md insetShadow text-white" onClick={gotoPrevious}>Previous</button>
                                    {pages.map((pageIndex) => {
                                        if (pageIndex < 3) {
                                            return <>
                                                <button key={pageIndex} className={`${pageIndex === pageNumber ? 'text-loaderGreen' : 'text-white'}`} onClick={() => setPageNumber(pageIndex)}>
                                                    {pageIndex + 1}
                                                </button>
                                            </>
                                        }
                                    })}
                                    {pages.length > 3 && <span className={`${pageNumber > 3 ? 'text-loaderGreen' : 'text-white'}`}>...</span>}
                                    <button className="h-[80%] w-[25%] md:w-[15%] bg-darkBlue rounded-md insetShadow text-white" onClick={gotoNext}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[24%] w-full md:h-full md:w-[15%] flex flex-col">
                        <div className='h-[20%] md:h-[4%] md:w-full flex items-center justify-center bg-darkBlue md:bg-darkBlue font-bold rounded-tr-md text-[18px]'>Vehicle Makes</div>
                        <div className='h-[80%] md:h-[96%] w-full md:py-[10px] grid grid-cols-6 grid-rows-3  md:flex md:flex-col bg-matteBlack overflow-y-scroll'>
                            {vehMakes && vehMakes.map((make) => {
                                return <div key={make} className={`${vehicleChosen === make ? 'bg-black' : 'bg-darkerGray'} h-full md:min-h-[5%] w-full md:pl-[10px] border-[1px] md:border-t-0 md:border-l-0 md:border-r-0 md:border-b-[1px] border-darkBlue border-opacity-20 md:border-black text-white text-center text-[10px] cursor-pointer insetShadow hover:bg-black`} onClick={() => filterGalleryByTags(make)} >{make}</div>
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Gallery