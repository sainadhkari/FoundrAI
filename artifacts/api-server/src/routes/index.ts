import { Router, type IRouter } from "express";
import healthRouter from "./health";
import crewaiRouter from "./crewai";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/crewai", crewaiRouter);

export default router;
