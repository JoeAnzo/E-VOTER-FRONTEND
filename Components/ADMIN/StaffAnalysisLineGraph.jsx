import React, { useState,useEffect } from 'react'
import { fetchStaffMembers } from '../../Services/ApiCalls'
import { AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'

const CustomTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor:'#1e293b',
                color:'#f8fafc',
                padding:'8px 12px',
                borderRadius:'8px',
                boxShadow:'0 10px 15px -3px rgba(0, 0, 0.3)',
                border:'none',
                fontSize:'13px',
                pointerEvents:'none'
            }}>
                <p style={{
                    margin:0,fontWeight:600,color:'#94a3b8'
                }}>
                    {label}
                </p>
                <p style={{ margin:'2px 0 0 0',fontWeight:700,fontSize:'15px',color:'#38bdf8'}}>
                    ${payload[0].value}
                </p>
            </div>
        )
    }

    return null;
}

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
    <div style={{width:'100%', height: 340, background:'#ffffff', padding:'16px', borderRadius:'16px'}}>
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
            data={displayData}
            margin={{top:10, right: 5,left: -25,bottom:0}}
            >
                <defs>
                    <linearGradient id="colorValue" xl="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor='#3b82f6' stopOpacity={0.2}/>
                        <stop offset="95%" stopColor='#3b82f6' stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="Department" 
                axisLine={false}
                tickLine={false}
                tick={{ fill:'#94a3b8', fontSize:11, fontWeight:500}}
                dy={8}
                />
                <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill:'#94a3b8', fontSize:11, fontWeight:500}}
                tickCount={4}            
                />
                <Tooltip
                content={<CustomTooltip/>}
                cursor={{stroke:'#e2e8f0',strokeWidth:1}}
                isAnimationActive={false}
                trigger='click'
                />
                
                <Area
                 type="monotone"
                 dataKey="totalCount" 
                 stroke="#5478FF"
                 strokeWidth={2.5}
                 fillOpacity={1}
                 fill="url(#colorValue)"
                 dot={false}
                 activeDot={{r:5, stroke: '#ffffff',strokeWidth:2,fill:'#3b82f6'}}
                 />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default StaffAnalysisLineGraph