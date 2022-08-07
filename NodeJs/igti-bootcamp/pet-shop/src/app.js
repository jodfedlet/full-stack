import express from "express";
import cors from 'cors';
import winston from "winston";

import utilsRoutes from './routes/utilsRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import animalRoutes from './routes/animalRoutes.js';

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { combine, timestamp, label, printf } = winston.format;
const projectFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'pet-shop.log' })
    ],
    format: combine(
        label({ label: "pet-shop" }),
        timestamp(),
        projectFormat
    )
})

/*
app.use((err, req, res, next) => {
    //const { name, message, stack } = err; 
    console.log('***************************');
    //logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);    
    //res.status(500).json({ name, message, stack });   
    next(err);
});
*/

app.use('/', utilsRoutes)
app.use('/owner', ownerRoutes)
app.use('/animal', animalRoutes)

const PORT = process.env.PORT || 3333;
app.get('/', (req, res) => {
    return res.json({ message: 'Welcome to the petshop API' })
});

app.listen(PORT, () => {
    logger.info(`The petshop API is running on port ${PORT}`)
});

export default app;