"use client";
import React, { useLayoutEffect, useState } from "react";
import type { RootState } from "../lib/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setName,
  setToken,
  setisLogin,
} from "../lib/features/profileSlicer";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import image from "../utilits/img/footballground1.png";
import axios from "axios";
import { notify, failure } from "@/utilits/toasts/toast";
import Image from "next/image";
import tngsLogo from "../utilits/img/tngslogo.png";
import { Height } from "@mui/icons-material";
YupPassword(yup); // for password validation
const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().password().required("Password is required"),
});

export default function Counter() {
  const [passvisi, setPassvisi] = useState(false); // password icon
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isLogin = useSelector(
    (state: RootState) => state.profileReducer.isLogin
  );

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
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/userlogin`,
          values
        );
        if (response.data.status === 201) {
          dispatch(setToken(response.data.token));
          dispatch(setEmail(response.data.user.email));
          dispatch(setName(response.data.user.name));
          dispatch(setisLogin(true));
          notify("login Successfuly");
          router.push("/dashboard");
        } else {
          failure(response.data.msg);
        }
      } catch (error) {
        console.log(error);
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
      (formik.touched.password && Boolean(formik.errors.password))
        ? "12rem"
        : "10rem",
  };
  const GridMainInputInner1 = {
    borderBottom: "1px solid #D7D7D7",
    width: "100%",
    height:
      (formik.touched.email && Boolean(formik.errors.email)) ||
      (formik.touched.password && Boolean(formik.errors.password))
        ? "5.8rem"
        : "4.8rem",
    marginTop: ".2rem",
  };
  /* **************** form textfield design css object end **************** */
  const passwordVisibility = {
    color: "#8697B4",
    fontSize: "19px",
    marginRight: ".3rem",
    cursor: "pointer",
  };
  const mainBox = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#2A3439",
  };

  return (
    <Container disableGutters maxWidth={false} sx={mainBox}>
      <Grid
        container
        sx={{
          width: "100vw",
          height: " 100vh",
          justifyContent: { xs: "center", lg: "", md: "center" },
          padding: "8vh 10vw",
        }}
      >
        <Grid container lg={12}>
          <Grid
            item
            xs={12}
            lg={5.5}
            md={12}
            sx={{
              height: "100%",
              backgroundColor: "white",
              borderRadius: "40px 0px 0px 40px",
            }}
          >
            {/* **************** left side box start **************** */}
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ height: "100%" }}
            >
              <Grid item xs={12} sx={{ margin: "1rem" }}>
                <Typography variant="h1"> Welcome to TNGS Sports</Typography>
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
                    <Grid item xs={12} sx={GridMainInputInner1}>
                      {/* **************** Email field start **************** */}

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
                      {/* **************** Email field end **************** */}
                    </Grid>
                    <Grid item xs={12} sx={{ height: "4.8rem" }}>
                      {/* **************** Password field start **************** */}
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
                      {/* **************** Password field end **************** */}
                    </Grid>
                  </Grid>

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
                        Log in
                      </Typography>
                    </Button>
                  </Grid>
                  {/* **************** Login button end **************** */}

                  {/* **************** Sign up start **************** */}

                  <Grid
                    item
                    xs={12}
                    sx={{
                      marginLeft: "0rem",
                      marginTop: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      marginRight: "2rem",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.secondary.main,
                        fontSize: "15px",
                      }}
                    >
                      Don't have an account{" "}
                    </Typography>
                    <Box
                      onClick={() => router.push("/registration")}
                      sx={{
                        color: "#257ded",
                        marginLeft: ".3rem",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                    >
                      Sign Up
                    </Box>
                  </Grid>
                  {/* **************** Sign up end **************** */}
                </Grid>
                {/* **************** Complete Form end **************** */}
              </form>
            </Grid>
            {/* **************** left side box end **************** */}
          </Grid>
          {/* **************** Right Side box start **************** */}
          <Grid
            item
            xs={0}
            lg={6.5}
            md={0}
            sx={{
              display: { xs: "none", md: "none", lg: "grid" },
              position: "relative",
              backgroundColor: "#6bb73c",
              borderRadius: "0px 40px 40px 0px",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Box sx={groundBox} />

            <Box sx={logo} />
          </Grid>
          {/* **************** Right Side box end **************** */}
        </Grid>
      </Grid>
    </Container>
  );
}

{
  /* **************** Right side image design  start **************** */
}

export const ImageStyle = ({
  image,
  size,
  top,
  left,
}: {
  image: string;
  size: string;
  top: string | number;
  left: string | number;
}): React.CSSProperties => {
  return {
    position: "absolute",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "50%",
    overflow: "hidden",
    width: size,
    height: size,
    top: top,
    left: left,
  };
};

const MyComponent = () => {
  return (
    <div
      style={ImageStyle({
        image: "path-to-image.jpg",
        size: "100px",
        top: "50px",
        left: "50px",
      })}
    >
      {/* Content goes here */}
    </div>
  );
};

{
  /* **************** Right side image design  end **************** */
}
const groundBox = {
  backgroundImage: `url(${image.src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "665px",
  height: "690px",
  zIndex: "30",
  objectFit: "cover",
  overflow: "hidden",
  borderTopRightRadius: "40px",
  borderBottomRightRadius: "40px",
};
const logo = {
  position: "absolute",
  backgroundImage: `url(${tngsLogo.src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "50%",
  overflow: "hidden",
  top: "32%",
  left: "31%",
  zIndex: "50",
  width: "250px",
  height: "250px",
  borderRadiusRight: "40px",
};
