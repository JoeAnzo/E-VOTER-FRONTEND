import {Helmet} from 'react-helmet'
import AdminNavBar from '../../Components/ADMIN/AdminNavBar'
import SideBar from '../../Components/ADMIN/SideBar'
import {UserPlus,ClipboardCheck,CameraIcon} from "lucide-react"

export default function NewCandidate() {
  return (
<div className="h-screen relative">
        <Helmet>
            <title>Entroll Candidates here</title>
            <meta name="description" content="Manage candidates for your school's elections with ease using the E-voter platform. Add, edit, and organize candidates to ensure a smooth and efficient election process." />
            <meta name="keywords" content="E-voter, manage candidates, school elections, add candidates, edit candidates, organize candidates, election process" />
        </Helmet>
        <AdminNavBar/>
        <div className="h-full flex"> 
            <div className="sm:w-[20%]">
                <SideBar/>
            </div>
            <div className="sm:w-[80%] relative h-full w-full overflow-scroll hide-scrollbar">
                    <div className="flex items-center gap-2 border dark:bg-[#1E293B] backdrop-filter backdrop-blur-xl my-2 border-gray-400 rounded-md p-4 mr-2">
                        <UserPlus className="dark:text-white text-slate-900"/>
                        <div>
                            <p className='mr-2 dark:text-white text-slate-900 my-2'>CANDIDATE REGISTRY</p>
                            <h2 className="dark:text-white text-slate-900 text-2xl">Add New Candidates here</h2>
                            <p className='dark:text-white text-slate-900 my-2'>
                                Register a student to stand for a prefect position. All fields with required
                            </p>
                        </div>
                    </div>
                    <form>
                        <div className="flex flex-col border dark:bg-[#1E293B] backdrop-filter backdrop-blur-xl my-2 border-gray-400 rounded-md p-4 mr-2">
                            <div className='flex gap-2 items-center'>
                                <ClipboardCheck className="dark:text-white text-slate-900"/>
                                <h2 className="dark:text-white text-slate-900 text-2xl">Enter Details here</h2>
                            </div>

                            <p className='dark:text-white text-slate-900 my-2'>
                                These Credentials shall appear on the Ballot paper .
                            </p>
                            <label className='dark:text-white  text-slate-900 my-2'>
                                Name
                            </label>
                            <input className="h-12 rounded-md" htmlFor="name" type="text" placeholder='Candidate Name'/>
                            <label className='dark:text-white  text-slate-900 my-2'>
                                Class
                            </label>
                            <input className="h-12 rounded-md" htmlFor="Class" type="text" placeholder='Candidate Class'/>
                            <label className='dark:text-white  text-slate-900 my-2'>
                                Prefectorial Post
                            </label>
                            <input className="h-12 rounded-md" htmlFor="Class" type="text" placeholder='Prefectorial Post'/>
                        </div>
                            <div className="border dark:bg-[#1E293B] backdrop-filter backdrop-blur-xl my-2 border-gray-400 rounded-md p-4 mr-2">
                                <div className='flex gap-2 items-center'>
                                    <CameraIcon className="dark:text-white text-slate-900"/>
                                    <h2 className="dark:text-white text-slate-900 text-2xl">Upload Photo here</h2>
                                </div>
                                <div className='h-20 w-20 my-2 bg-[#5478FF] rounded-full flex items-center justify-center'>
                                    <CameraIcon className="text-white"/>
                                </div>
                                <button>
                                    Save Candidate
                                </button>
                            </div>
                    </form>
            </div>
        </div>
    </div>
  )
}
