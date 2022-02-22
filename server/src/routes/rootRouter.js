import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import routeRouter from './api/v1/routeRouter.js'
import partnerRouter from './api/v1/partnerRouter.js'
import profileRouter from "./api/v1/profileRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use('/api/v1/routes', routeRouter)
rootRouter.use('/api/v1/partners', partnerRouter)
rootRouter.use('/api/v1/profile', profileRouter)

export default rootRouter;
