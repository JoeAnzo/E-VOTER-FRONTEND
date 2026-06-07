import React, { useEffect, useState, useRef } from 'react'
import { fetchResultsPerPost } from '../Services/ApiCalls.js'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { io } from 'socket.io-client'
const BACKENDURL = import.meta.env.VITE_BACKEND_URL

function ResultsBarChartPerPost({ post }) {
    const [data, setData] = useState([])
    const socketRef = useRef(null)

    useEffect(() => {
        if (!BACKENDURL) {
            console.error('VITE_BACKEND_URL is not defined in your .env file')
            return
        }

        const socket = io(BACKENDURL, {
            transports: ['websocket'],
            reconnectionAttempts: 5,
        })

        socketRef.current = socket

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id)
        })

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error)
        })

        socket.on('votesUpdated', (votesUpdate) => {
            console.log('votesUpdated', votesUpdate)
            if (votesUpdate?.post !== post) return
            setData(votesUpdate.analytics)
        })

        async function getResults() {
            const results = await fetchResultsPerPost(post)
            if (results.success) {
                setData(results.data.Analytics)
            }
        }

        getResults()

        return () => {
            socket.off('votesUpdated')
            socket.off('connect')
            socket.off('connect_error')
            socket.disconnect()
        }
    }, [post])
    console.log(data)
  return (
    <>
      <h2 className='text-xl ml-2 sm:text-2xl my-4  dark:text-white text-slate-900'>{post} <span className='bg-green-500 px-2 text-white rounded-md my-8'>Live</span></h2>
      <div style={{overflowX:'auto', width:'100%'}} className="hide-scrollbar">
        <div style={{minWidth: 760, width: '100%'}} className="dark:bg-[#1E293B]">
          <ResponsiveContainer className="border border-gray-400 rounded-md py-4" width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
              barCategoryGap={10}
            >
              <CartesianGrid strokeDasharray="4 4" vertical={false} horizontal={false} stroke='#f0f0f0'/>
              <XAxis
                dataKey="Name"
                className="fill-slate-900 dark:fill-white"
                axisLine={false}
                tickLine={false}
                tick={{fill:'#9ca3af',fontSize:12,fontFamily:'sans-serif'}}
              />
              <YAxis
                className="fill-slate-900 dark:fill-white"
                axisLine={false}
                tickLine={false}
                tick={{fill:'#9ca3af',fontSize:12,fontFamily:'sans-serif'}}
              />
              <Tooltip
                cursor={{fill:'#f3f4f6',opacity: 0.6}}
                contentStyle={{
                  backgroundColor:'#1f2937',
                  borderRadius:'8px',
                  border:'none',
                  color:'#ffffff',
                  fontSize:'13px',
                  boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'
                }}
              />
              <Legend formatter={(value) => <span style={{color:'white'}}>{value}</span>}/>
              <Bar
                dataKey="voteCount"
                fill='#5478FF'
                radius={[4,4,0,0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default ResultsBarChartPerPost