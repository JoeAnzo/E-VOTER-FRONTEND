import GetStarted from "../Components/GetStarted"
import { Router,Routes,Route, Navigate } from "react-router-dom"
import Login from "../Components/Login"
import HeadPrefect from "../Components/HeadPrefect"
import { createContext, useState } from "react"
export const userContext = createContext()
function App() {
  const [role,setRole] = useState('User')
  return (
    <> 
      <userContext.Provider value={{role,setRole}}>
        <Routes>
          <Route path="/" element={<GetStarted/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/prefects" element={<HeadPrefect/>}/>
        </Routes>
      </userContext.Provider>
    </>
  )
}

export default App
