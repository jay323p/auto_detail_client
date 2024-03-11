import luxInt from '../../assets/luxuryInterior.jpg'
import sparkles from '../../assets/sparkles.png'
import elon from '../../assets/elon.jpg'
import jayLeno from '../../assets/jayLeno.jpg'
import kingSalman from '../../assets/kingSalman.jpg'
import markCuban from '../../assets/markCuban.jpg'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { useState } from 'react'
import HomePage6Card from './HomePage6Card'

const reviewsMapper = {
    0: {
        quote: 'Stellar service on my Tesla Roadster - complete transformation! Beyond pleased with the ceramic coating and will be recommending Jay\'s Auto Spa to all my Tesla employees. Thanks Jay!',
        img: elon,
        name: 'Elon Musk',
        description: 'Tesla CEO'
    },
    1: {
        quote: 'I showed Jay my garage and immediately he and his team went to work! After the service, my garage now looks like a dealership showroom - how brilliant! Phenomenal service!',
        img: jayLeno,
        name: 'Jay Leno',
        description: 'Car Enthusiast'
    },
    2: {
        quote: 'Royalty requires royal service and Jay\'s Auto Spa delivers detailing service fit for a king. I only trust Jay and his team with my most prized vehicles.',
        img: kingSalman,
        name: 'King Salman',
        description: 'King of Saudi Arabia'
    },
    3: {
        quote: 'As a busy entrepreneur, I truly appreciate Jay\'s mobile detailing service. While busy managing my businesses and the Dallas Mavericks, Jay and his team are busy restoring my hypercars!',
        img: markCuban,
        name: 'Mark Cuban',
        description: 'Entrepreneur'
    },
}

