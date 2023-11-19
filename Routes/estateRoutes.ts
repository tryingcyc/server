import { Router } from "express";
import {
  getEstate,
  createEstate,
  getSingleEstate,
} from "../Controllers/estateControllers";

const router: Router = Router();

router.get("/", getEstate);
router.get("/get-single-estate", getSingleEstate);

router.post("/", createEstate);

export default router;
