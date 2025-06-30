import express from 'express';
import multer from 'multer';
import { userRegister, userLogin, nextAuth } from '../controllers/userRegistration.js';
import {  addPlayerReport, getAllReports, getReportBySerialNumber,deletePlayerReport,editPlayerReport, getReportsByPlayerId, getLiterallyAllReports } from '../controllers/Report.js';
import {auth} from '../Middleware/auth.js';
import supabase from '../supabaseClient.js';

const router = express.Router();

// User routes
router.post('/userregister', userRegister);
router.post('/userlogin', userLogin);
router.post('/nextauth', nextAuth);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Use Multer memory storage for file buffers
const memoryStorage = multer.memoryStorage();
const uploadMemory = multer({ storage: memoryStorage });

// Report routes
router.post(
  '/reports',
  auth,
  uploadMemory.fields([{ name: 'logo', maxCount: 1 }, { name: 'profile', maxCount: 1 }]),
  async (req, res, next) => {
    try {
      let profileUrl = '';
      let logoUrl = '';
      const profileFile = req.files?.profile?.[0];
      const logoFile = req.files?.logo?.[0];
      if (profileFile) {
        const { data, error } = await supabase.storage
          .from('images')
          .upload(`profiles/${Date.now()}_${profileFile.originalname}`, profileFile.buffer, {
            contentType: profileFile.mimetype,
          });
        if (error) throw error;
        profileUrl = data.path;
        req.body.profile = profileUrl;
      }
      if (logoFile) {
        const { data, error } = await supabase.storage
          .from('images')
          .upload(`logos/${Date.now()}_${logoFile.originalname}`, logoFile.buffer, {
            contentType: logoFile.mimetype,
          });
        if (error) throw error;
        logoUrl = data.path;
        req.body.logo = logoUrl;
      }
      // Continue to controller
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  addPlayerReport
);

router.get('/reports', auth, getAllReports);
router.get('/reportsall', auth, getLiterallyAllReports);
router.get('/reports/:objectId', auth, getReportBySerialNumber);
router.get('/player-reports/:playerId', auth, getReportsByPlayerId);
router.delete('/player-reports/:id' , auth, deletePlayerReport);
router.put(
  '/player-reports/:id',
  auth,
  uploadMemory.fields([{ name: 'logo', maxCount: 1 }, { name: 'profile', maxCount: 1 }]),
  async (req, res, next) => {
    try {
      let profileUrl = '';
      let logoUrl = '';
      const profileFile = req.files?.profile?.[0];
      const logoFile = req.files?.logo?.[0];
      if (profileFile) {
        const { data, error } = await supabase.storage
          .from('images')
          .upload(`profiles/${Date.now()}_${profileFile.originalname}`, profileFile.buffer, {
            contentType: profileFile.mimetype,
          });
        if (error) throw error;
        profileUrl = data.path;
        req.body.profile = profileUrl;
      }
      if (logoFile) {
        const { data, error } = await supabase.storage
          .from('images')
          .upload(`logos/${Date.now()}_${logoFile.originalname}`, logoFile.buffer, {
            contentType: logoFile.mimetype,
          });
        if (error) throw error;
        logoUrl = data.path;
        req.body.logo = logoUrl;
      }
      // Continue to controller
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  editPlayerReport
);
export default router;