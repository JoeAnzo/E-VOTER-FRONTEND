import { useState,useEffect } from 'react'
import { PieChart,Pie, Cell, Tooltip,Legend,ResponsiveContainer } from 'recharts'
import {fetchPrefects} from '../../Services/ApiCalls'
function PrefectsPieChart() {
    const [pieChartData,setPieChartData] = useState([])
    async function getPrefectsData(){
        const prefectsData = await fetchPrefects()
        if (prefectsData.success){
            setPieChartData(prefectsData.data.Analytics)
        }
    }
    useEffect(() => {
        getPrefectsData()
        console.log(pieChartData)
    },[])

        const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042','#8884d8']
  return (
    <div style={{width:"100%",height:"400px"}}>
        <ResponsiveContainer>
            <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={80} outerRadius={150} fill='#8884d8' paddingAngle={5} dataKey="value" 
                label={({name,percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {
                        pieChartData.map((entry,index)=>{
                            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        })
                    }
                    <Tooltip/>
                    <Legend/>
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PrefectsPieChart