import { useEffect, useState } from 'react';
import HomePage5Card from './HomePage5Card'
import { beforeAfterImgsMapper } from '../../data/staticObjects';
import interiorIcon from '../../assets/interiorIcon.png'
import exteriorIcon from '../../assets/exteriorIcon.png'
import exteriorCleanIcon from '../../assets/exteriorCleanIcon.png'
import polishIcon from '../../assets/polishIcon.png'
import { AiFillDownCircle } from 'react-icons/ai';


const HomePage5 = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [opacityDecimal, setOpacityDecimal] = useState(0.5)
    const [inverseOpacityDecimal, setInverseOpacityDecimal] = useState(0.5)
    const [isDragging, setIsDragging] = useState(false);
    const [imgsHeight, setImgsHeight] = useState()
    const [heading1, setHeading1] = useState(beforeAfterImgsMapper[0].heading1)
    const [heading2, setHeading2] = useState(beforeAfterImgsMapper[0].heading2)
    const [dirtyImage, setDirtyImage] = useState(beforeAfterImgsMapper[0].dirtyImg)
    const [cleanedImage, setCleanedImage] = useState(beforeAfterImgsMapper[0].cleanedImg)
    const [slideCounter, setSlideCounter] = useState(0)

    const handleMove = (e) => {
        if (!isDragging) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        const decimal = (percent / 100).toFixed(1)
        const initOpactity = 0.5
        const difference = decimal - initOpactity
        const inverseOpactity = initOpactity - difference

        setSliderPosition(percent);
        setOpacityDecimal(decimal);
        setInverseOpacityDecimal(inverseOpactity)
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const nextSlide = () => {
        if (slideCounter !== 3) {
            setSliderPosition(50)
            setOpacityDecimal(0.5)
            setInverseOpacityDecimal(0.5)
            let next = slideCounter + 1
            const card = document.getElementById('beforeAfterCard')
            card.classList.add('fade')
            setTimeout(() => {
                card.classList.remove('fade')
                card.classList.add('fadeIn')

                setHeading1(beforeAfterImgsMapper[next].heading1)
                setHeading2(beforeAfterImgsMapper[next].heading2)
                setDirtyImage(beforeAfterImgsMapper[next].dirtyImg)
                setCleanedImage(beforeAfterImgsMapper[next].cleanedImg)
                setSlideCounter((prev) => prev + 1)
                setTimeout(() => {
                    card.classList.remove('fadeIn')
                }, 700)
            }, 700)
        } else {
            setSliderPosition(50)
            setOpacityDecimal(0.5)
            setInverseOpacityDecimal(0.5)
            let next = 0
            const card = document.getElementById('beforeAfterCard')
            card.classList.add('fade')
            setTimeout(() => {
                card.classList.remove('fade')
                card.classList.add('fadeIn')

                setHeading1(beforeAfterImgsMapper[next].heading1)
                setHeading2(beforeAfterImgsMapper[next].heading2)
                setDirtyImage(beforeAfterImgsMapper[next].dirtyImg)
                setCleanedImage(beforeAfterImgsMapper[next].cleanedImg)
                setSlideCounter(0)
                setTimeout(() => {
                    card.classList.remove('fadeIn')
                }, 700)
            }, 700)
        }
    }
    const prevSlide = () => {
        if (slideCounter !== 0) {
            setSliderPosition(50)
            setOpacityDecimal(0.5)
            setInverseOpacityDecimal(0.5)
            let next = slideCounter - 1
            const card = document.getElementById('beforeAfterCard')
            card.classList.add('fade')
            setTimeout(() => {
                card.classList.remove('fade')
                card.classList.add('fadeIn')
                setHeading1(beforeAfterImgsMapper[next].heading1)
                setHeading2(beforeAfterImgsMapper[next].heading2)
                setDirtyImage(beforeAfterImgsMapper[next].dirtyImg)
                setCleanedImage(beforeAfterImgsMapper[next].cleanedImg)
                setSlideCounter((prev) => prev - 1)
                setTimeout(() => {
                    card.classList.remove('fadeIn')
                }, 700)
            }, 700)

        } else {
            setSliderPosition(50)
            setOpacityDecimal(0.5)
            setInverseOpacityDecimal(0.5)
            let next = 3
            const card = document.getElementById('beforeAfterCard')
            card.classList.add('fade')
            setTimeout(() => {
                card.classList.remove('fade')
                card.classList.add('fadeIn')
                setHeading1(beforeAfterImgsMapper[next].heading1)
                setHeading2(beforeAfterImgsMapper[next].heading2)
                setDirtyImage(beforeAfterImgsMapper[next].dirtyImg)
                setCleanedImage(beforeAfterImgsMapper[next].cleanedImg)
                setSlideCounter(3)
                setTimeout(() => {
                    card.classList.remove('fadeIn')
                }, 700)
            }, 700)

        }
    }

    const scrollToNextPage = () => {
        const windowHeight = window.innerHeight * 5
        const homeWindow = document.getElementById('home')
        homeWindow.scrollTo({ top: windowHeight, left: 0, behavior: 'smooth' })
    }
    useEffect(() => {
        const handleWindowResize = () => {
            const beforeImg = document.getElementById('beforeImg')
            const imgHeight = beforeImg.clientHeight
            setImgsHeight(imgHeight)
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [window.innerWidth])
    return (
        <div className="min-h-[100vh] w-full bg-matteBlack flex flex-col items-center montFont" >
            <div className="h-[60%] w-full flex flex-col lg:flex-row lg:items-center">
                <div className="h-[30%] lg:h-full w-full flex flex-col items-center justify-end lg:justify-center">
                    {/* -------- heading */}
                    <div className="h-[40%] lg:max-h-[10%] w-full flex justify-center items-center gap-[5%]">
                        <div className="h-[1px] w-[15%] bg-red-500 px-[4px]"></div>
                        <h4 className="text-[13px] md:text-[18px] text-red-500 font-semibold">{heading1}</h4>
                    </div>
                    {/* bold heading */}
                    <div className="h-[60%] lg:max-h-[35%] w-full md:w-[80%] lg:w-[100%] flex justify-center items-center">
                        <h1 className="h-full w-full lg:w-[94%] text-center text-[18px] md:text-[24px] lg:text-[28px] text-white font-bold">{heading2}</h1>
                    </div>
                    <div className='hidden lg:flex h-[20%] w-full justify-center items-center gap-[10%]'>
                        <button className='h-[75%] w-[30%] bg-brightRed rounded-lg font-semibold text-matteBlack text-[16px] insetShadow hover:bg-opacity-40 hover:text-white'>View Gallery</button>
                        <button className='h-[75%] w-[30%] bg-darkBlue rounded-lg font-semibold text-matteBlack text-[16px] insetShadow hover:bg-opacity-40 hover:text-white'>Booking Options</button>

                    </div>
                </div>
                <HomePage5Card handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} handleMove={handleMove} dirtyImg={dirtyImage} cleanedImg={cleanedImage} opacityDecimal={opacityDecimal} inverseOpacityDecimal={inverseOpacityDecimal} imgsHeight={imgsHeight} sliderPosition={sliderPosition} nextSlide={nextSlide} prevSlide={prevSlide} />
            </div>
            <div className='h-[40%] w-full flex flex-col lg:flex-row items-center justify-end gap-[1rem] lg:gap-[2rem] px-[10px]'>
                <div className='h-1/2 w-full flex gap-[10px] lg:gap-[2rem]'>
                    <div className='h-full w-1/2 flex flex-col items-center'>
                        <img src={interiorIcon} alt="" className='h-[60px] lg:h-[80px] aspect-square tall:h-[64px]' />
                        <h3 className='w-[80%] text-center text-red-200 font-bold text-[14px] lg:text-[20px] xxl:text-[22px] tall:text-[16px]'>Premium Interior Clean</h3>
                        <p className='text-center text-white font-bold text-[10px] tall:text-[11px] lg:text-[13px] xxl:text-[15px]'>Our natural based cleaners provide deep cleaning and sterilization</p>
                    </div>
                    <div className='h-full w-1/2 flex flex-col items-center'><img src={exteriorIcon} alt="" className='h-[60px] lg:h-[80px] aspect-square tall:h-[64px]' />
                        <h3 className='w-[80%] text-center text-red-200 font-bold text-[14px] lg:text-[20px] xxl:text-[22px] tall:text-[16px]'>Rigorous Exterior Clean</h3>
                        <p className='text-center text-white font-bold text-[10px] tall:text-[11px] lg:text-[13px] xxl:text-[15px]'>Deep contactless wash, decontamination, polish, and ceramic coating</p></div>
                </div>
                <div className='h-1/2 w-full flex gap-[10px] lg:gap-[2rem]'>
                    <div className='h-full w-1/2 flex flex-col items-center'><img src={polishIcon} alt="" className='h-[60px] lg:h-[80px] aspect-square tall:h-[64px]' />
                        <h3 className='w-[80%] text-center text-red-200 font-bold text-[14px] lg:text-[20px] xxl:text-[22px] tall:text-[16px]'>Precise Polishing</h3>
                        <p className='text-center text-white font-bold text-[10px] tall:text-[11px] lg:text-[13px] xxl:text-[15px]'>Our array of cutting and polishing compounds can tackle any and all clearcoat imperfections</p></div>
                    <div className='h-full w-1/2 flex flex-col items-center'><img src={exteriorCleanIcon} alt="" className='h-[60px] lg:h-[80px] aspect-square tall:h-[64px]' />
                        <h3 className='w-[80%] text-center text-red-200 font-bold text-[14px] lg:text-[20px] xxl:text-[22px] tall:text-[16px]'>Clean That Lasts</h3>
                        <p className='text-center text-white font-bold text-[10px] tall:text-[11px] lg:text-[13px] xxl:text-[15px]'>Protect your car for years with our professional ceramic coating packages</p></div>
                </div>
            </div>
            <div className='h-[10%] w-full flex justify-center items-center'>
                <AiFillDownCircle size={'30px'} className="text-paleYellow insetShadow rounded-full cursor-pointer" onClick={() => scrollToNextPage()} />
            </div>
        </div>
    )
}

export default HomePage5