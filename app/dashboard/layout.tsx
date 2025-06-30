"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import CircularProgress from '@mui/material/CircularProgress';
import { RootState } from "@/lib/store";
import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isLogin = useSelector(
    (state: RootState) => state.profileReducer.isLogin
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isLogin) {
      setLoading(false);
    } else {
      router.push("/");
    }
  }, [isLogin, router]);
  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
  }, [isLogin]);
  if (loading) {
    return <><Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}><CircularProgress /></Box></>;
  }
  return (
    <>
      {children}
    </>
  );
}
