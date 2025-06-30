import { PlayerReport } from '../models/ReportSchema.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from  'mongoose';
import fs from "fs"
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.resolve(process.cwd());
// Controller function to add a new player report
export const addPlayerReport = async (req, res) => {
  try {
    const { name, team, season } = req.body;
    const userId = req.user._id;

    let existingPlayer = await PlayerReport.findOne({ name, team });
    let playerId;
    if (existingPlayer) {
      playerId = existingPlayer.playerId; // Reuse existing playerId
      console.log('Existing Player ID', playerId)
    } else {
      playerId = new mongoose.Types.ObjectId().toString(); // Generate new playerId
      console.log('New Player ID', playerId)
    }
    const playerReportData = {
      ...req.body,
      playerId,
      userId,
    };
    // Save Supabase image paths directly
    if (req.body.logo) playerReportData.logo = req.body.logo;
    if (req.body.profile) playerReportData.profile = req.body.profile;

    const playerReport = new PlayerReport(playerReportData);
    playerReport.userId = req.user._id;
    await playerReport.save();
    res.status(201).json({ id: playerReport._id });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Controller function to get all reports
export const getAllReports = async (req, res) => {
  const userId = req.user._id;
  try {
    const reports = await PlayerReport.aggregate([
        { $match: { userId: userId } },  // Filter by userId
        { $group: { 
            _id: "$playerId",  // Group by playerId
            doc: { $first: "$$ROOT" }  // Get the first document for each playerId
          } 
        },
        { $replaceRoot: { newRoot: "$doc" } }  // Replace root to return full documents
    ]);
    res.send(reports);  // Send the response
  } catch (error) {
    console.error(error);  // Log error
    res.status(500).send(error.message);  // Send error response
  }
};

// This part is done by me Zaid Ahmed why? coz i was lazy to rename getAllReports to -> getUniqueReports
export const getLiterallyAllReports = async (req, res) => {
  const userId = req.user._id;
  try {
    const reports = await PlayerReport.find({userId:userId});
    res.send(reports);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller function to get a report by serial number
export const getReportsByPlayerId = async (req, res) => {
  try {
    const { playerId } = req.params;
    const reports = await PlayerReport.find({ playerId });

    if (!reports.length) return res.status(404).json({ message: 'No reports found for this player' });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a report by serial number
export const getReportBySerialNumber = async (req, res) => {
  try {
    const report = await PlayerReport.findOne({ _id: req.params.objectId });
    if (!report) return res.status(404).send('Report not found');
    res.json(report);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const editPlayerReport = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const updates = { ...req.body };
    updates.userId = userId;
    const existingReport = await PlayerReport.findOne({ _id: id, userId: userId });
    if (!existingReport) {
      return res.status(404).send('Player report not found or not authorized');
    }
    // Save Supabase image paths directly
    if (req.body.logo) updates.logo = req.body.logo;
    if (req.body.profile) updates.profile = req.body.profile;
    const updatedPlayerReport = await PlayerReport.findOneAndUpdate(
      { _id: id, userId: userId },
      updates,
      { new: true }
    );
    if (!updatedPlayerReport) {
      return res.status(404).send('Player report not found or not authorized');
    }
    res.status(200).send(updatedPlayerReport);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePlayerReport = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from the decoded token
    const { id } = req.params;

    // Find and delete the report
    const deletedPlayerReport = await PlayerReport.findOneAndDelete({
      _id: id,
      userId: userId // Ensure userId matches
    });

    if (!deletedPlayerReport) {
      return res.status(404).send('Player report not found or not authorized');
    }
    if (deletedPlayerReport.logo) {
      fs.unlinkSync(path.join(rootDir, deletedPlayerReport.logo));
    }
    if (deletedPlayerReport.profile) {
      fs.unlinkSync(path.join(rootDir, deletedPlayerReport.profile));
    }

    res.status(200).send(`Player report with ID ${id} deleted successfully`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};