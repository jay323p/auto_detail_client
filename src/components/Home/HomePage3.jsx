import carbonFiber from '../../assets/carbonFiber.jpeg'
import { cardMapper } from '../../data/staticObjects'
import HomePage3Card from './HomePage3Card'
import { useState } from 'react'



const HomePage3 = () => {
    const [heading, setHeading] = useState(cardMapper[0].heading)
    const [serviceTime, setServiceTime] = useState(cardMapper[0].serviceTime)
    const [description, setDescription] = useState(cardMapper[0].description)
    const [checklist, setChecklist] = useState(cardMapper[0].checklist)
    const [slideCounter, setSlideCounter] = useState(0)

    const nextSlide = () => {
        if (slideCounter !== 4) {
            let next = slideCounter + 1
            setHeading(cardMapper[next].heading)
            setServiceTime(cardMapper[next].serviceTime)
            setDescription(cardMapper[next].description)
            setChecklist(cardMapper[next].checklist)
            setSlideCounter((prev) => prev + 1)
            const cardSlider = document.getElementById('cardSlider')
            cardSlider.classList.add('slideCard')
            console.log(cardSlider)
            setTimeout(() => {
                cardSlider.classList.remove('slideCard')
                cardSlider.classList.add('slideCardFromRight')

                setTimeout(() => {
                    cardSlider.classList.remove('slideCardFromRight')
                }, 700)
            }, 700)
        } else {
            setHeading(cardMapper[0].heading)
            setServiceTime(cardMapper[0].serviceTime)
            setDescription(cardMapper[0].description)
            setChecklist(cardMapper[0].checklist)
            setSlideCounter(0)
            const cardSlider = document.getElementById('cardSlider')
            cardSlider.classList.add('slideCard')
            console.log(cardSlider)
            setTimeout(() => {
                cardSlider.classList.remove('slideCard')
                cardSlider.classList.add('slideCardFromRight')

                setTimeout(() => {
                    cardSlider.classList.remove('slideCardFromRight')
                }, 700)
            }, 700)
        }
    }
    const prevSlide = () => {
        if (slideCounter !== 0) {
            let next = slideCounter - 1
            setHeading(cardMapper[next].heading)
            setServiceTime(cardMapper[next].serviceTime)
            setDescription(cardMapper[next].description)
            setChecklist(cardMapper[next].checklist)
            setSlideCounter((prev) => prev - 1)
            const cardSlider = document.getElementById('cardSlider')
            cardSlider.classList.add('slideCardReverse')
            console.log(cardSlider)
            setTimeout(() => {
                cardSlider.classList.remove('slideCardReverse')
                cardSlider.classList.add('slideCardFromLeft')

                setTimeout(() => {
                    cardSlider.classList.remove('slideCardFromLeft')
                }, 700)
            }, 700)
        } else {
            setHeading(cardMapper[4].heading)
            setServiceTime(cardMapper[4].serviceTime)
            setDescription(cardMapper[4].description)
            setChecklist(cardMapper[4].checklist)
            setSlideCounter(4)

            const cardSlider = document.getElementById('cardSlider')
            cardSlider.classList.add('slideCardReverse')
            console.log(cardSlider)
            setTimeout(() => {
                cardSlider.classList.remove('slideCardReverse')
                cardSlider.classList.add('slideCardFromLeft')

                setTimeout(() => {
                    cardSlider.classList.remove('slideCardFromLeft')
                }, 700)
            }, 700)
        }
    }


    return (
        <div className='min-h-[100vh] w-full bg-white flex flex-col items-center' style={{ background: `url(${carbonFiber}) center center / cover`, maxWidth: '100%' }}>
            <div className='h-[40%] md:h-[30%] w-full flex flex-col items-center'>
                <div className='montFont h-[25%] w-full flex justify-center items-end text-red-600 md:text-[20px] xxl:text-[22px] font-bold'>
                    What We Do
                </div>
                <div className='montFont h-[37%] w-[80%] flex justify-center items-center text-white text-[26px] md:text-[30px] xxl:text-[36px] text-center font-bold'>
                    Premium Washing And Precise Detailing
                </div>
                <p className='montFont h-[38%] w-[80%] xxl:w-[33%] flex justify-center items-start text-white text-[14px] md:text-[18px] text-center font-bold'>
                    Throughout many years or experience and refining, we have created a distinctive and highly-effective methodology when it comes to auto-detailing.
                </p>
            </div>
            <div className='h-[60%] md:h-[70%] w-full flex justify-center items-center p-[5%] montFont'>
                <HomePage3Card heading={heading} serviceTime={serviceTime} description={description} checklist={checklist} nextSlide={nextSlide} prevSlide={prevSlide} slideCounter={slideCounter} />

            </div>
        </div>
    )
}

export default HomePage3