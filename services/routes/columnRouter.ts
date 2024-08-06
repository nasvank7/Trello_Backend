import { Express } from "express";
import { Router } from "express";
import columnController from "../controller/columnController";

const columnRouter = Router();

columnRouter.get('/column/:userId',columnController.getAllColumns)
columnRouter.post('/createColumn',columnController.createColumn)
columnRouter.patch('/editColumnName/:columnId',columnController.editColumnName)

export default columnRouter