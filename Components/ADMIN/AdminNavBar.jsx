import { useContext } from "react"
import Logo from "../Logo"
import { Moon,MenuIcon,XIcon,Settings} from "lucide-react"
import { userContext } from "../../Contexts/userContext.js"
import ThemeIcon from "../ThemeIcon.jsx"
function AdminNavBar() {
    const {toggleIcon,setToggleIcon} = useContext(userContext)
    function handleClick(){
        setToggleIcon((prev) => !prev)
    }
  return (
    <header className="h-[10%] flex justify-between items-center bg-white dark:bg-[#1E293B] shadow-xl pl-8 py-4">
        <div className="flex flex-col">
            <div className="flex gap-4 items-center">
                <div onClick={handleClick}>
                    {
                        toggleIcon ? <MenuIcon color="white" className="sm:hidden"/> : <XIcon className="sm:hidden" color="white"/>
                    }
                </div>
                <Logo/>
                <h2 className="dark:text-white text-slate-900 sm:text-2xl align-middle">Evoter</h2>
            </div>
            {/* <div className="flex items-center">
                <ChevronRight color="white"/>
            </div> */}
        </div>
        <div className="flex gap-4">
            <Settings color="white" className="hover:cursor-pointer hidden sm:visible"/>
            <h2 className="dark:text-white text-slate-900">Admin</h2>
            <div className="mr-4">
                <ThemeIcon/>
            </div>
        </div>
    </header>
  )
}

export default AdminNavBar