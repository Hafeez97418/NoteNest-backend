import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middleware/ValidateRequests";
import { createAdmin, demoteAdmin, getAllAdmins } from "../controllers/admin";

const adminRouter = Router();

adminRouter
  .route("/admin/:id")
  .post(isLoggedIn, isAdmin, createAdmin)
  .patch(isLoggedIn, isAdmin, demoteAdmin);
adminRouter.get("/admin", isLoggedIn, isAdmin, getAllAdmins);

export default adminRouter;
