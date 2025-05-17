import express from 'express';
import morgan from 'morgan';
import connectDB from './db/db.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';



connectDB();

const app = express();

app.use(morgan('dev'));
app.use(cors({ origin: 'http://192.168.5.248:5173', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
})


export default app;