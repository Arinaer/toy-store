import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import {loggerMiddleware} from "./middlewares/logger-middleware";
import {errorMiddleware} from "./middlewares/error-middleware";
import {dbService} from "./services/db-service";

dotenv.config();

const server = express();
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true
}

//Подключение миддлварей
server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(loggerMiddleware)
server.use(errorMiddleware);
server.use('/api', router);

try {
    await dbService();
    server.listen(process.env.PORT, () => console.log('Порт сервера:  ' + process.env.PORT));
} catch (error) {
    console.log(error);
}