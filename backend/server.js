import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import chalk from "chalk";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("API is running")
})


// Routes
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);

// Error Handling Middleware
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    chalk.yellowBright.bold(
      `Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`
    )
  );
});
