import Navbar from "../Navbar/Navbar"
import { useRef, useState } from 'react'
import dryingCar from '../../assets/dryingCar.jpeg'
import tireClean from '../../assets/tireClean.jpeg'
import carPolish from '../../assets/carPolish.jpeg'
import cleanInside from '../../assets/cleanInside.jpeg'
import freshDrive from '../../assets/freshDrive.jpeg'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_HOME_PAGE_SCROLL_GUIDE, selectHomePageScrollGuide, selectShowNavModal } from "../../redux/features/auth/authSlice"
import { AiFillDownCircle } from 'react-icons/ai'
import HeroText from "./HeroText"
import { page1Heading1, page1Heading2, page1Paragraph, page2Heading1, page2Heading2, page2Paragraph, page3Heading1, page3Heading2, page3Paragraph, page4Heading1, page4Heading2, page4Paragraph, page5Heading1, page5Heading2, page5Paragraph } from "../../data/strings"
import NavbarModal from "../Navbar/NavbarModal"


const pageMapper = {
    0: [page1Heading1, page1Heading2, page1Paragraph],
    1: [page2Heading1, page2Heading2, page2Paragraph],
    2: [page3Heading1, page3Heading2, page3Paragraph],
    3: [page4Heading1, page4Heading2, page4Paragraph],
    4: [page5Heading1, page5Heading2, page5Paragraph],
}

