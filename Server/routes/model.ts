const express = require("express");
const modelRouter = express.Router();
import { fileUploadToEL, queryELModel } from "../controllers/model";

modelRouter.post("/el/upload", fileUploadToEL);
modelRouter.post("/el/query", queryELModel);

export { modelRouter };
