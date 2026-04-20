import React from 'react'
function ClassListDropDown({list,setSelectedClass}) {
  function handleClick(item){
    setSelectedClass(item)
  }
  return (
    <div className='max-w-full'>
        {
            list.map((item,index) => {
                return <h2 onClick={() => handleClick(item)} className='hover:bg-[#1E293B] px-5 py-2 rounded-md' key={index}>{item}</h2>
            })
        }
    </div>
  )
}

export default ClassListDropDown