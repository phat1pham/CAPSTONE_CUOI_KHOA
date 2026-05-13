import express from "express";
import { articleController } from "../controllers/article.controller.js";

const articleRouter = express.Router();

articleRouter.get("/articles/list-article", articleController.findAll);

export default articleRouter;
