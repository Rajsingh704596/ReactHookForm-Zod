import express from "express";
import { formController } from "../controller/formController.js";

const router = express.Router();

router.route("/form").post(formController);


export default router;