import React, { useEffect, useState } from 'react'
import { fetchResultsPerPost } from '../Services/ApiCalls.js'
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from 'recharts'
function ResultsBarChartPerPost({post}) {
    const [data,setData] = useState([])
    async function getResults() {
        const results = await fetchResultsPerPost(post)
        if (results.success){
            setData(results.data.Analytics)
        }
    }
    
    useEffect(() => {
        getResults()
    },[])

  return (
    <>
    <h2 className='text-2xl dark:text-white text-slate-900'>{post} <span className='bg-green-500 px-2 text-slate-900 dark:text-white rounded-md my-8'>Live</span></h2>
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} fill="green">
            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="Name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="voteCount" fill='#5478FF'/>
            <Legend/>
            
        </BarChart>
    </ResponsiveContainer>
    </>
  )
}

export default ResultsBarChartPerPost