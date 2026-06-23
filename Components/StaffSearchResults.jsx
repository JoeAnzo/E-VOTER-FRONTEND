import React from 'react'

function StaffSearchResults({results,setStaffName,setShowResults}) {

    function handleClick(name){
        setStaffName(name)
        setShowResults(false)
    }
  return (
    <div className="absolute left-0 right-0 top-full bg-[#0F172A]  text-white">
        {
            results.map((staff) => {
                return <p onClick={() => handleClick(staff.Name)} className="p-2 rounded-xl hover:bg-[#5478FF] hover:text-white">{staff.Name}</p>
            })
        }
    </div>
  )
}

export default StaffSearchResults