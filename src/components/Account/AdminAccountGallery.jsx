import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { deleteImgFromCloudAndDb, getPaginatedGalleryImages, uploadGalleryPhotosAdmin } from "../../services/authService";
import { SET_ERROR_MSG, SET_SUCCESS_MSG, selectUser } from '../../redux/features/auth/authSlice'
import { initialVehCategoriesCheck, initialVehMakesCheck } from "../../data/staticObjects";
import { vehCategories, vehMakes } from "../../data/staticArrays";
import { MdArrowBack } from 'react-icons/md'

const initialVehicleInfoState = {
    vehicleInfo: ''
}
const initialUserSearchTerm = {
    searchTerm: ''
}

const AdminAccountGallery = () => {
    const dispatch = useDispatch()

    const userRedux = useSelector(selectUser)

    const [imagesState, setImagesState] = useState([]);
    const [message, setMessage] = useState("");
    const [viewGallery, setViewGallery] = useState(false)
    const [galleryImgs, setGalleryImgs] = useState(undefined)
    const [singleImgView, setSingleImgView] = useState(undefined)
    const [confirmDeleteImg, setConfirmDeleteImg] = useState(false)
    const [doneSelectingCategories, setDoneSelectingCategories] = useState(false)
    const [doneSelectingVehicle, setDoneSelectingVehicle] = useState(false)
    const [vehCategoriesCheck, setVehCategoriesCheck] = useState(initialVehCategoriesCheck)
    const [vehMakeCheck, setVehMakeCheck] = useState(initialVehMakesCheck)
    const [alreadySelectedVehicle, setAlreadySelectedVehicle] = useState(false)
    const [finalVehicleInfo, setFinalVehicleInfo] = useState(initialVehicleInfoState)
    const { vehicleInfo } = finalVehicleInfo
    const [userSearchTerm, setUserSearchTerm] = useState(initialUserSearchTerm)
    const { searchTerm } = userSearchTerm
    const [searchTagResults, setSearchTagResults] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [filterChosen, setFilterChosen] = useState(undefined)

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

        setFilterChosen(filter)
        setUserSearchTerm({ searchTerm: filter })
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

    const selectFilesHandler = async (e) => {
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
    const uploadFilesHandler = async () => {
        setMessage("Uploading...");
        const categoryTags = []
        const vehicleTags = []
        for (let i = 0; i < vehCategories.length; i++) {
            if (vehCategoriesCheck[vehCategories[i]]) {
                categoryTags.push(vehCategories[i])
            }
        }
        for (let i = 0; i < vehMakes.length; i++) {
            if (vehMakeCheck[vehMakes[i]]) {
                vehicleTags.push(vehMakes[i])
            }
        }

        const dataToSend = {
            file: imagesState[0],
            vehicleDescription: finalVehicleInfo.vehicleInfo,
            categoryTags: categoryTags,
            vehicleTags: vehicleTags,
            userRefId: userRedux.userId
        }

        try {
            const res = await uploadGalleryPhotosAdmin(dataToSend)
            if (res) {
                setMessage("Done!");
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Image successfully uploaded! View in gallery' }))
                resetImgUpload()
                getAllGalleryImages()
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
        }
    };

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

    const toggleVehCategoryChosen = (category) => {
        if (vehCategoriesCheck[category]) {
            setVehCategoriesCheck({ ...vehCategoriesCheck, [category]: false })
        } else {
            setVehCategoriesCheck({ ...vehCategoriesCheck, [category]: true })
        }
    }
    const toggleVehMakeChosen = (make) => {
        if (!alreadySelectedVehicle) {
            setAlreadySelectedVehicle(true)
            setVehMakeCheck({ ...vehMakeCheck, [make]: true })
        } else {
            setAlreadySelectedVehicle(false)
            setVehMakeCheck(initialVehMakesCheck)
        }
    }

    const finishSelectingCategories = () => {
        if (imagesState.length === 0) {
            return dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please select image file and tags before continuing!' }))
        }
        let tagCounter = 0

        for (let i = 0; i < Object.keys(vehCategoriesCheck).length; i++) {
            if (vehCategoriesCheck[vehCategories[i]]) {
                tagCounter += 1
            }
        }

        if (tagCounter === 0) {
            setDoneSelectingCategories(false)
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please select at least one image tag before continuing!' }))
        } else {
            setDoneSelectingCategories(true)
        }
    }
    const finishSelectingMake = () => {
        let tagCounter = 0

        for (let i = 0; i < Object.keys(vehMakeCheck).length; i++) {
            if (vehMakeCheck[vehMakes[i]]) {
                tagCounter += 1
            }
        }

        if (tagCounter === 0) {
            setDoneSelectingVehicle(false)
            dispatch(SET_ERROR_MSG({ showErrMsg: true, errorMsg: 'Please select one vehicle-make tag before continuing!' }))
        } else {
            setDoneSelectingVehicle(true)
        }
    }

    const resetImgUpload = () => {
        setImagesState([])
        setVehCategoriesCheck(initialVehCategoriesCheck)
        setVehMakeCheck(initialVehMakesCheck)
        setDoneSelectingCategories(false)
        setDoneSelectingVehicle(false)
        setDoneSelectingVehicle(false)
        setFinalVehicleInfo(initialVehicleInfoState)
    }
    const deleteImage = async (secureUrl) => {
        const desiredImg = galleryImgs.filter((img) => img.urls[0] === secureUrl)
        const id = desiredImg[0]._id
        try {
            const res = await deleteImgFromCloudAndDb(id)
            if (res) {
                dispatch(SET_SUCCESS_MSG({ showSuccessMsg: true, successMsg: 'Image deleted successfully!' }))
                setConfirmDeleteImg(false)
                setSingleImgView(undefined)
                getAllGalleryImages()
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

    const handleSearchChange = (e) => {
        setUserSearchTerm({ searchTerm: e.target.value })
        let matchingTags = []

        for (let i = 0; i < vehCategories.length; i++) {
            if (vehCategories[i].toLowerCase().includes(userSearchTerm.searchTerm.toLowerCase()) && matchingTags.length < 20) {
                matchingTags.push(vehCategories[i])
            }
        }
        for (let i = 0; i < vehMakes.length; i++) {
            if (vehMakes[i].toLowerCase().includes(userSearchTerm.searchTerm.toLowerCase()) && matchingTags.length < 20) {
                matchingTags.push(vehMakes[i])
            }
        }
        setSearchTagResults(matchingTags)
    }

    useEffect(() => {
        if (pageNumber >= 0 && userSearchTerm.searchTerm === '') {
            changePaginatedResults()
        }
    }, [pageNumber, userSearchTerm])

    return (
        <div className="h-full w-full flex flex-col items-center montFont overflow-y-scroll">
            <div className="h-[8%] w-full relative flex justify-center items-center font-semibold p-[4px]">
                <button className="bg-loaderGreen text-matteBlack text-[12px] font-semibold h-[3vh] w-[30%] rounded-md hover:bg-opacity-40 translate-y-1" onClick={() => setViewGallery((prev) => !prev)}>{viewGallery ? 'Upload Image' : 'View Gallery'}</button>
            </div>
            {singleImgView !== undefined && < div className="h-[80%] md:min-h-[70vh] md:z-[50] w-full relative flex justify-center items-center cursor-pointer" >
                <img src={singleImgView} className="h-[80%] w-[94%] object-contain rounded-md cursor-pointer" onClick={() => setSingleImgView(undefined)}></img>
                {
                    !confirmDeleteImg ?
                        <button className="h-[3vh] w-[40%] bg-brightRed absolute top-1 rounded-md bg-opacity-30 insetShadow hover:bg-opacity-90" onClick={() => setConfirmDeleteImg(true)}>Delete Image</button>
                        : <div className="h-[4vh] w-full absolute top-0 flex justify-center items-center gap-[5%]">
                            <button className="h-[3vh] w-[30%] bg-paleYellow rounded-md bg-opacity-30 insetShadow hover:bg-opacity-90" onClick={() => setConfirmDeleteImg(false)}>Cancel</button>
                            <button className="h-[3vh] w-[30%] bg-brightRed rounded-md bg-opacity-30 insetShadow hover:bg-opacity-90" onClick={() => deleteImage(singleImgView)}>Delete Image</button>
                        </div>
                }
                <MdArrowBack className="absolute top-2 left-2 text-[28px] cursor-pointer" onClick={() => setSingleImgView(undefined)} />
            </div >}
            {!viewGallery ?
                // UPLOAD IMG
                <div className={`${doneSelectingCategories ? 'h-full' : 'h-[80%]'} ${singleImgView !== undefined ? 'hidden' : 'flex'} w-full flex-col bg-matteBlack bg-opacity-50`}>
                    <div className="h-[15%] w-full flex justify-center items-center bg-matteBlack ">
                        <input
                            type="file"
                            onChange={selectFilesHandler}
                            accept="image/*"
                            className="rounded-sm pl-[18%]"
                        />
                    </div>
                    <div className="h-[85%] w-full flex flex-col">
                        {!doneSelectingCategories ?
                            <div className="h-[80%] w-full flex flex-col items-center">
                                <div className="h-[12%] w-full flex justify-center items-center text-[11px]">Please Select All Applicable Image Tags</div>
                                <div className="h-[88%] w-full p-[8px] grid grid-cols-5 gap-2 place-items-center">
                                    {vehCategories.map((category) => {
                                        if (category === 'All Categories') {
                                            return undefined
                                        }
                                        return <button key={category} className={`${vehCategoriesCheck[category] ? 'bg-darkBlue insetShadow' : ''} h-[60%] w-[80%] text-[10px] rounded-md hover:bg-darkBlue`} onClick={() => toggleVehCategoryChosen(category)}>{category}</button>
                                    })}
                                    <button className={`h-[60%] w-[80%] text-[10px] rounded-md text-white font-semibold bg-loaderGreen bg-opacity-50 hover:bg-opacity-90 insetShadow`} onClick={() => finishSelectingCategories()}>Done</button>
                                </div>
                            </div>
                            : doneSelectingCategories && !doneSelectingVehicle ? <div className="h-full w-full flex flex-col items-center">
                                <div className="h-[12%] w-full flex justify-center items-center text-center text-[11px]">Please Select Applicable Vehicle Make</div>
                                <div className="h-[88%] w-full p-[8px] grid grid-cols-5 gap-2 place-items-center">
                                    {vehMakes.map((make) => {
                                        if (make === 'All Vehicles') {
                                            return undefined
                                        }
                                        return <button key={make} className={`${vehMakeCheck[make] ? 'bg-darkBlue insetShadow' : ''} h-[60%] w-[80%] text-[10px] rounded-md hover:bg-darkBlue`} onClick={() => toggleVehMakeChosen(make)}>{make}</button>
                                    })}
                                    <button className={`h-[60%] w-[80%] text-[10px] rounded-md text-white font-semibold bg-loaderGreen bg-opacity-50 hover:bg-opacity-90 insetShadow`} onClick={() => finishSelectingMake()}>Done</button>
                                </div>
                            </div> : <div className="h-full w-full flex flex-col items-center">
                                <div className="h-[12%] w-full flex justify-center items-center gap-[10%] text-center text-[11px]">
                                    <h3 className="">Image and Vehicle Tags Chosen</h3>
                                    <button className="h-[40%] w-[10%] bg-brightRed bg-opacity-40 rounded-sm insetShadow hover:bg-opacity-90" onClick={() => resetImgUpload()}>Reset</button>
                                </div>
                                <div className="h-[33%] w-[96%] rounded-md p-[8px] grid grid-cols-5 bg-matteBlack bg-opacity-50 gap-2 place-items-center">
                                    {vehCategories.map((category) => {
                                        if (vehCategoriesCheck[category]) {
                                            return <button key={category} className={` h-[100%] deskSm:h-[60%] w-[80%] text-[7px] tall:text-[9px] deskSm:text-[10px] overflow-hidden rounded-md bg-darkBlue bg-opacity-70`} disabled>{category}</button>
                                        }
                                    })}
                                    {vehMakes.map((make) => {
                                        if (vehMakeCheck[make]) {
                                            return <button key={make} className={` h-[100%] deskSm:h-[60%] w-[80%] text-[7px] tall:text-[9px] deskSm:text-[10px] overflow-hidden rounded-md bg-darkBlue insetShadow`} disabled>{make.toUpperCase()}</button>
                                        }
                                    })}
                                </div>
                                <div className="h-[12%] w-full flex justify-center items-center gap-[10%] text-center text-[11px]">
                                    <h3 className="">Provide Full Vehicle Name And Upload</h3>

                                </div>
                                <div className="h-[33%] w-[96%] rounded-md p-[8px] flex justify-center items-center bg-matteBlack bg-opacity-50 gap-2 ">
                                    <input type="text" name="vehicleInfo" value={vehicleInfo} className="outline-none h-[3vh] w-[50%] text-center text-[12px] text-matteBlack" placeholder="Toyota Camry XLE" onChange={(e) => setFinalVehicleInfo({ vehicleInfo: e.target.value })} />
                                    <button className="h-[3vh] w-[20%] bg-loaderGreen bg-opacity-30 insetShadow text-black font-semibold cursor-pointer hover:bg-opacity-90" onClick={uploadFilesHandler}>Upload</button>
                                    <p className="">{message}</p>
                                </div>
                            </div>}
                    </div>
                </div>
                // VIEW GALLERY
                : <div className={`${singleImgView !== undefined ? 'hidden' : 'flex'} h-full w-full p-[10px]`}>
                    <div className="h-full w-full flex flex-col items-center">
                        <div className="hidden h-[13%] md:h-[20%] w-full deskSm:flex justify-center md:justify-start items-center bg-matteBlack rounded-tl-md rounded-tr-md px-[8px]">
                            <input type="search" name="searchTerm" value={searchTerm} placeholder="Search Tags" className="w-[60%] md:w-[30%] md:h-[30%]  outline-none bg-slate-300 text-matteBlack text-center" onChange={(e) => handleSearchChange(e)} />

                            <div className="h-full w-[60%] p-[1rem] grid grid-cols-3 gap-[4px] auto-rows-auto overflow-y-scroll">
                                {searchTagResults && searchTagResults.length > 0 && searchTagResults.map((result) => {
                                    if (result === 'All Categories' || result === 'All Vehicles') {
                                        return undefined
                                    } else {
                                        return <button key={result} className="text-[12px] min-h-[3vh] w-[90%] bg-darkBlue bg-opacity-30 rounded-md" onClick={() => filterGalleryByTags(result)}>{result}</button>
                                    }
                                })}
                            </div>
                        </div>

                        <div className={`h-[85%] md:h-[90%] w-full ${singleImgView === undefined ? 'grid grid-cols-1 deskSm:grid-cols-2 gap-[4%] auto-rows-min' : 'flex'} place-items-center bg-matteBlack bg-opacity-30 rounded-md overflow-y-scroll pt-[1rem]`}>
                            {singleImgView === undefined && galleryImgs && galleryImgs.length > 0 && galleryImgs.map((img) => {
                                return <div key={img._id} className="min-h-[80%] w-[80%] relative">
                                    <img src={img.urls[0]} className="h-full w-full object-cover rounded-md cursor-pointer insetShadow" onClick={() => setSingleImgView(img.urls[0])}></img>
                                    <span className="opacity-0 rounded-lg scale-[0.9] h-full w-full bg-matteBlack hover:opacity-95 absolute top-0 flex justify-center items-center cursor-pointer insetShadow" onClick={() => setSingleImgView(img.urls[0])}>{img.vehicleDescription}</span>
                                </div>
                            })}
                        </div>
                        <div className="h-[10%] deskSm:h-[5%] w-full flex justify-center items-center gap-[5%]">
                            <button className="h-[80%] w-[25%] md:w-[15%] bg-darkBlue rounded-md insetShadow" onClick={gotoPrevious}>Previous</button>
                            {pages.map((pageIndex) => {
                                if (pageIndex < 3) {
                                    return <>
                                        <button key={pageIndex} className={`${pageIndex === pageNumber ? 'text-loaderGreen' : ''}`} onClick={() => setPageNumber(pageIndex)}>
                                            {pageIndex + 1}
                                        </button>
                                    </>
                                }
                            })}
                            {pages.length > 3 && '...'}
                            <button className="h-[80%] w-[25%] md:w-[15%] bg-darkBlue rounded-md insetShadow" onClick={gotoNext}>Next</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default AdminAccountGallery
