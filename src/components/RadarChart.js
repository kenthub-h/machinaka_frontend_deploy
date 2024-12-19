// components/RadarChart.js
import React from "react";
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const RadarChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <RechartsRadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar
            name="Will"
            dataKey="Will"
            stroke="#4A90E2"
            fill="#4A90E2"
            fillOpacity={0.6}
          />
          <Radar
            name="Can"
            dataKey="Can"
            stroke="#FF5A5F"
            fill="#FF5A5F"
            fillOpacity={0.6}
          />
          <Legend />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;