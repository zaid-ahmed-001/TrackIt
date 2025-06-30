import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Bar from "./barChart";
import logo1 from "../../../../../utilits/img/aspect1.png";
import logo2 from "../../../../../utilits/img/aspect2.png";
import logo3 from "../../../../../utilits/img/aspect3.png";
import logo4 from "../../../../../utilits/img/aspect4.png";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";


const barParent = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  padding: "0px",
  width: "100%",
  paddingTop: "4rem",
  background: "linear-gradient(to right, #ffffff, #e0e0e0)",
  marginBottom:'150px'
};

const barItem = {
  display: "flex",
  marginBottom: "10px",
  padding: "2px",
  width: "100%",
  height: "5.5rem"
};



const logoStyle = {
  height: "90px", // Adjust the height as needed
  marginRight: "8px", // Adjust the spacing as needed
};

export default function Report1(props:any) {
  const data = props.data;
  const sections = [
    {
      title: "Psychosocial Aspects",
      logo: logo1,
      color: "#38B6FF",
      categories: [
        {
          title: "Internal Control",
          fields: [
            { name: "Goal Orientation", value: data.goalOriented },
            { name: "Frustration Resistance", value: data.frustation },
            { name: "Personal Care", value: data.personal }
          ],
        },
        {
          title: "External Control",
          fields: [
            { name: "Self-motivation and Leadership", value: data.selfMotivation },
            { name: "Cooperation and Solidarity", value: data.coorperation },
            { name: "Fair Play", value: data.fair }
          ],
        },
      ],
    },
    {
      title: "Technical Aspects",
      logo: logo2,
      color: "#FFB800",
      categories: [
        {
          title: "With Ball",
          fields: [
            { name: "Ball Control", value: data.ballControl },
            { name: "Playing the Ball", value: data.playingTheBall },
            { name: "Solving 1v1 Situations", value: data.solvingSituation },
            { name: "Shooting and scoring goals", value: data.shootingAndScoring },
            { name: "Non-dominant leg", value: data.nonDominateLeg },
            { name: "Clearances", value: data.clearences },
          ],
        },
        {
          title: "Without Ball",
          fields: [
            { name: "Marking the Opponent", value: data.marking },
            { name: "Timing", value: data.timing },
            { name: "Anticipation", value: data.anticaption },
            { name: "Recovery", value: data.recovery },
          ],
        },
      ],
    },
    {
      title: "Tactical Aspects",
      logo: logo3,
      color: "#F58E1F",
      categories: [
        {
          title: "Attack",
          fields: [
            { name: "Combining with Teammates", value: data.combiningWithTeammates },
            { name: "Reading Offensive Game Situations", value: data.readingOffensiveGameSituations },
            { name: "Managing Space in Time", value: data.managingSpaceTimeInAttack },
          ],
        },
        {
          title: "Defense",
          fields: [
            { name: "Defensive Positioning", value: data.defensivePositioning },
            { name: "Reading Defensive Game Situations", value: data.readingDefensiveGameSituations },
            { name: "Managing Space in Time", value: data.managingSpaceTimeInAttack },
          ],
        },
      ],
    },
    {
      title: "Physical Aspects",
      logo: logo4,
      color: "#5271FF",
      categories: [
        {
          title: "Conditional",
          fields: [
            { name: "Endurance", value: data.endurance },
            { name: "Strength", value: data.strength },
            { name: "Speed", value: data.speed },
            { name: "Flexibility", value: data.flexibility },
            { name: "Coordination and proprioception", value: data.coordination },
          ],
        },
        {
          title: "Without Ball",
          fields: [
            { name: "Functional Training Habits", value: data.functionalTraining },
            { name: "Post-exertion Recovery Habits", value: data.postRecovery },
          ],
        },
      ],
    },
  ];
  return (
    <Box sx={barParent}>
      <Grid container direction="row" spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          {sections.slice(0, 2).map((section) => (
            <Box key={section.title} sx={{ padding: "10px" }}>
              <Typography
                variant="h4"
                sx={{ display: "flex", alignItems: "center" }}
                color="black"
                gutterBottom
              >
                <img src={section.logo.src} alt="logo" style={logoStyle} />
                {section.title}
              </Typography>
              {section.categories.map((category) => (
                <Box key={category.title} sx={{ marginBottom: "80px" }}>
                  <Typography variant="h6" sx={{ marginLeft: "7.3rem" }} color="black" gutterBottom>
                    {category.title}
                  </Typography>
                  {category.fields.map((field) => (
                    <Box key={field.name} sx={barItem}>
                      <Bar label={field.name} color={section.color} val={field.value} />
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          {sections.slice(2).map((section) => (
            <Box key={section.title} sx={{ padding: "10px" }}>
              <Typography
                variant="h4"
                sx={{ display: "flex", alignItems: "center" }}
                color="black"
                gutterBottom
              >
                <img src={section.logo.src} alt="logo" style={logoStyle} />
                {section.title}
              </Typography>
              {section.categories.map((category) => (
                <Box key={category.title} sx={{ marginBottom: "80px" }}>
                  <Typography variant="h6" sx={{ marginLeft: "7.3rem" }} color="black" gutterBottom>
                    {category.title}
                  </Typography>
                  {category.fields.map((field) => (
                    <Box key={field.name} sx={barItem}>
                      <Bar label={field.name} color={section.color} val={field.value} />
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
