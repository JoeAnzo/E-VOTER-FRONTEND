import { useContext } from "react"
import Logo from "../Logo"
import { Moon,MenuIcon,XIcon,Settings} from "lucide-react"
import { userContext } from "../../Contexts/userContext.js"
function AdminNavBar() {
    const {toggleIcon,setToggleIcon} = useContext(userContext)
    function handleClick(){
        setToggleIcon((prev) => !prev)
    }
  return (
    <header className="h-[10%] flex justify-between items-center bg-[#1E293B] shadow-xl pl-8 py-4">
        <div className="flex flex-col">
            <div className="flex gap-4 items-center">
                <div onClick={handleClick}>
                    {
                        toggleIcon ? <MenuIcon color="white" className="sm:hidden"/> : <XIcon className="sm:hidden" color="white"/>
                    }
                </div>
                <Logo/>
                <h2 className="text-white sm:text-2xl align-middle">Evoter</h2>
            </div>
            {/* <div className="flex items-center">
                <ChevronRight color="white"/>
            </div> */}
        </div>
        <div className="flex gap-4">
            <Settings color="white" className="hover:cursor-pointer"/>
            <h2 className="text-white">Admin</h2>
            <Moon color="white" className="mr-2 hover:cursor-pointer"/>
        </div>
    </header>
  )
}

export default AdminNavBar