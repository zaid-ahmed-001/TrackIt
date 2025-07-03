"use client";
import React, { useLayoutEffect, useState } from "react";
import type { RootState } from "../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setName,
  setToken,
  setisLogin,
} from "../../lib/features/profileSlicer";
import tngsLogo from "../../utilits/img/tngslogo.png";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useSession, signIn } from "next-auth/react";
import * as yup from "yup";
import YupPassword from "yup-password";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Checkbox, colors, Grid, styled, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import image from "../../utilits/img/footballground1.png";
import { Padding } from "@mui/icons-material";
import axios from "axios";
import { notify, failure } from "@/utilits/toasts/toast";
import { ImageStyle } from "../page";
import Image from "next/image";

YupPassword(yup); // for password validation
const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().password().required("Password is required"),
  name: yup.string().required("Name is required"),
});
export default function Counter() {
  const [passvisi, setPassvisi] = useState(false); // password icon
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isLogin = useSelector(
    (state: RootState) => state.profileReducer.isLogin
  );
  const token = useSelector((state: RootState) => state.profileReducer.token);

  useLayoutEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin]);
  /* **************** formik form handling start **************** */

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/userregister`,
          values
        );
        if (response.data.status === 201) {
          dispatch(setToken(response.data.token));
          dispatch(setEmail(response.data.user.email));
          dispatch(setName(response.data.user.name))
          dispatch(setisLogin(true));
          notify("login successfully");
          router.push("/dashboard");
        } else {
          failure(response.data.msg);
        }
      } catch (error) {
        alert("try after some time");
      }
      formik.resetForm();
    },
  });
  /* **************** formik form handling end **************** */

  /* **************** form textfield design css object start **************** */

  const InputProps = {
    color: `${theme.palette.secondary.main}`,
    fontFamily: "League Spartan, sans-serif",
    fontSize: "16px",
    fontWeight: 530,
    lineHeight: "22px",
    marginTop: "19px",
  };

  const GridMainInput = {
    boxShadow: "0px 10px 30px 0px #A9A9A940",
    borderRadius: "35px",
    marginLeft: "2.6rem",
    height:
      (formik.touched.email && Boolean(formik.errors.email)) ||
      (formik.touched.password && Boolean(formik.errors.password))||(formik.touched.name && Boolean(formik.errors.name))
        ? "19rem"
        : "15rem",
  };
  const GridMainInputInner1 = {
    borderBottom: "1px solid #D7D7D7",
    width: "6vw",
    height:
      (formik.touched.email && Boolean(formik.errors.email)) ||
      (formik.touched.password && Boolean(formik.errors.password))||(formik.touched.name && Boolean(formik.errors.name))
        ? "5.8rem"
        : "4.8rem",
  };

  /* **************** form textfield design css object end **************** */

  const passwordVisibility = {
    color: "#8697B4",
    fontSize: "19px",
    marginRight: ".3rem",
    cursor: "pointer",
  };
  const mainBox = {
    backgroundColor:'#2A3439',
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
  };

  return (
    <Container disableGutters maxWidth={false} sx={mainBox}>
      <Grid
        container
        sx={{
          width: "100vw",
          height: " 100vh",
          justifyContent: { xs: "center", lg: "", md: "center" },
          padding: "8vh 10vw ",
        }}
      >
        <Grid
          container
          lg={12}
          // sx={{ boxShadow: "0px 20px 30px 0px #A9A9A940" }}
        >
          <Grid item xs={12} lg={5.5} md={12} sx={{ height: "100%", backgroundColor:'white', borderRadius:'40px 0px 0px 40px' }}>
            {/* **************** left side box start **************** */}

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ height: "95%" }}
            >
              <Grid item xs={12} sx={{ margin: "1rem" }}>
                <Typography variant="h1"> Register to TNGS Sports!</Typography>
              </Grid>
              <form onSubmit={formik.handleSubmit}>
                {/* **************** Complete Form start **************** */}

                <Grid
                  item
                  xs={11}
                  md={12}
                  lg={12}
                  sx={{ height: "auto", marginTop: "1.2rem" }}
                >
                  {/* **************** TextField start **************** */}

                  <Grid
                    container
                    item
                    xs={10}
                    direction="row"
                    alignItems="start"
                    spacing={2}
                    sx={GridMainInput}
                  >
                    {" "}
                    {/* **************** Name field start **************** */}
                    <Grid item xs={12} sx={GridMainInputInner1}>
                      <TextField
                        id="filled-name"
                        label="Name"
                        name="name"
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "#8697B4", fontSize: "16px" },
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: InputProps,
                        }}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{ marginLeft: "1.3rem", width: "89%" }}
                      />
                    </Grid>
                    {/* **************** Name field end **************** */}
                    {/* **************** Email field start **************** */}
                    <Grid item xs={12} sx={GridMainInputInner1}>
                      <TextField
                        id="filled-email"
                        label="Email"
                        name="email"
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "#8697B4", fontSize: "16px" },
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: InputProps,
                        }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{ marginLeft: "1.3rem", width: "89%" }}
                      />
                    </Grid>
                    {/* **************** Email field end **************** */}
                    {/* **************** Password field start **************** */}
                    <Grid item xs={12} sx={{ height: "4.8rem" }}>
                      <label
                        htmlFor="filled-password"
                        style={{ color: "#8697B4" }}
                      >
                        <LockIcon
                          sx={{ fontSize: "14px", marginRight: ".3rem" }}
                        />
                      </label>
                      <TextField
                        id="filled-password"
                        label="Password"
                        name="password"
                        type={passvisi ? "text" : "password"}
                        value={formik.values.password}
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "#8697B4", fontSize: "16px" },
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: InputProps,
                          endAdornment: (
                            <>
                              {passvisi ? (
                                <VisibilityOffIcon
                                  sx={passwordVisibility}
                                  onClick={() => setPassvisi(false)}
                                />
                              ) : (
                                <VisibilityIcon
                                  sx={passwordVisibility}
                                  onClick={() => setPassvisi(true)}
                                />
                              )}
                            </>
                          ),
                        }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        sx={{ width: "89%" }}
                      />
                    </Grid>
                    {/* **************** Password field end **************** */}
                  </Grid>
                  {/* **************** TextField end **************** */}
                  {/* **************** Sign Up button start **************** */}

                  <Grid
                    item
                    xs={10}
                    sx={{
                      marginLeft: "3.4rem",
                      backgroundColor: `${theme.palette.primary.main}`,
                      textAlign: "center",
                      borderRadius: "20px",
                      marginTop: "6rem",
                    }}
                  >
                    <Button
                      type="submit"
                      sx={{
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: "20px",
                      }}
                    >
                      <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
                        Sign Up
                      </Typography>
                    </Button>
                  </Grid>
                  {/* **************** Sign Up button end **************** */}
                </Grid>
                {/* **************** Complete Form end **************** */}
              </form>
            </Grid>
          </Grid>
          {/* **************** Right Side box start **************** */}

          <Grid
            item
            xs={0}
            lg={6.5}
            md={0}
            sx={{
              display: { xs: "none", md: "none", lg: "grid" }, position: 'relative', backgroundColor: "#6bb73c", borderRadius: '0px 40px 40px 0px'
            }}
            alignItems="center"
            justifyContent="center"
          ><Box sx={groundBox}/>
              

              <Box sx={logo}/>
          </Grid>
          {/* **************** Right Side box end **************** */}
        </Grid>
      </Grid>
    </Container>
  );
}
const groundBox={
  backgroundImage: `url(${image.src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width:'665px',
  height:'690px',
  zIndex:'30',
  objectFit:'cover',
  overflow:'hidden',
  borderTopRightRadius:'40px',
  borderBottomRightRadius:'40px'
}
const logo = {
  position: "absolute",
  backgroundImage: `url(${tngsLogo.src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "50%",
  overflow: "hidden",
  top: "32%",
  left: "31%",
  zIndex: '50',
  width: '250px',
  height: '250px',
  borderRadiusRight: '40px'
}
