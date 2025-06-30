// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState} from "../../lib/store"

interface Post {
  id:string
}

interface reportResponse {
  _id: any;
  // Define the shape of the response object from the API
  age: string;
  season: number;
  anticaption: number;
  ballControl: number;
  clearences: number;
  combiningWithTeammates: number;
  coordination: number;
  coorperation: number;
  defensivePositioning: number;
  endurance: number;
  fair: number;
  flexibility: number;
  frustation: number;
  functionalTraining: number;
  gettingTheBallOutOfPressure: number;
  goalOriented: number;
  logo: string;
  managingSpaceTimeInAttack: number;
  managingSpaceTimeInDefense: number;
  marking: number;
  name: string;
  nonDominateLeg: number;
  personal: number;
  playingTheBall: number;
  position: string;
  positionAdjustment: number;
  postRecovery: number;
  pressureAfterLoss: number;
  profile: string;
  readingDefensiveGameSituations: number;
  readingOffensiveGameSituations: number;
  recovery: number;
  selfMotivation: number;
  shootingAndScoring: number;
  solvingSituation: number;
  speed: number;
  strength: number;
  switchingToDefensiveRole: number;
  switchingToOffensiveRole: number;
  team: string;
  timing: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl:   
 'http://localhost:3002', prepareHeaders: (headers, { getState }) => {
  const token = (getState() as RootState).profileReducer.token;
  // If we have a token set in state, let's assume that we should be passing it.
  if (token) {
    headers.set('authorization', token);
  }
  return headers;
}, }),
  endpoints: (build) => ({
    getReport: build.query<reportResponse,any>({
      query: (id) => `/reports/${id}`, 
    }),
  }),
});


export const { useGetReportQuery } = api;