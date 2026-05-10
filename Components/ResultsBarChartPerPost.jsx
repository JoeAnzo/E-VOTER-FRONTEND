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
    <h2 className='text-xl ml-2 sm:text-2xl dark:text-white text-slate-900'>{post} <span className='bg-green-500 px-2 text-white rounded-md my-8'>Live</span></h2>
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