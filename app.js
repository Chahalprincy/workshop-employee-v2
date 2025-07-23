import express from "express";
const app = express();
export default app;
import employeesRouter from "#api/employees";

import employees from "#db/employees";

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/", employeesRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});
