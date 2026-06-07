import { useContext } from "react"
import Logo from "../Logo"
import { Moon,SidebarClose,SidebarOpen,BellIcon} from "lucide-react"
import { userContext } from "../../Contexts/userContext.js"
import ThemeIcon from "../ThemeIcon.jsx"
function AdminNavBar() {
    const {toggleIcon,setToggleIcon} = useContext(userContext)
    function handleClick(){
        setToggleIcon((prev) => !prev)
    }
  return (
    <header className="h-[10%] flex justify-between items-center bg-white/30 dark:bg-[#1E293B]/30 border border-gray-400 backdrop-filter backdrop-blur-xl shadow-xl pl-4 py-4">
        <div className="flex flex-col">
            <div className="flex gap-2 items-center sm:p-4">
                <div onClick={handleClick}>
                    {
                        toggleIcon ? <SidebarOpen className="dark:text-white text-slate-900"/> : <SidebarClose className="dark:text-white text-slate-900"/>
                    }
                </div>
            </div>
            {/* <div className="flex items-center">
                <ChevronRight color="white"/>
            </div> */}
        </div>
        <div className="flex gap-4 items-center">
            <BellIcon className="hover:cursor-pointer text-slate-900 dark:text-white"/>
            <p className="text-white bg-[#5478FF] text-2xl w-10 flex items-center justify-center h-10 rounded-full ">A</p>
            <div className="mr-2">
                <ThemeIcon/>
            </div>
        </div>
    </header>
  )
}

export default AdminNavBar