const HomePage6 = () => {
    const [slideCounter, setSlideCounter] = useState(0)
    const [quote, setQuote] = useState(reviewsMapper[0].quote)
    const [image, setImage] = useState(reviewsMapper[0].img)
    const [name, setName] = useState(reviewsMapper[0].name)
    const [description, setDescription] = useState(reviewsMapper[0].description)

    const nextSlide = () => {
        if (slideCounter !== 3) {
            let next = slideCounter + 1
            const reviewCard = document.getElementById('reviewCard')
            setQuote(reviewsMapper[next].quote)
            setImage(reviewsMapper[next].img)
            setName(reviewsMapper[next].name)
            setDescription(reviewsMapper[next].description)
            setSlideCounter((prev) => prev + 1)
            reviewCard.classList.add('slideCard')
            setTimeout(() => {
                reviewCard.classList.remove('slideCard')
                reviewCard.classList.add('slideCardFromRight')

                setTimeout(() => {
                    reviewCard.classList.remove('slideCardFromRight')
                }, 700)
            }, 700)
        } else {
            let next = 0
            const reviewCard = document.getElementById('reviewCard')
            setQuote(reviewsMapper[next].quote)
            setImage(reviewsMapper[next].img)
            setName(reviewsMapper[next].name)
            setDescription(reviewsMapper[next].description)
            setSlideCounter(0)
            reviewCard.classList.add('slideCard')
            setTimeout(() => {
                reviewCard.classList.remove('slideCard')
                reviewCard.classList.add('slideCardFromRight')

                setTimeout(() => {
                    reviewCard.classList.remove('slideCardFromRight')
                }, 700)
            }, 700)
        }
    }
    const prevSlide = () => {
        if (slideCounter !== 0) {
            let next = slideCounter - 1
            const reviewCard = document.getElementById('reviewCard')
            setQuote(reviewsMapper[next].quote)
            setImage(reviewsMapper[next].img)
            setName(reviewsMapper[next].name)
            setDescription(reviewsMapper[next].description)
            setSlideCounter((prev) => prev - 1)
            reviewCard.classList.add('slideCard')
            setTimeout(() => {
                reviewCard.classList.remove('slideCard')
                reviewCard.classList.add('slideCardFromRight')

                setTimeout(() => {
                    reviewCard.classList.remove('slideCardFromRight')
                }, 700)
            }, 700)
        } else {
            let next = 3
            const reviewCard = document.getElementById('reviewCard')
            setQuote(reviewsMapper[next].quote)
            setImage(reviewsMapper[next].img)
            setName(reviewsMapper[next].name)
            setDescription(reviewsMapper[next].description)
            setSlideCounter(3)
            reviewCard.classList.add('slideCard')
            setTimeout(() => {
                reviewCard.classList.remove('slideCard')
                reviewCard.classList.add('slideCardFromRight')

                setTimeout(() => {
                    reviewCard.classList.remove('slideCardFromRight')
                }, 700)
            }, 700)
        }
    }
    return (<>
        <div className='min-h-[100vh] w-full relative flex flex-col items-center wrapper montFont bg-brightRed'
        >
            <div className='absolute bottom-0 section min-h-[10%] flex justify-center items-center gap-[25%] z-50'>
                <h2 className='h-full w-1/2 text-center lg:text-[20px]'>Check out our other reviews</h2>
                <button className='min-h-[4vh] lg:min-h-[5vh] w-1/2 bg-brightRed text-matteBlack font-semibold rounded-full cursor-pointer insetShadow hover:bg-opa'>See Reviews</button>
            </div>
            <header className=''>
                <img src={luxInt} className='background min-h-[100vh]' alt="" />
                <img src={sparkles} className='foreground min-h-[100vh]' alt="" />
                <div className='h-full w-full flex flex-col items-center title'>
                    <div className='h-[10%] w-full flex justify-center items-end'>
                        <h4 className='h-[30%] w-full text-center text-brightRed text-[13px] tall:text-[14px] deskSm:text-[16px] md:text-[18px] lg:text-[20px]'>TESTIMONIALS</h4>
                    </div>
                    <div className='h-[10%] w-full flex justify-center items-start'>
                        <h4 className='h-[70%] w-full text-center text-white text-[22px] tall:text-[24px] deskSm:text-[26px] md:text-[28px] lg:text-[34px]'>WHAT OUR CLIENTS SAY</h4>
                    </div>
                    {/* review card */}
                    {/* stop here */}
                    <HomePage6Card quote={quote} name={name} image={image} description={description} />
                    <div className='h-[10%] w-full flex justify-center items-start gap-[40%] lg:translate-y-[-28vh]'>
                        <AiFillLeftCircle size={'40px'} className='text-brightRed cursor-pointer' onClick={() => nextSlide()} />
                        <AiFillRightCircle size={'40px'} className='text-brightRed cursor-pointer' onClick={() => prevSlide()} />
                    </div>
                </div>
            </header>

            <div className='translate-y-[30vh] h-[40%] w-full flex justify-center items-start text-white'>
                <div className='h-[30%] w-1/2 flex justify-between items-start'>
                    <h2 className='h-[90%] w-[90%] text-[20px] lg:text-[24px] px-[5px] text-center font-bold text-matteBlack'>Subscribe To Our Newsletter</h2>
                </div>
                <div className='tall:h-[33%] min-h-[16vh] insetShadow2 lg:h-[100%] w-[46%] md:w-[40%] lg:w-[35%] flex flex-col justify-center items-center gap-[1vh] rounded-md'>
                    <label htmlFor='subscribeEmail' className='text-matteBlack font-semibold'>Email</label>
                    <input type="text" id='subscribeEmail' className='outline-none h-[3vh] w-[80%] md:w-[70%] rounded-md text-center text-[14px] text-black' placeholder='john@gmail.com' />
                    <button className='min-h-[4vh] lg:h-[4vh] w-[60%] md:w-[60%] lg:w-[50%] bg-brightRed text-matteBlack insetShadow rounded-lg text-dark font-semibold lg:text-[20px] hover:bg-matteBlack hover:text-brightRed'>Subscribe</button>
                </div>
            </div>

        </div>
    </>
    )
}

export default HomePage6