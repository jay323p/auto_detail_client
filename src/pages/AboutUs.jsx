// import droplets from '../assets/droplets.jpg'
import Navbar from '../components/Navbar/Navbar'
import Testimonials from '../components/About/Testimonials'
import Gallery from '../components/About/Gallery'
import { useSelector } from 'react-redux'
import { selectShowNavModal } from '../redux/features/auth/authSlice'
import NavbarModal from '../components/Navbar/NavbarModal'
import ErrorAlert from '../components/Alerts/ErrorAlert'
import SuccessAlert from '../components/Alerts/SuccessAlert'

const AboutUs = () => {

    const showNavbarModalRedux = useSelector(selectShowNavModal)

    return (
        <div className="h-[100vh] w-full flex flex-col overflow-y-scroll bg-matteBlack"
        >
            {showNavbarModalRedux ? <NavbarModal /> : <>
                <Navbar />
                <ErrorAlert />
                <SuccessAlert />
                <Testimonials />
                <Gallery />
            </>}
        </div>
    )
}

export default AboutUs
