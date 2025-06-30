'use client'
import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { renderTextField } from '../../Components/textField'
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, useStore } from "react-redux";
import { RootState } from "@/lib/store";
import { failure, notify } from "@/utilits/toasts/toast";
import axios from 'axios'
import { useGetReportQuery } from "@/app/Services/userService";



const Content = (props:any) => {
  const { data, isLoading, error } = useGetReportQuery(props.id);
  const dispatch = useDispatch()
  const router = useRouter()
  const formRef = useRef<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null);
  const [userName,setuserName] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const coachName = useSelector(
    (state: RootState) => state.profileReducer.name
  );
  useEffect(()=>{
    setuserName(coachName);
  },[coachName])
  
  const numberSchema = Yup.number()
    .required('Required')
    .min(0, 'Value must be greater than or equal to 0')
    .max(100, 'Value must be less than or equal to 100');
  const pageValidationSchemas = [
    Yup.object({
      combiningWithTeammates: numberSchema,
      name: Yup.string().required('Required'),
      age: Yup.string().required('Required'),
      season: numberSchema,
      team: Yup.string().required('Required'),
      position: Yup.string().required('Required'),
      readingOffensiveGameSituations: numberSchema,
      managingSpaceTimeInAttack: numberSchema,
      defensivePositioning: numberSchema,
      readingDefensiveGameSituations: numberSchema,
      managingSpaceTimeInDefense: numberSchema,
      switchingToOffensiveRole: numberSchema,
      gettingTheBallOutOfPressure: numberSchema,
      switchingToDefensiveRole: numberSchema,
      pressureAfterLoss: numberSchema,
      positionAdjustment: numberSchema,
    }),
    Yup.object({
      ballControl: numberSchema,
      playingTheBall: numberSchema,
      solvingSituation: numberSchema,
      shootingAndScoring: numberSchema,
      nonDominateLeg: numberSchema,
      clearences: numberSchema,
      marking: numberSchema,
      timing: numberSchema,
      anticaption: numberSchema,
      recovery: numberSchema,
    }),
    Yup.object({
      endurance: numberSchema,
      strength: numberSchema,
      speed: numberSchema,
      flexibility: numberSchema,
      coordination: numberSchema,
      functionalTraining: numberSchema,
      postRecovery: numberSchema,
    }),
    Yup.object({
      goalOriented: numberSchema,
      frustation: numberSchema,
      personal: numberSchema,
      selfMotivation: numberSchema,
      coorperation: numberSchema,
      fair: numberSchema,
    }),
  ];
  const token = useSelector(
    (state: RootState) => state.profileReducer.token
  );
  const handleNext = (formik: any) => {
    formik.validateForm().then((errors: any) => {
      if (Object.keys(errors).length === 0) {
        setTimeout(()=>{
          setCurrentPage(currentPage + 1);
        },200)
      } else {
        formik.setTouched(Object.keys(errors).reduce((acc: any, key: any) => {
          acc[key] = true;
          return acc;
        }, {}));
      }
    });
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Technical issue is there</>;
  }
  if (!data) {
    return <>Data not available</>;
  }
  const initialValues = {
    combiningWithTeammates: data.combiningWithTeammates,
    readingOffensiveGameSituations: data.readingOffensiveGameSituations,
    managingSpaceTimeInAttack: data.managingSpaceTimeInAttack,
    defensivePositioning: data.defensivePositioning,
    readingDefensiveGameSituations: data.readingDefensiveGameSituations,
    managingSpaceTimeInDefense: data.managingSpaceTimeInDefense,
    switchingToOffensiveRole: data.switchingToOffensiveRole,
    gettingTheBallOutOfPressure: data.gettingTheBallOutOfPressure,
    switchingToDefensiveRole: data.switchingToDefensiveRole,
    pressureAfterLoss: data.pressureAfterLoss,
    positionAdjustment: data.positionAdjustment,
    ballControl: data.ballControl,
    playingTheBall: data.playingTheBall,
    solvingSituation: data.solvingSituation,
    shootingAndScoring: data.shootingAndScoring,
    nonDominateLeg: data.nonDominateLeg,
    clearences: data.clearences,
    marking: data.marking,
    timing: data.timing,
    anticaption: data.anticaption,
    recovery: data.recovery,
    endurance: data.endurance,
    strength: data.strength,
    speed: data.speed,
    flexibility: data.flexibility,
    coordination: data.coordination,
    functionalTraining: data.functionalTraining,
    postRecovery: data.postRecovery,
    goalOriented: data.goalOriented,
    frustation: data.frustation,
    personal: data.personal,
    selfMotivation: data.selfMotivation,
    coorperation: data.coorperation,
    fair: data.fair,
  };
  const renderPage = (formik: any) => {
    switch (currentPage) {
      case 1:
        return (
          <div className="bg-white w-full m-10 rounded-3xl shadow-white text-slate-500  ">
            <div className="text-end p-6 pr-20 flex justify-between  ">
              <h6 className="font-semibold text-2xl">Tactical Aspects</h6>
              <p>{userName}</p>
            </div>
            <hr />
            <Container>
              <Row className="flex gap-3 p-3">
                <Col style={{ height: "32rem" }}>
                  <div className="first h-1/2">
                    <h1 className="font-semibold text-center text-lg  mb-4">Attack</h1>
                    {renderTextField("combiningWithTeammates", "combiningWithTeammates", "Combining with Teammates", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("readingOffensiveGameSituations", "readingOffensiveGameSituations", "Reading Offensive Game Situations", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("managingSpaceTimeInAttack", "managingSpaceTimeInAttack", "Managing Space-Time in Attack", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                  </div>
                  <div className="second" style={{ marginTop: "2rem" }}>
                    <h1 className="font-semibold text-center text-lg mb-4">Defence</h1>
                    {renderTextField("defensivePositioning", "defensivePositioning", "Defensive Positioning", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("readingDefensiveGameSituations", "readingDefensiveGameSituations", "Reading Defensive Game Situations", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("managingSpaceTimeInDefense", "managingSpaceTimeInDefense", "Managing Space-Time in Defense", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                  </div>
                </Col>
                <Col style={{ height: "32rem" }}>
                  <div className="first h-1/2">
                    <h1 className="font-semibold text-center text-lg mb-4">Offensive Transition</h1>
                    {renderTextField("switchingToOffensiveRole", "switchingToOffensiveRole", "Switching to Offensive Role", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("gettingTheBallOutOfPressure", "gettingTheBallOutOfPressure", "Getting the Ball Out of Pressure", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                  </div>
                  <div className="second" style={{ marginTop: "2rem" }}>
                    <h1 className="font-semibold text-center text-lg mb-4">Defensive Transition</h1>
                    {renderTextField("switchingToDefensiveRole", "switchingToDefensiveRole", "Switching to Defensive Role", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("pressureAfterLoss", "pressureAfterLoss", "Pressure After Loss", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("positionAdjustment", "positionAdjustment", "Position Adjustment", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                  </div>
                </Col>
              </Row>
            </Container>
            <div className="flex justify-end p-6 mr-14">

              <Button onClick={() => handleNext(formik)} className="ml-2">Next</Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-white w-full m-10 rounded-3xl shadow-white text-slate-500  ">
            <div className="text-end p-6 pr-20 flex justify-between">
              <h6 className="font-semibold text-2xl">Technical Aspects</h6>
              <p>{userName}</p>
            </div>
            <hr />
            <Container>
              <Row className="flex gap-3 p-3">
                <Col style={{ height: "32rem" }}>
                  <div className="first ">
                    <h1 className="font-semibold text-center text-lg mb-4">With Ball</h1>
                    {renderTextField("ballControl", "ballControl", "Ball Control", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("playingTheBall", "playingTheBall", "Playing the Ball", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("solvingSituation", "solvingSituation", "Solving Situation", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("shootingAndScoring", "shootingAndScoring", "Shooting and Scoring", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("nonDominateLeg", "nonDominateLeg", "Non-dominate leg", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                  </div>
                </Col>
                <Col style={{ height: "32rem" }}>
                  <div className="second">
                    <h1 className="font-semibold text-center text-lg mb-4">Without Ball</h1>
                    {renderTextField("clearences", "clearences", "Clearances", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("marking", "marking", "Marking", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("timing", "timing", "Timing", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("anticaption", "anticaption", "Anticipation", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("recovery", "recovery", "Recovery", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                  </div>
                </Col>
              </Row>
            </Container>
            <div className="flex justify-end p-6 mr-14">
              <Button onClick={handlePrevious}>Previous</Button>
              <Button onClick={() => handleNext(formik)} className="ml-2">Next</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-white w-full m-10 rounded-3xl shadow-white text-slate-500  ">
            <div className="text-end p-6 pr-20 flex justify-between">
              <h6 className="font-semibold text-2xl">Physical Aspects</h6>
              <p>{userName}</p>
            </div>
            <hr />
            <Container>
              <Row className="flex gap-3 p-3">
                <Col style={{ height: "32rem" }}>
                  <div className="first ">
                    <h1 className="font-semibold text-center text-lg mb-4 ">Condition</h1>
                    {renderTextField("endurance", "endurance", "Endurance", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("strength", "strength", "Strength", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("speed", "speed", "Speed", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("flexibility", "flexibility", "Flexibility", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("coordination", "coordination", "Coordination", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                  </div>
                </Col>
                <Col style={{ height: "32rem" }}>
                  <div className="second">
                    <h1 className="font-semibold text-center text-lg mb-4">Injury Prevention</h1>
                    {renderTextField("functionalTraining", "functionalTraining", "Functional training", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("postRecovery", "postRecovery", "Post recovery training", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                  </div>
                </Col>
              </Row>
            </Container>
            <div className="flex justify-end p-6 mr-14">
              <Button onClick={handlePrevious}>Previous</Button>
              <Button onClick={() => handleNext(formik)} className="ml-2">Next</Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="bg-white w-full m-10 rounded-3xl shadow-white text-slate-500  ">
            <div className="text-end p-6 pr-20 flex justify-between">
              <h6 className="font-semibold text-2xl">Psychological Aspects</h6>
              <p>{userName}</p>
            </div>
            <hr />
            <Container>
              <Row className="flex gap-3 p-3">
                <Col style={{ height: "32rem" }}>
                  <div className="first ">
                    <h1 className="font-semibold text-center text-lg mb-4">Mental</h1>
                    {renderTextField("goalOriented", "goalOriented", "Goal oriented", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("frustation", "frustation", "Frustration tolerance", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("personal", "personal", "Personal responsibility", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("selfMotivation", "selfMotivation", "Self motivation", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                  </div>
                </Col>
                <Col style={{ height: "32rem" }}>
                  <div className="second">
                    <h1 className="font-semibold text-center text-lg mb-4">Social</h1>
                    {renderTextField("coorperation", "coorperation", "Cooperation and teamwork", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                    {renderTextField("fair", "fair", "Fairness and respect", formik,anchorEl, setAnchorEl,open, setOpen,arrowRef, setArrowRef)}
                  </div>
                </Col>
              </Row>
            </Container>
            <div className="flex justify-end p-6 mr-14">
              <Button onClick={handlePrevious} >Previous</Button>
              <Button type="submit" className="ml-2">Submit</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (values: any) => {
    let formData = new FormData();
    if (formRef.current) {
      formRef.current.enctype = 'multipart/form-data';
  }
    Object.keys(values).forEach(key => {
      formData.append(key,values[key]);
    });

    
      try {
        // console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/player-reports/${data._id}`)
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/player-reports/${data._id}`,
          formData,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data',
            },
          }

        );
        if (response.status === 200) {
          notify("report submit successful");
          router.push(`/dashboard/report/${data._id}`);
        } else {
          failure(response.data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    

    // router.push('/report')
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={pageValidationSchemas[currentPage - 1]}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
    >
      {(formik) => (
        <div className='w-full h-full flex md:flex-row' style={{ backgroundColor: "#2a3439" }}>
          <Form style={{ width: "100%", display: "flex" }} ref={formRef}>
            <Sidebar setFieldValue={formik.setFieldValue} data={data} />
            {renderPage(formik)}
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Content;
