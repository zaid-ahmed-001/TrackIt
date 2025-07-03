"use client";
import { Box, Container, FormControlLabel, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import * as React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from "@mui/material/Typography";
import { League_Spartan, Kanit, Pacifico, Montserrat } from "next/font/google";
import back from "../../../../utilits/img/backgroundimageReport.png";
import TngsLogo from "../../../../utilits/img/tngslogo.png";
import Cloud from "../../../../utilits/img/cloud.png";
import SemiCircularProgressBar from "./component/progressbar";
import Report1 from "./component/report1";
import './component/practise.css'
import { useGetReportQuery } from "../../../Services/userService";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import ReactApexChart from "react-apexcharts";


const spartan = League_Spartan({ subsets: ["latin"] });


export default function ReportPage({ params }: { params: { id: string } }) {
  let reportId = params.id;
  
  const { data, isLoading, error,refetch } = useGetReportQuery(reportId);
  React.useEffect(()=>{
    refetch()
  },[])

  const [state, setState] = React.useState({
    series: [{
      name: 'Series 1',
      data: [80, 50, 30, 40, 100, 20],
    }],
    options: {
      chart: {
        type: "radar" as const,
        height: 350,
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      title: {
        text: 'Indivisual Player Performance Radar Chart'
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 0
      },
      yaxis: {
        stepSize: 20
      },
      xaxis: {
        categories: ['2011', '2012', '2013', '2014', '2015', '2016']
      }
    },
  });
  const [stateSecond, setStateSecond] = React.useState({
    series: [
      {
        name: "Player Averages",
        data: [0, 0, 0, 0], // Initial empty data
      },
    ],
    options: {
      chart: {
        type: "radar" as const,
        height: 350,
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      title: {
        text: "Overall Player Performance Radar Chart",
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.1,
      },
      markers: {
        size: 3,
      },
      yaxis: {
        stepSize: 20,
      },
      xaxis: {
        categories: ["Psychosocial", "Technical", "Tactical", "Physical"],
      },
    },
  });

  React.useEffect(() => {
    if (data) {
      const numericData = Object.entries(data)
        .filter(([key, value]) => typeof value === "number")
        .map(([key, value]) => value);
      const categories = Object.entries(data)
        .filter(([key, value]) => typeof value === "number")
        .map(([key, value]) => key);
      setState((prevState:any) => ({
        ...prevState,
        series: [{ ...prevState.series[0], data: numericData }],
        options: {
          ...prevState.options,
          xaxis: { categories },
        },
      }));
    }
  }, [data]);

  React.useEffect(() => {
    if (data) {
      const averagePsychosocial = Math.floor(
        (data.goalOriented +
          data.frustation +
          data.personal +
          data.selfMotivation +
          data.coorperation +
          data.fair) /
          6
      );
      const averageTechnical = Math.floor(
        (data.ballControl +
          data.playingTheBall +
          data.solvingSituation +
          data.shootingAndScoring +
          data.nonDominateLeg +
          data.clearences +
          data.marking +
          data.timing +
          data.anticaption +
          data.recovery) /
          10
      );
      const averageTactical = Math.floor(
        (data.combiningWithTeammates +
          data.readingOffensiveGameSituations +
          data.managingSpaceTimeInAttack +
          data.defensivePositioning +
          data.readingDefensiveGameSituations +
          data.managingSpaceTimeInAttack) /
          6
      );
      const averagePhysical = Math.floor(
        (data.endurance +
          data.strength +
          data.speed +
          data.flexibility +
          data.coordination +
          data.functionalTraining +
          data.postRecovery) /
          7
      );
      setStateSecond((prevState) => ({
        ...prevState,
        series: [
          {
            ...prevState.series[0],
            data: [
              averagePsychosocial,
              averageTechnical,
              averageTactical,
              averagePhysical,
            ],
          },
        ],
      }));
    }
  }, [data]);

  if (!data) {
    return <>Data not available</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Technical issue is there</>;
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
        light: "#f5f4fe",
      },
      secondary: {
        main: "#040616",
        light: "#8697B4",
      },
      success: {
        main: "#196C6C",
      },
      info: {
        main: "#AEB8B8",
        light: "#F5F4FF",
      },
    },
    typography: {
      subtitle1: {
        fontFamily: spartan.style.fontFamily,
        fontWeightRegular: 600,
        fontSize: 28,
      },
      body1: {
        fontFamily: spartan.style.fontFamily,
        fontWeightRegular: 600,
        fontSize: 14,
      },
      body2: {
        fontFamily: spartan.style.fontFamily,
        color: "secondary.main",
        fontWeightRegular: 600,
        fontSize: 15,
      },
    },
  });
  const router = useRouter()
  const name = data.name;
  const nameParts = name.split(" ");
  const firstName = nameParts[0].toUpperCase();
  let lastName =
    nameParts[1]?.charAt(0).toUpperCase() + nameParts[1]?.slice(1).toLowerCase();
  if (!lastName) {
    lastName = "player";
  }

  const position = data.position.toUpperCase();
  const age = data.age;
  const season = data.season;
  const team = data.team.toUpperCase();
  const averagePsychosocial = Math.floor((data.goalOriented + data.frustation + data.personal + data.selfMotivation + data.coorperation + data.fair) / 6);
  const averageTechnical = Math.floor((data.ballControl + data.playingTheBall + data.solvingSituation + data.shootingAndScoring + data.nonDominateLeg + data.clearences + data.marking + data.timing + data.anticaption + data.recovery) / 10)
  const averageTactical = Math.floor((data.combiningWithTeammates + data.readingOffensiveGameSituations + data.managingSpaceTimeInAttack + data.defensivePositioning + data.readingDefensiveGameSituations + data.managingSpaceTimeInAttack) / 6);
  const averagePhysical = Math.floor((data.endurance + data.strength + data.speed + data.flexibility + data.coordination + data.functionalTraining + data.postRecovery) / 7)
  const supabaseBaseUrl = 'https://tnlczbfzxyxxtfytyihs.supabase.co/storage/v1/object/public/images/';
  const profileImage = data.profile ? supabaseBaseUrl + data.profile : '/utilits/img/player1.png';
  const logoImage = data.logo ? supabaseBaseUrl + data.logo : '/utilits/img/clublogo.png';
  console.log('Report profileImage URL:', profileImage);
  console.log('Report logoImage URL:', logoImage);
  return (
    <ThemeProvider theme={theme}>
      <Box className='absolute left-10 top-3 z-10'><IconButton sx={{color:"white"}} onClick={()=>router.push('/dashboard')} ><ArrowBackIcon/></IconButton></Box>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          background: "#2A3439",
          display: "grid",
          placeItems: "center",
          position: 'relative'
        }}
      >
        <Grid
          container
          sx={{
            position: "absolute",
            bottom: '0px',
            top: "60px",
            marginLeft: "14vw",
            marginRight: "14vw",
            width: { lg: "1128px", md: "500px", sm: "500px" },
            background: "linear-gradient(to right, #ffffff, #e0e0e0)",
            boxShadow: "0px 20px 30px 0px #A9A9A940",
            display: "flex",
            justifyContent: "center",
            overflowY: "scroll",
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "90.3%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              background: `linear-gradient(to bottom, black 54%, transparent 70%), 
                url(${back.src})`,
              zIndex: "0",
              position: "absolute",
            }}
          />
          <Box
            sx={{
              backgroundImage: `url(${TngsLogo.src})`,
              width: "45%",
              height: "60%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "absolute",
              zIndex: 1,
              top: "5.7rem",
              left: "-.7rem",
            }}
          />
          <img src={profileImage} alt="Profile" style={{
            width: '45%',
            height: '59%',
            objectFit: 'cover',
            position: 'absolute',
            zIndex: 2,
            top: '5.89rem',
            left: '0.4rem',
            borderRadius: '50%',
            backgroundColor: '#add8e6',
          }} />
          <img src={logoImage} alt="Logo" style={{
            width: '10rem',
            height: '10rem',
            objectFit: 'cover',
            position: 'absolute',
            zIndex: 1,
            top: '23.5rem',
            right: '11rem',
            borderRadius: '50%',
            backgroundColor: '#add8e6',
          }} />
          <Grid sx={{ height: "5rem" }}>
            <Grid
              sx={{
                zIndex: 2,
                width: "100%",
                height: "5rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "5rem",
              }}
            >
              <Box sx={{ marginLeft: "18rem" }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "35px",
                    fontFamily: "Kanit",
                    lineHeight: "38px",
                    letterSpacing: "5px",
                    transform: "scale(2.3,1.3) ",
                    marginBottom: ".5rem",
                    fontWeight:700,
                    marginLeft: "0rem",
                  }}
                >
                  COMPETENCE
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "25px",
                    fontFamily: "Kanit",
                    lineHeight: "38px",
                    letterSpacing: "3px",
                    transform: "scale(1.3)",
                    fontWeight:700
                  }}
                >
                  REPORT
                </Typography>
              </Box>{" "}
            </Grid>
            <Grid
              container
              lg={12}
              justifyContent="start"
              alignItems="center"
              gap={7}
              sx={{ width: "100%", marginLeft: "13rem", marginTop: "2rem" }}
            >
              <Typography
                sx={{
                  color: "#F58E1F",
                  fontSize: "40px",
                  fontFamily: "Montserrat",
                  transform: "scale(1.3,1)",
                  marginLeft: "5rem",
                  marginTop: "0.5rem",
                  fontWeight:700
                }}
              >
                {firstName}
              </Typography>
              <Typography
                sx={{
                  color: "#F58E1F",
                  fontSize: "30px",
                  fontFamily: "Pacifico, cursive",
                  lineHeight: "40px",
                  letterSpacing: "3px",
                  transform: "scale(1.4,1.5)",
                  marginLeft: ".1rem",
                  fontWeight:400
                }}
              >
                {lastName}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            lg={12}
            sx={{
              zIndex: 2,
              width: "100%",
              height: "10rem",
              marginLeft: "32rem",
              marginTop: "14rem"
            }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              lg={12}
              sx={{ display: "flex", justifyContent: "start" }}
            >
              <Typography sx={positionstyle}>POSITION: {position}</Typography>
            </Grid>
            <Grid
              item
              lg={12}
              sx={{ display: "flex", justifyContent: "start" }}
            >
              <Typography sx={positionstyle}>Date of Birth: {age}</Typography>
            </Grid>
            <Grid
              item
              lg={12}
              sx={{ display: "flex", justifyContent: "start" }}
            >
              <Typography sx={positionstyle}>TEAM: {team}</Typography>
            </Grid>
            <Grid
              item
              lg={12}
              sx={{ display: "flex", justifyContent: "start" }}
            >
              <Typography sx={positionstyle}>SEASON: {season}</Typography>
            </Grid>
          </Grid>
          <Grid>
            <Box
              sx={{
                backgroundImage: `url(${Cloud.src})`,
                width: "100%",
                height: "42%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                zIndex: 0,
                top: "34.2rem",
                left: '0rem'
              }}
            />
            <Grid container lg={12} gap={10} sx={{ zIndex: "3", marginTop: "11.5rem", marginLeft: "2rem", marginBottom: "6.5rem" }}>
              <SemiCircularProgressBar percentage={averagePsychosocial} color="#38B6FF" label="PSYCHOSOCIAL ASPECTS" />
              <SemiCircularProgressBar percentage={averageTechnical} color="#FFB800" label="TECHNICAL ASPECTS" />
              <SemiCircularProgressBar percentage={averageTactical} color="#F58E1F" label="TACTICAL ASPECTS" />
              <SemiCircularProgressBar percentage={averagePhysical} color="#5271FF" label="PHYSICAL ASPECTS" />
            </Grid>

            <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', zIndex: "3", color: 'black'}}>
              <ReactApexChart options={state.options} series={state.series} type="radar" height={650} width={550} />
            </div>
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', zIndex: "3", color: 'black'}}>
              <ReactApexChart options={stateSecond.options} series={stateSecond.series} type="radar" height={650} width={550} />
            </div>

          </Grid>
          <Report1 data={data} />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

const positionstyle = {
  fontFamily: "Montserrat",
  color: "white",
  fontSize: "20px",
  letterSpacing: "4px",
  marginBottom: "10px",
  fontWeight:700
};