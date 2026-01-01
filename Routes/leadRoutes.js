import { leadController } from "../controllers/leadController.js";

export function leadRoutes(app){
    app.post('/api/submit-form', leadController);
}