"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";


const mainCard = {
  minWidth: "220px",
  height: "250px",
  borderRadius: "50px ",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 3px 6px 3px #BCBCBC40",
  marginTop: "1.5rem",
  marginRight: "2rem",
  "& .css-4gjyzt-MuiCardContent-root": {
    padding: 0,
  },
  position: 'relative'
};
const imageBox = (image: any) => ({
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "50%",
  overflow: "hidden",
  width: "90px",
  height: "100px",
  marginTop: "1.2rem",
  marginBottom: "1rem",
  backgroundColor:'#add8e6'
});

const ImageCard = (props: any) => {
  const data = props.data
  
  const [openDialog, setOpenDialog] = useState(false);
  const [playerReports, setPlayerReports] = useState([]);

  const type = props.type
  const isTrue = props.isTrue
  const theme = useTheme()
  const supabaseBaseUrl = 'https://tnlczbfzxyxxtfytyihs.supabase.co/storage/v1/object/public/images/';
  const profileImage = data.profile ? supabaseBaseUrl + data.profile : '/utilits/img/player1.png';

  function handleDeleteButton() {
    props.onDelete(data._id);
  }
  const router = useRouter()
  async function handleEditButton() {
    router.push(`dashboard/form/${data._id}`);
  }
  const token = useSelector(
    (state: RootState) => state.profileReducer.token
  );
  const fetchPlayerReports = async (playerId: string) => {
    try {
       const response = await axios.get(`https://trackit-backend-api.onrender.com/player-reports/${playerId}`, {
        headers: {
          Authorization: token
        }
      });
      setPlayerReports(response.data);
    } catch (error) {
      console.error('Error fetching player reports:', error);
    }
  };
  

  const handleOpenDialog = () => {
    fetchPlayerReports(data.playerId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSeasonClick = (reportId: any) => {
    router.push(`/dashboard/report/${reportId}`);
  };

  return (<>
    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Season Player was part of:</DialogTitle>
        <DialogContent>
          <List>
            {playerReports.length > 0 ? (
              playerReports.map((report:any, index:any) => (
                <ListItem key={index}>
                  <Button onClick={() => handleSeasonClick(report._id)}>
                    {report.season}
                  </Button>
                </ListItem>
              ))
            ) : (
              <ListItem>No reports found for this player.</ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
    </Dialog>

    <Card key={data.id} sx={mainCard}>

      <EditIcon sx={{
        position: 'absolute', top: '18px', right: '18px', color: 'gray', fontSize: '20px', '&:hover': {
          cursor: 'pointer',
          color: 'lightgray',
          zIndex: 3
        }
      }}
        // onClick={handleOption}
        onClick={handleEditButton}
      />
      <DeleteIcon sx={{
        position: 'absolute', top: '48px', right: '18px', color: 'gray', fontSize: '20px', '&:hover': {
          cursor: 'pointer',
          color: 'lightgray',
          zIndex: 3
        }
      }}
        // onClick={handleOption}
        onClick={handleDeleteButton}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '&:hover': { cursor: 'pointer' }
        }}
        onClick={handleOpenDialog}
      >

        <img src={profileImage} alt="Profile" style={{
          width: '90px',
          height: '100px',
          marginTop: '1.2rem',
          marginBottom: '1rem',
          borderRadius: '50%',
          objectFit: 'cover',
          backgroundColor: '#add8e6',
        }} />

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          style={{ padding: 0 }}
        >



          <Typography
            gutterBottom
            component="div"
            sx={{
              textAlign: "center",
              fontSize: "17px",
              fontWeight: "600",
              lineHeight: "19.04px",
              letterSpacing: "0.02em",
            }}
          >
            {data.name}
          </Typography>
          <Box
            sx={{
              width: "105px",
              height: "25px",
              borderRadius: "16px",
              backgroundColor: "#CEFFFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "10px",
                fontWeight: 600,
                lineHeight: "11.2px",
                letterSpacing: "0.02em",
                color: `${theme.palette.primary.main}`,
              }}
            >
              {data.position}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "220px",
              height: "61px",
              borderBottomRadius: "50px ",
              backgroundColor: isTrue
                ? theme.palette.primary.main : "",
            }}
          >
            <Typography
              variant="h5"
              color="text.primary"
              sx={{
                textAlign: "center",
                fontSize: "11px",
                fontWeight: 600,
                lineHeight: "14.56px",
                letterSpacing: "0.02em",
                color: "#2A3439",
                marginTop: "1rem"
              }}
              textTransform="uppercase"
            >
              { data.team}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  </>)
}

export default ImageCard