const Hero = () => {
    const dispatch = useDispatch()

    const showNavbarModalRedux = useSelector(selectShowNavModal)
    const homePageScrollGuideRedux = useSelector(selectHomePageScrollGuide)

    let slideShow = useRef(null)

    const [slidePage, setSlidePage] = useState(0)
    const [stopSlides, setStopSlides] = useState(false)
    const [heading1, setHeading1] = useState(page1Heading1)
    const [heading2, setHeading2] = useState(page1Heading2)
    const [paragraph, setParagraph] = useState(page1Paragraph)


    function updateSlides(counter) {
        if (counter === 1) {
            setSlidePage(1)
            setHeading1(page2Heading1)
            setHeading2(page2Heading2)
            setParagraph(page2Paragraph)
            let nextSlide = document.getElementById(`slider-${counter}`)
            nextSlide.classList.remove('hidden')
            nextSlide.classList.add('activeImg')
            let prev = counter - 1
            let prevSlide = document.getElementById(`slider-${prev}`)
            prevSlide.classList.add('hidden')
            prevSlide.classList.remove('activeImg')
        } else if (counter !== 5) {
            if (counter === 2) {
                setSlidePage(2)
                setHeading1(page3Heading1)
                setHeading2(page3Heading2)
                setParagraph(page3Paragraph)
            } else if (counter === 3) {
                setSlidePage(3)
                setHeading1(page4Heading1)
                setHeading2(page4Heading2)
                setParagraph(page4Paragraph)
            } else if (counter === 4) {
                setSlidePage(4)
                setHeading1(page5Heading1)
                setHeading2(page5Heading2)
                setParagraph(page5Paragraph)
            }
            let next = counter
            let prev = counter - 1
            let nextSlide = document.getElementById(`slider-${next}`)
            let prevSlide = document.getElementById(`slider-${prev}`)
            nextSlide.classList.remove('hidden')
            nextSlide.classList.add('activeImg')
            prevSlide.classList.add('hidden')
            prevSlide.classList.remove('activeImg')
        } else {
            setSlidePage(0)
            setHeading1(page1Heading1)
            setHeading2(page1Heading2)
            setParagraph(page1Paragraph)
            let prev = 4 //non-dynamic -- upd here if more slides
            let next = 0

            let prevSlide = document.getElementById(`slider-${prev}`)
            let nextSlide = document.getElementById(`slider-${next}`)

            prevSlide.classList.add('hidden')
            prevSlide.classList.remove('activeImg')
            nextSlide.classList.remove('hidden')
            nextSlide.classList.add('slideDone')

        }
        counter += 1
    }

    const nextSlide = () => {
        setStopSlides(true)
        if (slidePage !== 4) {
            let prev = slidePage
            let next = slidePage + 1
            let curHeading1 = pageMapper[next][0]
            let curHeading2 = pageMapper[next][1]
            let curParagraph = pageMapper[next][2]
            setHeading1(curHeading1)
            setHeading2(curHeading2)
            setParagraph(curParagraph)

            setSlidePage((prev) => prev + 1)
            let prevSlide = document.getElementById(`slider-${prev}`)
            let nextSlide = document.getElementById(`slider-${next}`)
            prevSlide.classList.add('hidden')
            prevSlide.classList.remove('activeImg')
            nextSlide.classList.add('activeImg')
            nextSlide.classList.remove('hidden')

        } else {
            let prev = slidePage
            let next = 0
            setHeading1(page1Heading1)
            setHeading2(page1Heading2)
            setParagraph(page1Paragraph)
            setSlidePage(0)
            let prevSlide = document.getElementById(`slider-${prev}`)
            let nextSlide = document.getElementById(`slider-${next}`)
            prevSlide.classList.add('hidden')
            prevSlide.classList.remove('activeImg')
            nextSlide.classList.add('activeImg')
            nextSlide.classList.remove('hidden')
        }
    }

    const prevSlide = () => {
        setStopSlides(true)
        if (slidePage !== 0) {
            let prev = slidePage
            let next = slidePage - 1
            let curHeading1 = pageMapper[next][0]
            let curHeading2 = pageMapper[next][1]
            let curParagraph = pageMapper[next][2]
            setHeading1(curHeading1)
            setHeading2(curHeading2)
            setParagraph(curParagraph)
            setSlidePage((prev) => prev - 1)
            let prevSlide = document.getElementById(`slider-${prev}`)
            let nextSlide = document.getElementById(`slider-${next}`)
            prevSlide.classList.add('hidden')
            prevSlide.classList.remove('activeImg')
            nextSlide.classList.add('activeImg')
            nextSlide.classList.remove('hidden')

        } else {
            let prev = slidePage
            let next = 4
            setHeading1(page5Heading1)
            setHeading2(page5Heading2)
            setParagraph(page5Paragraph)
            setSlidePage(4)
            let prevSlide = document.getElementById(`slider-${prev}`)
            let nextSlide = document.getElementById(`slider-${next}`)
            prevSlide.classList.add('hidden')
            prevSlide.classList.remove('activeImg')
            nextSlide.classList.add('activeImg')
            nextSlide.classList.remove('hidden')
        }
    }

    const scrollToNextPage = () => {
        const windowHeight = window.innerHeight
        const homeWindow = document.getElementById('home')
        homeWindow.scrollTo({ top: windowHeight, left: 0, behavior: 'smooth' })
    }
    const scrollToBookingSystemPage = () => {
        const windowHeight = window.innerHeight
        const homeWindow = document.getElementById('home')
        homeWindow.scrollTo({ top: windowHeight * 2, left: 0, behavior: 'smooth' })
    }
    const scrollToPricingPage = () => {
        const windowHeight = window.innerHeight
        const homeWindow = document.getElementById('home')
        homeWindow.scrollTo({ top: windowHeight * 3, left: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        if (homePageScrollGuideRedux === 2) {
            scrollToNextPage()
            dispatch(SET_HOME_PAGE_SCROLL_GUIDE(0))
        }
        if (homePageScrollGuideRedux === 3) {
            scrollToBookingSystemPage()
            dispatch(SET_HOME_PAGE_SCROLL_GUIDE(0))
        }
        if (homePageScrollGuideRedux === 4) {
            scrollToPricingPage()
            dispatch(SET_HOME_PAGE_SCROLL_GUIDE(0))
        }
    }, [homePageScrollGuideRedux])

    useEffect(() => {
        if (!stopSlides) {
            if (!showNavbarModalRedux) {
                let counter = 1
                slideShow.current = setInterval(() => {
                    updateSlides(counter)
                    if (counter === 5) {
                        clearInterval(slideShow.current)
                    }
                    counter += 1
                }, 4000)
                return () => {
                    clearInterval(slideShow.current)
                }
            }
        }
    }, [stopSlides, showNavbarModalRedux])

    // fix mobile issue: clicking sublinks do they fire ?  
    return (

        <div className="min-h-[100vh] w-full relative bg-black overflow-y-hidden" >
            {showNavbarModalRedux ?
                <NavbarModal />
                : <>
                    <div className="h-[100vh] w-full activeImg" id="slider-0" style={{ background: `url(${dryingCar}) center center / cover`, maxWidth: '100%' }}></div>
                    <div className="h-[100vh] w-full top-0 hidden" id="slider-1" style={{ background: `url(${tireClean}) center center / cover`, maxWidth: '100%' }}></div>
                    <div className="h-[100vh] w-full top-0 hidden" id="slider-2" style={{ background: `url(${cleanInside}) center center / cover`, maxWidth: '100%' }}></div>
                    <div className="h-[100vh] w-full top-0 hidden" id="slider-3" style={{ background: `url(${carPolish}) center center / cover`, maxWidth: '100%' }}></div>
                    <div className="h-[100vh] w-full top-0 hidden" id="slider-4" style={{ background: `url(${freshDrive}) center center / cover`, maxWidth: '100%' }}></div>
                    <div className="text-white h-[70%] w-full absolute top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
                        <HeroText heading1={heading1} heading2={heading2} paragraph={paragraph} nextSlide={nextSlide} prevSlide={prevSlide} />
                    </div>
                    <div className="h-[4%] w-full absolute bottom-0 flex justify-center items-center insetShadow">

                        <AiFillDownCircle size={'30px'} className="text-paleYellow insetShadow rounded-full cursor-pointer" onClick={() => scrollToNextPage()} />

                    </div>
                    <Navbar />
                </>
            }
        </div>
    )
}

export default Hero
