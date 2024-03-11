import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import PropTypes from 'prop-types'

const HomePage5Card = ({ handleMouseDown, handleMouseUp, handleMove, dirtyImg, cleanedImg, opacityDecimal, inverseOpacityDecimal, sliderPosition, imgsHeight, nextSlide, prevSlide }) => {
    return (
        <div className="h-[70%] w-full flex flex-col items-center overflow-hidden px-[5%]" onMouseUp={() => handleMouseUp()}>
            {/* img */}
            <div
                id="beforeAfterCard"
                className="relative h-[90%] w-full flex justify-center items-end max-w-[700px] aspect-[70/45] mauto overflow-hidden select-none"
                onMouseMove={handleMove}
                onMouseDown={handleMouseDown}
            >
                <div
                    id="beforeImg"
                    className="absolute flex justify-center top-0 left-0 right-0 w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
                    style={{
                        background: `url(${cleanedImg}) center center / contain no-repeat`
                    }}
                >
                    <h1 className='text-red-500 z-40 absolute left-[10%] text-[20px] font-semibold' style={{ opacity: opacityDecimal }}>BEFORE</h1>
                    <h1 className='text-red-500 z-40 absolute right-[10%] text-[20px] font-semibold' style={{ opacity: inverseOpacityDecimal }}>AFTER</h1>
                </div>
                <div
                    className="absolute flex justify-center top-0 left-0 right-0 w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
                    style={{
                        clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                        background: `url(${dirtyImg}) center center / contain no-repeat`
                    }}
                >

                </div>
                <div
                    className={`absolute top-0 bottom-0 w-1 h-[${imgsHeight}px] bg-matteBlack cursor-ew-resize`}
                    style={{
                        left: `calc(${sliderPosition}% - 1px)`,
                        height: `${imgsHeight}px`,
                    }}
                >
                    <div className="bg-matteBlack absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)] translate-y-[-30px] tall:translate-y-[-80px]" />
                </div>
            </div>
            <div className='h-[10%] w-full flex justify-center items-start md:items-center gap-[20%] translate-y-[-30px] tall:translate-y-[-80px] translateFix'>
                <AiFillLeftCircle size={'30px'} className='text-red-500 cursor-pointer hover:text-darkBlue' onClick={() => prevSlide()} />
                <AiFillRightCircle size={'30px'} className='text-red-500 cursor-pointer' onClick={() => nextSlide()} />
            </div>
            {/* slider */}
        </div>
    )
}

HomePage5Card.propTypes = {
    handleMouseDown: PropTypes.func,
    handleMouseUp: PropTypes.func,
    handleMove: PropTypes.func,
    dirtyImg: PropTypes.any,
    cleanedImg: PropTypes.any,
    opacityDecimal: PropTypes.number,
    inverseOpacityDecimal: PropTypes.number,
    sliderPosition: PropTypes.number,
    imgsHeight: PropTypes.number,
    nextSlide: PropTypes.func,
    prevSlide: PropTypes.func,
}

export default HomePage5Card