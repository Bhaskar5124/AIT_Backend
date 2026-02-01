import { headKController } from "../controllers/headController.js";
import { contactController, leadController } from "../controllers/leadController.js";

export function leadRoutes(app){
    app.post('/api/submit-form', leadController);
    app.post('/contact', contactController);
    app.post('/inquiry/krishna', headKController);
}