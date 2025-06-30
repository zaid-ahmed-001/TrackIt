import mongoose from  'mongoose';
 
 const playerReportSchema = new mongoose.Schema({
  name: { type: String, required: false },
  playerId: { type: String, required: false },  // Unique player ID
  age: { type: String, required: false },
  season: { type: Number, required: false },
  position: { type: String, required: false },
  team: { type: String, required: false },
  logo: { type: String },  
  profile: { type: String },  
  anticaption: { type: Number, required: false },
  ballControl: { type: Number, required: false },
  clearences: { type: Number, required: false },
  combiningWithTeammates: { type: Number, required: false },
  coordination: { type: Number, required: false },
  coorperation: { type: Number, required: false },
  defensivePositioning: { type: Number, required: false },
  endurance: { type: Number, required: false },
  fair: { type: Number, required: false },
  flexibility: { type: Number, required: false },
  frustation: { type: Number, required: false },
  functionalTraining: { type: Number, required: false },
  gettingTheBallOutOfPressure: { type: Number, required: false },
  goalOriented: { type: Number, required: false },
  managingSpaceTimeInAttack: { type: Number, required: false },
  managingSpaceTimeInDefense: { type: Number, required: false },
  marking: { type: Number, required: false },
  nonDominateLeg: { type: Number, required: false },
  personal: { type: Number, required: false },
  playingTheBall: { type: Number, required: false },
  positionAdjustment: { type: Number, required: false },
  postRecovery: { type: Number, required: false },
  pressureAfterLoss: { type: Number, required: false },
  readingDefensiveGameSituations: { type: Number, required: false },
  readingOffensiveGameSituations: { type: Number, required: false },
  recovery: { type: Number, required: false },
  selfMotivation: { type: Number, required: false },
  shootingAndScoring: { type: Number, required: false },
  solvingSituation: { type: Number, required: false },
  speed: { type: Number, required: false },
  strength: { type: Number,  },
  switchingToDefensiveRole: { type: Number, required: false },
  switchingToOffensiveRole: { type: Number, required: false },
  timing: { type: Number,  },
  userId:{type:String}
});

export const PlayerReport = mongoose.model('PlayerReport', playerReportSchema);

// const counterSchema = new mongoose.Schema({
//   name: { type: String, required: false },
//   serialNumber: { type: Number, required: false }
// });

// const Counter = mongoose.model('Counter', counterSchema);

 