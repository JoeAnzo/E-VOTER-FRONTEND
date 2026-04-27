import React, { useState,useEffect } from 'react'
import { fetchStaffMembers } from '../../Services/ApiCalls'
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from 'recharts'
function StaffAnalysisLineGraph() {
    const [displayData,setDisplayData] = useState([])
    async function getData(){
        const staffMembersData = await fetchStaffMembers()
        if (staffMembersData.success){
            setDisplayData(staffMembersData.data.Analytics)
        }
    }
    useEffect(() => {
        getData()
    },[])
    console.log(displayData)
  return (
    <>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="Department" />
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="natural" dataKey="totalCount" stroke="#5478FF"/>
            </LineChart>
        </ResponsiveContainer>
    </>
  )
}

export default StaffAnalysisLineGraph