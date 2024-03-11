import Navbar from "../components/Navbar/Navbar"
import { useEffect, useState } from "react"
import { MdCheck } from "react-icons/md"
import { servicesMapper } from "../data/staticObjects"
import { useDispatch, useSelector } from "react-redux"
import { SET_SERVICE_PAGE_INFO_GUIDE, selectServicePageInfoGuide, selectShowNavModal } from "../redux/features/auth/authSlice"
import NavbarModal from "../components/Navbar/NavbarModal"
// import { useSelector } from "react-redux"
// import { selectShowNavModal } from "../redux/features/auth/authSlice"

const Services = () => {
    const dispatch = useDispatch()

    const showNavModalRedux = useSelector(selectShowNavModal)
    const servicePageInfoGuideRedux = useSelector(selectServicePageInfoGuide)

    const [imgSrc, setImgSrc] = useState(servicesMapper.exterior.imgSrc)
    const [title, setTitle] = useState(servicesMapper.exterior.title)
    const [summary, setSummary] = useState(servicesMapper.exterior.summary)
    const [checklist, setChecklist] = useState(servicesMapper.exterior.checklist)
    const [pricing, setPricing] = useState(servicesMapper.exterior.pricing)
    const [steps, setSteps] = useState(servicesMapper.exterior.steps)
    const [disclaimer, setDisclaimer] = useState(servicesMapper.exterior.disclaimer)
    const [packageChosen, setPackageChosen] = useState('exterior')

    const changePackage = (indexer) => {
        const newPackage = servicesMapper[indexer]

        setPackageChosen(indexer)
        setImgSrc(newPackage.imgSrc)
        setTitle(newPackage.title)
        setSummary(newPackage.summary)
        setChecklist(newPackage.checklist)
        setPricing(newPackage.pricing)
        setSteps(newPackage.steps)
        setDisclaimer(newPackage.disclaimer)
    }

    useEffect(() => {
        if (servicePageInfoGuideRedux !== undefined) {
            changePackage(servicePageInfoGuideRedux)
            dispatch(SET_SERVICE_PAGE_INFO_GUIDE(undefined))

        }
    }, [servicePageInfoGuideRedux])

    return (
        <div className="h-[100vh] w-full flex flex-col overflow-y-scroll bg-matteBlack montFont"
        >
            {showNavModalRedux ? <NavbarModal /> : <>
                <Navbar />
                <div className="h-[30%] w-full mt-[10vh] overflow-hidden border-[10px] border-darkBlue md:border-matteBlack">
                    <img src={imgSrc} alt="" className="h-full w-full object-cover slideDone" />
                </div>
                <div className="h-[70%] w-full bg-darkBlue flex flex-col md:flex-row p-[4px]">
                    <div className="h-[20%] md:h-full w-full md:w-[20%] bg-darkBlue insetShadowBlue bg-opacity-90 rounded-sm flex flex-col items-center">
                        <h3 className="h-[30%] md:h-[12%] w-[90%] text-center text-matteBlack text-[15px] tall:text-[18px] font-semibold">Please Select Detailing Package</h3>
                        <div className="h-[70%] md:h-[88%] w-full md:w-[90%] flex md:flex-col justify-evenly md:justify-evenly items-center">
                            <button className={`${packageChosen === 'exterior' ? 'bg-opacity-50' : ''} h-[80%] md:h-1/6 w-1/6 md:w-full text-[12px] md:text-[14px] bg-matteBlack cursor-pointer rounded-sm text-matteBlack bg-opacity-10 hover:bg-opacity-50`} onClick={() => changePackage('exterior')}>Exterior</button>
                            <button className={`${packageChosen === 'interior' ? 'bg-opacity-50' : ''} h-[80%] md:h-1/6 w-1/6 md:w-full text-[12px] md:text-[14px] bg-matteBlack cursor-pointer rounded-sm text-matteBlack bg-opacity-10 hover:bg-opacity-50`} onClick={() => changePackage('interior')}>Interior</button>
                            <button className={`${packageChosen === 'basicCombo' ? 'bg-opacity-50' : ''} h-[80%] md:h-1/6 w-1/6 md:w-full text-[12px] md:text-[14px] bg-matteBlack cursor-pointer rounded-sm text-matteBlack bg-opacity-10 hover:bg-opacity-50`} onClick={() => changePackage('basicCombo')}>Basic Combo</button>
                            <button className={`${packageChosen === 'premiumCombo' ? 'bg-opacity-50' : ''} h-[80%] md:h-1/6 w-1/6 md:w-full text-[12px] md:text-[14px] bg-matteBlack cursor-pointer rounded-sm text-matteBlack bg-opacity-10 hover:bg-opacity-50`} onClick={() => changePackage('premiumCombo')}>Premium Combo</button>
                            <button className={`${packageChosen === 'ultraCombo' ? 'bg-opacity-50' : ''} h-[80%] md:h-1/6 w-1/6 md:w-full text-[12px] md:text-[14px] bg-matteBlack cursor-pointer rounded-sm text-matteBlack bg-opacity-10 hover:bg-opacity-50`} onClick={() => changePackage('ultraCombo')}>Ultra Combo</button>
                        </div>
                    </div>
                    <div className="h-[80%] md:h-full w-full flex bg-matteBlack rounded-md p-[5px]">
                        <div className="h-full w-[70%] flex flex-col items-center gap-[1rem] border-[1px] border-r-darkBlue border-matteBlack overflow-y-scroll">
                            <h1 className="h-[10%] w-full text-center text-darkBlue text-[18px] md:text-[22px] font-semibold">{title}</h1>
                            <h3 className="h-[20%] md:h-[10%] w-full text-darkBlue text-[12px] md:text-[15px] text-center font-thin">{summary}</h3>
                            <h2 className="h-[10%] w-full text-loaderGreen text-[16px] md:text-[18px] text-center font-thin">{pricing}</h2>
                            <div className={`${checklist && checklist.length === 5 ? 'gap-[4%]' : 'gap-[6%]'} h-[40%] w-full flex flex-col items-center justify-start font-thin text-[16px]`}>
                                {checklist && checklist.map((item, i) => {
                                    return <div key={`${item}-${i}`} className='h-[15%] w-full flex justify-center gap-[5%] items-center text-darkBlue'>
                                        <MdCheck className='text-green-500' />
                                        <h4 className="text-[10px] md:text-[12px] lg:text-[13px]">{item}</h4>
                                    </div>
                                })}
                            </div>
                            <div className="min-h-[40vh] w-full flex flex-col gap-[2px] pr-[9px] p-[4px]">
                                <h2 className="text-darkBlue brightness-200 text-[14px] border-[1px] border-matteBlack border-b-darkBlue insetShadow text-center rounded-sm pl-[2px]">FULL 5-STEP SERVICE</h2>
                                {steps && steps.map((step) => {
                                    return <div key={step.process} className="h-[16%] w-full flex items-center bg-white">
                                        <div className="h-full w-[10%] flex items-center justify-center bg-darkBlue text-white text-[18px]">
                                            {step.step}
                                        </div>
                                        <div className="h-full w-[90%] bg-darkBlue bg-opacity-70 text-[10px] md:text-[12px] lg:text-[13px] xxl:text-[16px] pl-[4px]">{step.process}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="h-full w-[30%] flex flex-col items-center px-[3px] overflow-y-scroll">
                            <h1 className="h-[10%] w-full text-center text-brightRed text-[14px] md:text-[20px] font-semibold">Disclaimer</h1>
                            <p className="h-[90%] w-full text-center text-[10px] md:text-[13px] p-[4px] md:p-[10px] text-darkBlue">{disclaimer}</p>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default Services