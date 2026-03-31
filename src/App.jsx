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
import ProtectedRoutes from "../utils/ProtectedRoutes"
function App() {
  const [name,setName] = useState('')
  const [stream,setStream] = useState('')
  const [grade,setGrade] = useState('')
  const [OTP,setOTP] = useState(null)
  const [isAuth,setIsAuth] = useState(false)
  const [votedForCandidates,setVotedForCandidate] = useState([])

  return (
    <> 
        <userContext.Provider value={{name,setName,stream,setStream,grade,setGrade,OTP,setOTP,votedForCandidates,setVotedForCandidate,isAuth,setIsAuth}}>
            <Routes>
              <Route path="/" element={<GetStarted/>}/>
              <Route path="/auth/student/login" element={<Login/>}/>
              <Route path="/admin/auth/login" element={<AdminLogin/>}/>
              <Route path="/auth/login/Staff" element={<StaffLogin/>}/>
              <Route element={<ProtectedRoutes/>}>
                  <Route path="/student/voting-hall" element={<VotingHall/>}/>
                  <Route path="/student/submit-vote" element={<SubmitVotes/>}/>
                  <Route path="/admin/dashboard" element={<DashBoard/>}/>
              </Route>
            </Routes>
        </userContext.Provider>
    </>
  )
}

export default App
