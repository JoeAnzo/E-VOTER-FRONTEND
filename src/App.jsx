import { useState } from "react"
import { Router,Routes,Route, Navigate } from "react-router-dom"
import Login from "../Pages/Login"
import VotingHall from "../Pages/VotingHall"
import GetStarted from "../Pages/GetStarted"
import AdminLogin from "../Pages/AdminLogin"
import StaffLogin from "../Pages/StaffLogin"
import SubmitVotes from "../Pages/submitVotes"
import DashBoard from "../Pages/DashBoard"
import { userContext } from "../Contexts/userContext"
function App() {
  const [name,setName] = useState('')
  const [stream,setStream] = useState('')
  const [grade,setGrade] = useState('')
  const [OTP,setOTP] = useState(null)
  const [votedForCandidates,setVotedForCandidate] = useState([])

  return (
    <> 
        <userContext.Provider value={{name,setName,stream,setStream,grade,setGrade,OTP,setOTP,votedForCandidates,setVotedForCandidate}}>
            <Routes>
              <Route path="/" element={<GetStarted/>}/>
              <Route path="/auth/student/login" element={<Login/>}/>
              <Route path="/student/voting-hall" element={<VotingHall/>}/>
              <Route path="/admin/auth/login" element={<AdminLogin/>}/>
              <Route path="/auth/login/Staff" element={<StaffLogin/>}/>
              <Route path="/student/submit-vote" element={<SubmitVotes/>}/>
              <Route path="/admin/dashboard" element={<DashBoard/>}/>
            </Routes>
        </userContext.Provider>
    </>
  )
}

export default App
