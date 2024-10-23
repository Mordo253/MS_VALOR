import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// import cron from 'node-cron';
// import { fetchAndUpdateTwelveData, scrapeBanrepData } from './controllers/scraper.controller.js';
import authRoutes from "./routes/auth.routes.js";
import  propertyRoutes from "./routes/property.routes.js";
import  scraperRoutes from "./routes/scraper.routes.js";
import { updateFinancialData, getFinancialData } from './controllers/scraper.controller.js';

// import  userRoutes from "./routes/user.routes.js";
import  carRoutes from "./routes/car.routes.js";
import { FRONTEND_URL } from "./config.js";




const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/car", carRoutes);
app.use("/api",scraperRoutes)
// Actualizar datos cada hora
// cron.schedule('0 * * * *', async () => {
//   await fetchAndUpdateTwelveData();
//   await scrapeBanrepData();
//   console.log('Financial data updated');
// });
// app.use("/api/users", userRoutes);
// app.use("/api", indexRoutes); //revisar
  
// if (process.env.NODE_ENV === "production") {
//   const path = await import("path");
//   app.use(express.static("client/dist"));

//   app.get("*", (req, res) => {
//     console.log(path.resolve("client", "dist", "index.html") );
//     res.sendFile(path.resolve("client", "dist", "index.html"));
//   });
// }

export default app;