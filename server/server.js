import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database.js';
import router from './router/route.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.use("/api/",router);
const PORT = 5000;
app.get("/",(req,res) => {
    res.status(200).json("Home Get Requiest");
})
app.listen(PORT,() => {
    console.log(`Server Start PORT = ${PORT}`);
    connectDB();
})