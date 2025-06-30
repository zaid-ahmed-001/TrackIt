"use client";
// @ts-ignore
import {
  Box,
  Button,
  MenuItem,
  Pagination,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Grid } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import React, { useEffect, useLayoutEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Search } from "@mui/icons-material";
import axios from "axios";
import ImageCard from "../components/Card";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setisLogin, setToken } from "@/lib/features/profileSlicer";
import { notify } from "@/utilits/toasts/toast";
import { useFormikContext } from 'formik';


const pageLimit = 7;
const page = () => {
  const theme = useTheme();
  const [activeItem, setActiveItem] = useState("Photos");
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const [del, setDel] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [dataCount, setDataCount] = useState(0);
  const [type, setType] = useState("none");
  const [search, setSearch] = useState("");
  const [completeData, setcompleteData] = useState<any[]>([]);
  const [dropdown, setdropdown] = useState(false)
  const [username, setUserName] = useState("")
  const [deleteVal, setDeleteVal] = useState(false);
  const [change, setChange] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const isLogin = useSelector(
    (state: RootState) => state.profileReducer.isLogin
  );
  const name = useSelector(
    (state: RootState) => state.profileReducer.name
  );
  useEffect(() => {
    setUserName(name)
  }, [name])
  async function handleLogout() {
    notify("logout Successfully")
    dispatch(setToken(""))
    dispatch(setisLogin(false))
  }

  const checkCondition = (type: any, id: any) => {
    if (
      (type === "Even" && id % 2 === 0) ||
      (type === "Odd" && id % 2 != 0) ||
      (type === "Prime" && isPrime(id))
    )
      return true;

    return false;
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://trackit-backend-api.onrender.com/reports", {
        headers: {
          Authorization: token
        }
      }
      );
      setDataCount(response.data.length);
      setcompleteData(response.data);
      setPagesCount(Math.ceil(response.data.length / pageLimit));
      setEmployeeData(
        response.data.slice(
          currentPage * pageLimit,
          currentPage * pageLimit + pageLimit + 1
        )
      );
    };
    fetchData();
  }, [currentPage, change]);

  useEffect(() => {
    if (search != "") {
      const temp = completeData.filter(
        (itr) => itr.name.slice(0, search.length) === search
      );
      if (temp.length < currentPage * pageLimit) {
        setEmployeeData(temp.slice(0, pageLimit + 1));
      } else {
        setEmployeeData(
          temp.slice(
            currentPage * pageLimit,
            currentPage * pageLimit + pageLimit + 1
          )
        );
      }
    } else {
      setEmployeeData(
        completeData.slice(
          currentPage * pageLimit,
          currentPage * pageLimit + pageLimit + 1
        )
      );
    }
  }, [search, currentPage]);
  const handletypeChange = (e: any) => {
    setType(e.target.value);
  };
  const handlesearchChange = (e: any) => {
    setSearch(e.target.value);
  };
  const token = useSelector(
    (state: RootState) => state.profileReducer.token
  );

  // ******** Delete ********


  async function handleDelete(id: any) {
    console.log(id)
    await axios.delete(`https://trackit-backend-api.onrender.com/player-reports/${id}`, {
      headers: {
        Authorization: token
      }
    });
    setChange(!change);
  }

  useEffect(() => {
    setEmployeeData(del);
  }, [change])


  // ******** Edit ********

  // const { values, errors, touched, setFieldValue } = useFormikContext();





  return (
    <>
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
              onClick={() => setActiveItem("Photos")}
              className={activeItem === "Photos" ? "pseudo" : ""}
            >
              Players
            </Box>
            <Box
              sx={leftInner("Team", activeItem, theme)}
              onClick={() => router.push('dashboard/form')}
              className={activeItem === "Team" ? "pseudo" : ""}
            >
              Add Players
            </Box>
            <Box
              sx={leftInner("Compare", activeItem, theme)}
              onClick={() => router.push('dashboard/compare')}
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
            marginTop: ".7rem",
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
              <Grid item lg={1} textAlign="center">
                <NotificationsNoneIcon />
              </Grid>
              <Grid
                item
                lg={1.5}
                display="flex"
                textAlign="end"
                alignItems={"center"}
                sx={{ position: "relative" }}
                onClick={() => setdropdown(!dropdown)}
              >
                {username}
                {dropdown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}

                <ul style={{ display: dropdown ? "block" : "none", position: "absolute", bottom: "-30px", left: "27px", listStyle: "none" }}>
                  <Button onClick={handleLogout} >Logout</Button>
                </ul>
              </Grid>
            </Grid>
            {/* **************** Header End **************** */}

            {/* **************** Search Bar and Button Start **************** */}
            <Grid
              container
              lg={12}
              alignContent="center"
              sx={{ width: "100%", height: "4rem", marginTop: "16px" }}
              justifyContent="space-between"
            >
              <Grid item lg={3.5} sx={{ height: "48px" }}>
                <TextField
                  variant="outlined"
                  name="search"
                  placeholder="search by name"
                  InputProps={{
                    disableUnderline: true,
                    style: InputProps,
                    endAdornment: <Search />,
                  }}
                  sx={{
                    width: "100%",

                    "& .MuiOutlinedInput-root": {
                      height: "48px",
                      "&.Mui-focused fieldset": {
                        border: `1px solid ${theme.palette.primary.main}`,
                      },
                      "&:hover fieldset": {
                        border: `1px solid ${theme.palette.primary.main}`,
                      },
                    },
                  }}
                  onChange={(e) => handlesearchChange(e)}
                />
              </Grid>

            </Grid>
            {/* **************** Search Bar and Button End **************** */}

            {/* **************** Cards Display Start **************** */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                marginRight: "2.5rem",
                marginLeft: "2rem",
              }}
            >
              {employeeData.map((itr: any) => {
                return (
                  <ImageCard
                    data={itr}
                    isTrue={checkCondition(type, itr.id)}
                    type={type}
                    onDelete={handleDelete}
                  />
                );
              })}
              {employeeData.length === 0 && 
                <Box sx={{ width: "65rem", height: "32rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Box sx={{ color: "black" }}>No Report Present</Box>
                </Box>
              }
            </Box>

            {/* **************** Cards Display End **************** */}
          </Grid>

          {/* **************** Pagination Start **************** */}
          <Grid
            container
            lg={12}
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "6rem",
              marginTop: "1.5rem",
              position: "absolute",
              bottom: "1.5rem",
            }}
          >
            <Grid item lg={6.5}>
              <Typography
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "15.68px",
                }}
              >
                Showing {dataCount===0?0:currentPage * pageLimit + 1} to{" "}
                {dataCount<currentPage * pageLimit + pageLimit + 1?dataCount:currentPage * pageLimit + pageLimit + 1} of {dataCount} entries
              </Typography>
            </Grid>
            <Grid item lg={2}>
              <Pagination
                count={pagesCount}
                color="primary"
                onChange={(
                  event: React.ChangeEvent<unknown>,
                  value: number
                ) => {
                  setCurrentPage(value - 1);
                }}
              />
            </Grid>
          </Grid>
          {/* **************** Pagination End **************** */}
        </Grid>
      </Grid>
    </>
  );
};

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
const InputProps = {
  color: "#AEB8B8",
  fontSize: "16px",
  fontFamily: "League Spartan, sans-serif",
  fontWeight: 500,
  lineHeight: "16.8px",
  height: "2.5rem",
  letterSpacing: "0.02em",
};
const albumStyle = {
  fontSize: "15px",
  fontWeight: "500",
  lineHeight: "16.8px",
  letterSpacing: "0.02em",
};
const isPrime = (num: number) => {
  for (var i = 2; i < num; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
};
export default page;
