import React from 'react'

function StreamListDropDown({list,setSelectedStream}) {
    function handleClick(item){
        setSelectedStream(item)
    }
  return (
     <div>
        {
            list.map((item,index) => {
                return <h2 onClick={() => handleClick(item)} className='hover:bg-[#1E293B] px-5 py-2 rounded-md' key={index}>{item}</h2>
            })
        }
    </div>
  )
}

export default StreamListDropDown