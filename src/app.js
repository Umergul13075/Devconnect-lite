import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRoutes from "./routes/user.route.js"
const app = express();
// configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(cookieParser())


// routes
app.use("/api/v1/user", userRoutes)
// app.use("/api/v1/developers", developerRoutes)
// app.use("/api/v1/projects",projectRoutes)
// app.use("/api/v1/bid",bidroutes)
export {app}