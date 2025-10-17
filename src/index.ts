import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { apiLogger } from "./middleware/logger";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(apiLogger);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to the Node.js TypeScript API!" });
});

// Register global error handler (should be after all routes and middleware)

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
