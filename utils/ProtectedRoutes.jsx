import { useContext } from 'react'
import { userContext } from '../Contexts/userContext'
import {Outlet,Navigate} from 'react-router-dom'
function ProtectedRoutes(){
    const {isAuth} = useContext(userContext)
    return(
        isAuth ? <Outlet/> : <Navigate to="/auth/student/login"/>
    )
}

export default ProtectedRoutes