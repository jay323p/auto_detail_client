import { useSelector } from "react-redux"
import ErrorAlert from "../components/Alerts/ErrorAlert"
import SuccessAlert from "../components/Alerts/SuccessAlert"
import Hero from "../components/Home/Hero"
import HomePage2 from "../components/Home/HomePage2"
import HomePage3 from "../components/Home/HomePage3"
import HomePage4 from "../components/Home/HomePage4"
import HomePage5 from "../components/Home/HomePage5"
import HomePage6 from "../components/Home/HomePage6"
import HomePage7 from "../components/Home/HomePage7"
import { selectErrorMsg, selectShowErrMsg, selectShowSuccessMsg, selectSuccessMsg } from "../redux/features/auth/authSlice"
// for small screens default = h-[800vh] but once md-h-[600vh or 700vh]
const Home = () => {
    const showSuccessMsgRedux = useSelector(selectShowSuccessMsg)
    const showErrMsgRedux = useSelector(selectShowErrMsg)
    const successMsgRedux = useSelector(selectSuccessMsg)
    const errorMsgRedux = useSelector(selectErrorMsg)

    return (
        <div className="h-[100vh] w-full flex flex-col overflow-y-scroll" id="home">
            {/* HERO */}
            <SuccessAlert decider={showSuccessMsgRedux} message={successMsgRedux} />
            <ErrorAlert decider={showErrMsgRedux} message={errorMsgRedux} />
            <Hero />
            <HomePage2 />
            <HomePage3 />
            <HomePage4 />
            <HomePage5 />
            <HomePage6 />
            <HomePage7 />
        </div>
    )
}

export default Home

// background - image: url(http://aqualine.like-themes.com/wp-content/uploads/2018/02/SLIDE_05.jpg);
//     transition: transform 20000ms ease - out 0s, opacity 1000ms ease 0s;
// opacity: 1;
// transform: scale(1.2, 1.2);
// z - index: 2;
// }