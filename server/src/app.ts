import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import AppDataSource from "../data-source";
import userRouter from "./routes/user";
import cors from "cors";
import itemsRouter from "./routes/itemsRoutes";
import seedCategories from "../seedCategory";

try {
  AppDataSource.initialize()
    .then(() => {
      console.log("TypeORM initialized successfully!");
      seedCategories();
})
    .catch((error) => console.error("TypeORM initialization failed!", error));
} catch (error) {
  console.error("[mysql.connector][init][Error]: ", error);
}

const app: Express = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/cart", itemsRouter);

app.listen(4000, () => {
  console.log(`app is listening to port hey`);
});