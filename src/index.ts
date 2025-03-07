import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import compression from "compression"
import helmet from "helmet";
import cookieParser from "cookie-parser"
import { rateLimit } from 'express-rate-limit'
import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./routes/auth";
import { connectDB, syncWithDatabase } from "./config/db";
import { userRouter } from "./routes/userRoute";
import { categoryRouter } from "./routes/categoriesRoute";
import { featuresRouter } from "./routes/featuresRoute";
import { plansRouter } from "./routes/plansRoute";
import { coursesRoute } from "./routes/coursesRoute";
import { lessonsRouter } from "./routes/lessonsRoute";
import { reviewRouter } from "./routes/reviewRoute";
import { paymentsRouter } from "./routes/paymentsRoute";
import { passwordRouter } from "./routes/passwordRoute";
import { usePassport } from "./middlewares/passportOauth";
import passport from "passport";
import session from "express-session";

dotenv.config()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message:"Many requests in few time. please try again after 15 minutes"
})

const app = express()

connectDB()
syncWithDatabase()
usePassport()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(compression())
app.use(cookieParser())
app.use(helmet({xFrameOptions: { action: "deny" }}));
app.use(limiter)
app.use(errorHandler)
app.use(session({
    secret: process.env.SESSION_SCRET_KEY as string,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/course',coursesRoute)
app.use('/api/v1/lesson',lessonsRouter)
app.use('/api/v1/review',reviewRouter)
app.use('/api/v1/feature',featuresRouter)
app.use('/api/v1/plan',plansRouter)
app.use('/api/v1/payment',paymentsRouter)
app.use('/api/v1/password',passwordRouter)

app.all('*',(req,res)=>{
    res.status(404).json({status:"error",message:"this resource is not found"})
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port http://localhost:${process.env.PORT}`)
})