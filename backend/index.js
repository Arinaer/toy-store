import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import {loggerMiddleware} from "./middlewares/logger-middleware.js";
import {errorMiddleware} from "./middlewares/error-middleware.js";
import {dbService} from "./services/db-service.js";
import {router} from "./routers/router.js";

dotenv.config();

const server = express();
const corsOptions = {
    origin: [process.env.ORIGIN, 'https://toy-store-117g.vercel.app', 'https://toy-store-117g.vercel.app/'],
    methods: 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

//Подключение миддлварей

server.use(cors(corsOptions));
server.use(express.json({
    limit: '200mb'
}));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, 2000);
});

server.use('/api', router);
// server.use(loggerMiddleware)
server.use(errorMiddleware);

try {
    await dbService();
    server.listen(process.env.PORT, () => console.log('Порт сервера:  ' + process.env.PORT));
} catch (error) {
    console.log(error);
}