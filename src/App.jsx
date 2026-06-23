import { useState } from "react"
import { Router,Routes,Route, Navigate } from "react-router-dom"
import Login from "../Pages/Login"
import VotingHall from "../Pages/VotingHall"
import GetStarted from "../Pages/GetStarted"
import AdminLogin from "../Pages/AdminLogin"
import StaffLogin from "../Pages/StaffLogin"
import SubmitVotes from "../Pages/submitVotes"
import DashBoard from "../Pages/ADMIN/DashBoard"
import { userContext } from "../Contexts/userContext"
import ProtectedRoutes from "../utils/ProtectedRoutes"
import Students from "../Pages/ADMIN/Students"
import Candidates from "../Pages/ADMIN/Candidates"
import ElectionProgress from "../Pages/ADMIN/ElectionProgress"
import Staff from "../Pages/ADMIN/Staff"
import Analytics from "../Pages/ADMIN/Analytics"
import About from "../Pages/About"
import Policy from "../Pages/Policy"
import Terms from "../Pages/Terms"
import ContactUs from "../Pages/ContactUs"
import ScrollToTop from "../Components/ScrollToTop"
import NewCandidate from "../Pages/ADMIN/NewCandidate"

function App() {
  const [name,setName] = useState('')
  const [stream,setStream] = useState('')
  const [grade,setGrade] = useState('')
  const [OTP,setOTP] = useState(null)
  const [isAuth,setIsAuth] = useState(false)
  const [votedForCandidates,setVotedForCandidates] = useState([])
  const [toggleIcon,setToggleIcon] = useState(true)

  return (
    <> 
        <ScrollToTop/>
        <userContext.Provider value={{name,setName,stream,setStream,grade,setGrade,OTP,setOTP,votedForCandidates,setVotedForCandidates,isAuth,setIsAuth,toggleIcon,setToggleIcon}}>
            <Routes>
              <Route path="/" element={<GetStarted/>}/>
              <Route path="/about-us" element={<About/>}/>
              <Route path="/privacy-policy" element={<Policy/>}/>
              <Route path="/terms-and-conditions" element={<Terms/>}/>
              <Route path="/contact-us" element={<ContactUs/>}/>
              <Route path="/auth/student/login" element={<Login/>}/>
              <Route path="/admin/auth/login" element={<AdminLogin/>}/>
              <Route path="/auth/login/Staff" element={<StaffLogin/>}/>
              <Route element={<ProtectedRoutes/>}>
                  <Route path="/student/voting-hall" element={<VotingHall/>}/>
              </Route>
              <Route path="/student/submit-vote" element={<SubmitVotes/>}/>

              <Route path="/admin/dashboard" element={<DashBoard/>}/>
              <Route path="/admin/students" element={<Students/>}/>
              <Route path="/admin/candidates" element={<Candidates/>}/>
              <Route path="/admin/elections" element={<ElectionProgress/>}/>
              <Route path="/admin/staff" element={<Staff/>}/>
              <Route path="/admin/analytics" element={<Analytics/>}/>
              <Route path="/admin/candidates/new" element={<NewCandidate/>}/>
            </Routes>
        </userContext.Provider>
    </>
  )
}

export default App
