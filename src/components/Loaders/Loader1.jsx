import { useEffect } from 'react'
import loader1 from '../../assets/loader1.gif'
import PropTypes from 'prop-types'

const Loader1 = ({ message }) => {
    const addDotEffect = () => {
        const loaderMsg = document.getElementById('loaderMessage')
        let counter = 1
        const dotInterval = setInterval(() => {
            if (counter % 4 === 0) {
                let msg = loaderMsg.innerText
                let newMsg = msg.slice(0, msg.length - 2)
                console.log(newMsg)
                loaderMsg.innerText = newMsg
                counter = 1
            } else {
                loaderMsg.innerText += '.'
            }
            counter += 1
        }, 200)

        setTimeout(() => {
            clearInterval(dotInterval)
        }, 4000)
    }
    useEffect(() => {
        addDotEffect()
    }, [])
    return (
        <div className="min-h-[100vh] w-[100vw] flex flex-col justify-center items-center bg-black">
            <h1 id='loaderMessage' className='h-[10vh] w-full text-center text-loaderGreen font-bold text-[30px]'>{message}</h1>
            <img src={loader1} alt="" className="min-h-[50%]" />
        </div>
    )
}

Loader1.propTypes = {
    message: PropTypes.string
}
export default Loader1