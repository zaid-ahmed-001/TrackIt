import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser'
import './config/dbconnection.js'
import router from "./routes/userRoute.js"
import dotenv from 'dotenv';
const app = express()
const port = 3002
dotenv.config();

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// For URL-encoded payloads
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(bodyParser.json())
app.use('/',router)

app.listen(port, () => {    
  console.log(`Example app listening on port ${port}`)
})