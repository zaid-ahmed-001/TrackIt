import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Box, Typography } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import './style.css'
const SemiCircularProgressBar = ({ percentage, label, color }:any) => {
  return (
    <Box
      sx={{
        width: 160,
        height: 160, // Height adjusted for semi-circle
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CircularProgressbar
       className="custom-progressbar"
        value={percentage}
        text={`${percentage}%`}
        circleRatio={0.5}
        strokeWidth={20}
        styles={buildStyles({
          rotation: 1 / 4 + 1 / 2, // Start at the bottom
          strokeLinecap: "butt",
          pathColor: color,
          trailColor: "#494F56",
          textColor: "white",
          textSize:"12px",

        })}
      />
      <Box
        sx={{
          zIndex: 3,
          marginTop: "-4rem", // Adjust margin to position the label correctly
        }}
      >
        <Typography sx={{ color: "white", fontSize: "15px", textAlign: "center" }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

export default SemiCircularProgressBar;
