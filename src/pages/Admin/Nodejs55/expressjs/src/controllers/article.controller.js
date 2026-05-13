import { articleService } from "../services/article.service.js";
export const articleController = {
    findAll(request, response) {
        const articles = articleService.findAll();
        response.json(articles);
    }
};