import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import './styles.css'

const MissingBlocksChart = ({ data }: { data: Array<{}> }) => {
  return (
    <div className="small-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} syncId="misssedBlockGraph">
          <linearGradient id="roundMissedColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF6E6E" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFC1C1" stopOpacity={0} />
          </linearGradient>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ angle: -90, position: 'insideLeft', value: 'M.B' }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Missed block count"
            stroke="#5F2BA1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTime)"
            label="Missed block count"
          />
          <Area
            type="monotone"
            dataKey="Missed round"
            stroke="#E34B31"
            strokeWidth={2}
            fillOpacity={0}
          />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MissingBlocksChart
