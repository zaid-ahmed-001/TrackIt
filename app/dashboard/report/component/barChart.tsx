"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid, Box } from "@mui/material";

export default function Bar({label, val, color}:any) {

  return (
    <Box sx={{width:'200px'}}>
        <BarChart
        layout='horizontal'
        width={500}
        height={130}
        series={[
            { data: Array.of(val) }
        ]}
        margin={{left:230}}
        borderRadius={3}
        xAxis={[{scaleType: 'linear', min:0, max:100, labelStyle:{width:'100px', overflow:'visible'} }]}
        yAxis={[{ scaleType: 'band',  data: [label], colorMap:{colors:[color], type:'ordinal'}, disableTicks:true, labelStyle:{width:'150px'} }]}
        />
    </Box>
  );
}