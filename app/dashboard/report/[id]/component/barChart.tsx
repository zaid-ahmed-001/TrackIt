// "use client"
// import Image from "next/image";
// import styles from "./page.module.css";
// import { BarChart } from '@mui/x-charts/BarChart';
// import { Grid, Box } from "@mui/material";

// export default function Bar({label, val, color}:any) {

//   return (
//     <Box sx={{width:'200px'}}>
//         <BarChart
//         layout='horizontal'
//         width={520}
//         height={130}
//         series={[
//             { data: Array.of(val) }
//         ]}
//         margin={{left:230}}
//         borderRadius={3}
//         xAxis={[{ 
//           scaleType: 'linear', 
//           min: 0, 
//           max: 100,
//           valueFormatter: (value) => {
//             const labels: Record<number, string> = {
//               0: " ",  
//               20: "Bad",
//               40: "Poor",
//               60: "Average",
//               80: "Good",
//               100: "Excellent"
//             };
//             return labels[value] || "";
//           }
//         }]}
//         yAxis={[{ scaleType: 'band',  data: [label], colorMap:{colors:[color], type:'ordinal'}, disableTicks:true, labelStyle:{width:'150px'} }]}
//         />
//     </Box>
//   );
// }

'use client';

import React from 'react';
import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const ranges = [
  { range: 20, label: "Bad" },
  { range: 40, label: "Poor" },
  { range: 60, label: "Average" },
  { range: 80, label: "Good" },
  { range: 100, label: "Excellent" }
];

export default function Bar({ label, val, color }: any) {
  const tooltipLabel = ranges.find(item => val <= item.range)?.label || "Unknown";

  return (
    <Box sx={{ width: '200px' }}>
      <BarChart
        layout='horizontal'
        width={550}
        height={130}
        series={[
          { 
            data: [val], 
            color, 
            // No label here to remove the label above the bar
            valueFormatter: (value) => `${tooltipLabel}`, // Customize tooltip content
          }
        ]}
        margin={{ left: 230 }}
        borderRadius={3}
        xAxis={[{
          scaleType: 'linear',
          min: 0,
          max: 100,
          valueFormatter: (value) => {
            if (value === 0) return " ";
            const rangeItem = ranges.find(item => item.range === value);
            return rangeItem ? rangeItem.label : "";
          }
        }]}
        yAxis={[{
          scaleType: 'band',
          data: [label],
          colorMap: { colors: [color], type: 'ordinal' },
          disableTicks: true
        }]}
        tooltip={{ trigger: 'item' }} // Enable tooltip
      />
    </Box>
  );
}