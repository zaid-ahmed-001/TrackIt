'use client'
import React, { useEffect, useRef, useState } from "react";
import { Container, Grid, Card, CardContent, TextField, MenuItem, Button, Typography, RadioGroup, FormControlLabel, Radio, useTheme, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Autocomplete } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, useStore } from "react-redux";
import { RootState } from "@/lib/store";
import axios from "axios";
import { BarChart } from '@mui/x-charts/BarChart';
import ReactApexChart from 'react-apexcharts';
const colors = ['#38B6FF', '#FF5733', '#33FF57', '#FF33A1', '#FFBD33', '#8D33FF'];

interface Player {
  name: string;
  season: string;
  team: string;
  [key: string]: string | number; // Allows dynamic stat fields
}
interface PlayerMetrics {
  name: string;
  team: string;
  season: string;
  [key: string]: string | number; // Allows dynamic stat fields
}

const Content = () => {
  const [userName,setuserName] = useState("")
  const coachName = useSelector(
    (state: RootState) => state.profileReducer.name
  );
  useEffect(()=>{
    setuserName(coachName);
  },[coachName])

  const router = useRouter()
  const theme = useTheme();
  const [activeItem, setActiveItem] = useState("Compare");
  const [players, setPlayers] = useState<Player[]>([
    { name: "", season: "", team: "" },
    { name: "", season: "", team: "" }
  ]);
  const [allplayers, setAllPlayers] = useState<Player[]>([
    { name: "", season: "", team: "" },
    { name: "", season: "", team: "" }
  ]);

  const [selectedSection, setSelectedSection] = useState("Stats");
  const [isComparing, setIsComparing] = useState(false);

  const handleChange = (index: number, field: keyof Player, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const addComparison = () => {
    setPlayers([...players, { name: "", season: "", team: "" }]);
  };

  const [comparisonData, setComparisonData] = useState<PlayerMetrics[]>([]); // Add this
  const sections = [
    {
      title: "Psychosocial Aspects",
      categories: [
        {
          title: "Internal Control",
          fields: [
            { id: 'goalOriented', name: "Goal Orientation", value: 0 },
            { id: 'frustation', name: "Frustration Resistance", value: 0 },
            { id: 'personal', name: "Personal Care", value: 0 },
          ],
        },
        {
          title: "External Control",
          fields: [
            { id: 'selfMotivation', name: "Self-motivation and Leadership", value: 0 },
            { id: 'coorperation', name: "Cooperation and Solidarity", value: 0 },
            { id: 'fair', name: "Fair Play", value: 0 },
          ],
        },
      ],
    },
    {
      title: "Technical Aspects",
      categories: [
        {
          title: "With Ball",
          fields: [
            { id: 'ballControl', name: "Ball Control", value: 0 },
            { id: 'playingTheBall', name: "Playing the Ball", value: 0 },
            { id: 'solvingSituation', name: "Solving 1v1 Situations", value: 0 },
            { id: 'shootingAndScoring', name: "Shooting and Scoring Goals", value: 0 },
            { id: 'nonDominateLeg', name: "Non-dominant Leg", value: 0 },
            { id: 'clearences', name: "Clearances", value: 0 },
          ],
        },
        {
          title: "Without Ball",
          fields: [
            { id: 'marking', name: "Marking the Opponent", value: 0 },
            { id: 'timing', name: "Timing", value: 0 },
            { id: 'anticaption', name: "Anticipation", value: 0 },
            { id: 'recovery', name: "Recovery", value: 0 },
          ],
        },
      ],
    },
    {
      title: "Tactical Aspects",
      categories: [
        {
          title: "Attack",
          fields: [
            { id: 'combiningWithTeammates', name: "Combining with Teammates", value: 0 },
            { id: 'readingOffensiveGameSituations', name: "Reading Offensive Game Situations", value: 0 },
            { id: 'managingSpaceTimeInAttack', name: "Managing Space in Time", value: 0 },
          ],
        },
        {
          title: "Defense",
          fields: [
            { id: 'defensivePositioning', name: "Defensive Positioning", value: 0 },
            { id: 'readingDefensiveGameSituations', name: "Reading Defensive Game Situations", value: 0 },
            { id: 'managingSpaceTimeInDefense', name: "Managing Space in Time", value: 0 },
          ],
        },
      ],
    },
    {
      title: "Physical Aspects",
      categories: [
        {
          title: "Conditional",
          fields: [
            { id: 'endurance', name: "Endurance", value: 0 },
            { id: 'strength', name: "Strength", value: 0 },
            { id: 'speed', name: "Speed", value: 0 },
            { id: 'flexibility', name: "Flexibility", value: 0 },
            { id: 'coordination', name: "Coordination and Proprioception", value: 0 },
          ],
        },
        {
          title: "Without Ball",
          fields: [
            { id: 'functionalTraining', name: "Functional Training Habits", value: 0 },
            { id: 'postRecovery', name: "Post-exertion Recovery Habits", value: 0 },
          ],
        },
      ],
    },
  ];
  
  const handleCompare = () => {
    const selectedPlayers: PlayerMetrics[] = players
      .map((player) => {
        // Find the matched player from allplayers based on name, season, and team
        const matchedPlayer = allplayers.find(
          (p) => p.name === player.name && p.season === player.season && p.team === player.team
        );
        
        if (!matchedPlayer) return null; // If no matched player is found, return null
  
        // Initialize the playerMetrics object
        const playerMetrics: PlayerMetrics = {
          id: matchedPlayer._id, // Include the player id here
          name: matchedPlayer.name,
          team: matchedPlayer.team,
          season: matchedPlayer.season,
        };
  
        // Iterate through all sections, categories, and fields to populate playerMetrics
        sections.forEach((section) => {
          section.categories.forEach((category) => {
            category.fields.forEach((field) => {
              const fieldName = field.name.replace(/\s+/g, ''); // Remove spaces for direct property matching
              const playerFieldValue = matchedPlayer?.[field.id]; // Access the field dynamically from matchedPlayer
  
              // If field exists in matchedPlayer, use it, otherwise default to "N/A"
              playerMetrics[field.name] = playerFieldValue ?? "N/A"; 
            });
          });
        });
  
        return playerMetrics;
      })
      .filter((p): p is PlayerMetrics => p !== null); // Remove any null values
  
    // Update state with the comparison data
    setComparisonData(selectedPlayers);
    setIsComparing(true);
  };

  const token = useSelector(
    (state: RootState) => state.profileReducer.token
  );

  const fetchData = async () => {
    try {
      const response = await axios.get("https://trackit-backend-api.onrender.com/reportsall", {
        headers: {
          Authorization: token,
        },
      });
      const mappedPlayers = response.data.map((player: Player) => ({
        ...player,
        team: `${player.team} - Session ${player.season}`, // Append season to team name
      }));
      setAllPlayers(mappedPlayers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
      <Grid
        container
        sx={{
          backgroundColor: '#2A3439',
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* **************** Side Bar Start **************** */}
          <Grid item lg={2.5}>
            <Box
              sx={{
                marginTop: "4.7rem",
                marginLeft: "2rem",
                width: "18rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "16rem",
                  height: "2rem",
                  borderTop: "1px solid #65BEBE",
                }}
              ></Box>
              <Box
                sx={leftInner("Photos", activeItem, theme)}
                onClick={() => router.push('../dashboard')}
                className={activeItem === "Photos" ? "pseudo" : ""}
              >
                Players
              </Box>
              <Box
                sx={leftInner("Team", activeItem, theme)}
                onClick={() => router.push('../dashboard/form')}
                className={activeItem === "Team" ? "pseudo" : ""}
              >
                Add Players
              </Box>
              <Box
                sx={leftInner("Compare", activeItem, theme)}
                onClick={() => router.push('../dashboard/compare')}
                className={activeItem === "Compare" ? "pseudo" : ""}
              >
                Compare Players
              </Box>

            </Box>
          </Grid>
        {/* **************** Side Bar End **************** */}

        <Grid
          item
          lg={9.2}
          sx={{
            color: '#000',
            backgroundColor: "#FFFFFF",
            height: "97vh",
            borderRadius: "30px",
          }}
        >
          <Grid
            lg={11.1}
            container
            sx={{
              marginLeft: "3rem",
            }}
          >
            {/* **************** Header Start **************** */}
            <Grid
              item
              lg={12}
              sx={{
                display: "flex",
                height: "4rem",
                color: theme.palette.secondary.main,
                alignItems: "center",
                justifyContent: "start",
                borderBottom: "1px solid #65BEBE ",
              }}
            >
              <Grid
                item
                lg={9.5}
                sx={{
                  fontSize: "28px",
                  fontWeight: "600",
                  lineHeight: "31.36px",
                  letterSpacing: "0.02em",
                }}
              >
                TNGS Sports Academy
              </Grid>
            </Grid>
          </Grid>
          {/* **************** Pagination Start **************** */}
          <Container>
          {!isComparing && (<>
            <Typography variant="h4" gutterBottom style={{color: '#fff'}}>Compare Players</Typography>
            <Grid container spacing={2}>
              {players.map((player, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Autocomplete
                        fullWidth
                        options= {Array.from(new Set(allplayers.map((p) => p.name)))}
                        value={player.name}
                        onChange={(_, newValue:any) => {
                          handleChange(index, "name", newValue);
                          handleChange(index, "team", ""); // Reset team selection when player changes
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Player Name" variant="outlined" margin="normal" />
                        )}
                      />
                      <Autocomplete
                        fullWidth
                        options={
                          allplayers
                            .filter((p) => p.name === player.name) // Get teams for selected player
                            .map((p) => p.team) // Extract teams
                        }
                        value={player.team}
                        onChange={(_, newValue:any) => handleChange(index, "team", newValue)}
                        renderInput={(params) => (
                          <TextField {...params} label="Team Name" variant="outlined" margin="normal" />
                        )}
                      />

                        <TextField
                          fullWidth
                          select
                          label="Select Season"
                          variant="outlined"
                          value={player.season}
                          onChange={(e) => handleChange(index, "season", e.target.value)}
                          margin="normal"
                        >
                          {allplayers
                            .filter((p) => p.name === player.name && p.team === player.team) // Filter by player name & team
                            .map((p) => p.season) // Extract seasons
                            .flat() // Flatten the seasons in case of nested arrays
                            .filter((season, index, self) => self.indexOf(season) === index) // Remove duplicates
                            .sort((a, b) => a.localeCompare(b)) // Optional sorting for seasons
                            .map((season) => (
                              <MenuItem key={season} value={season}>
                                {season}
                              </MenuItem>
                            ))}
                        </TextField>

                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={addComparison} style={{ marginTop: 16 }}>
              Add Comparison
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCompare} style={{ marginTop: 16, marginLeft: 16 }}>
              Compare
            </Button>
          </>)}
          {isComparing && (
            <Container style={{ marginTop: 20 }}>
              {/* Select section to compare */}
              <RadioGroup
                row
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                {sections.map((section) => (
                  <FormControlLabel
                    key={section.title}
                    value={section.title}
                    control={<Radio />}
                    label={section.title}
                  />
                ))}
              </RadioGroup>

              {/* Find the selected section */}
              {sections.some((sec) => sec.title === selectedSection) ? (
                (() => {
                  const selectedSectionObject = sections.find(
                    (sec) => sec.title === selectedSection
                  );
                  const radarData: { subject: string; [key: string]: number | string }[] = selectedSectionObject?.categories.flatMap((category) => 
                    category.fields.map((field) => ({
                      subject: field.name,
                      ...comparisonData.reduce((acc, player, index) => {
                        acc[`Player${index + 1}`] = player[field.name];
                        return acc;
                      }, {} as Record<string, number | string>),
                    }))
                  ) || [];
                  selectedSectionObject?.categories.flatMap((category) => 
                    category.fields.map((field) => ({
                      subject: field.name,
                      ...comparisonData.reduce((acc, player, index) => {
                        acc[`Player${index + 1}`] = player[field.name];
                        return acc;
                      }, {} as Record<string, number | string>),
                    }))
                  ) || [];
          
                  const series = players.map((player, index) => ({
                    name: player.name + ' - ' + player.team ,
                    data: radarData ? radarData.map((data) => typeof data[`Player${index + 1}`] === 'number' ? data[`Player${index + 1}`] as number : null) : [],
                  }));
          
                  const options = {
                    chart: {
                      type: 'radar' as const,
                    },
                    title: {
                      text: '',
                    },
                    xaxis: {
                      categories: radarData.map((data) => data.subject),
                    },
                    colors: colors.slice(0, players.length),
                  };
                  return (<>
                    <TableContainer sx={{ '&::-webkit-scrollbar': { display: 'none' }}}  component={Paper}
                     style={{ marginTop: 20, overflow: 'scroll', maxHeight: '75vh' }}>
                                          <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', zIndex: "3", color: 'black'}}>
                      <ReactApexChart options={options} series={series as ApexAxisChartSeries} type="radar" height={550} width={750} />
                    </div>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            {players.map((player, index) => (
                              <TableCell key={index}  style={{textAlign: 'center'}}>
                                {player.name || `Player ${index + 1}`}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* Basic Info */}
                          <TableRow>
                            <TableCell>Team</TableCell>
                            {comparisonData.map((player, index) => (
                              <TableCell key={index} style={{textAlign: 'center'}}>{player.team || "N/A"}</TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell>Season</TableCell>
                            {comparisonData.map((player, index) => (
                              <TableCell key={index} style={{textAlign: 'center'}}>{player.season || "N/A"}</TableCell>
                            ))}
                          </TableRow>

                          {/* Loop through all metrics */}
                          {selectedSectionObject?.categories?.map((category) =>
                            category.fields.map((field) => (
                              <TableRow key={field.name}>
                                <TableCell>{field.name}</TableCell>
                                {comparisonData.map((player, index) => (
                                  <TableCell key={index}
                                  >
                                    {/* <Bar label={field.id} color={'#38B6FF'} val={player[field.name]} /> */}
                                      <BarChart
                                      layout='horizontal'
                                      width={300}
                                      height={130}
                                      series={[
                                          { data: Array.of(typeof player[field.name] === 'number' ? player[field.name] as number : null) }
                                      ]}
                                      borderRadius={3}
                                      xAxis={[{scaleType: 'linear', min:0, max:100, labelStyle:{width:'100px', overflow:'visible'} }]}
                                      yAxis={[{ scaleType: 'band',  data: [''],
                                        colorMap: { colors: [colors[index]], type:'ordinal'},
                                        disableTicks:true, labelStyle:{width:'0px'} }]
                                        }
                                      />
                                    {/* {player[field.name] !== undefined ? player[field.name] : "N/A"} */}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </>);
                })()
              ) : (
                <Typography color="error">Choose one of the Options!</Typography>
              )}
            </Container>
          )}
          </Container>
          {/* **************** Pagination End **************** */}
        </Grid>
    </Grid>
  );
}

export default Content;
const leftInner = (item: any, activeItem: any, theme: any) => ({
  marginBottom: "0rem",
  marginTop: "0.2rem",
  marginLeft: "2rem",
  fontSize: "15px",
  fontWeight: "500",
  lineHeight: "16.8px",
  letterSpacing: "0.02em",
  display: "flex",
  alignItems: "center",
  backgroundColor: activeItem === item ? "#FFFFFF" : "transparent",
  borderRadius: activeItem === item ? "30px 0px 0px 30px" : "0",
  color: activeItem === item ? theme.palette.primary.main : "inherit",
  cursor: "pointer",
  height: "3.5rem",
  paddingLeft: "1rem",
  position: "relative",
});