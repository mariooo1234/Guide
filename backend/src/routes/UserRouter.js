import Router from "express";
import UserController from "../controllers/UserController.js";

const UserRouter = new Router();

UserRouter.get("/users/:id", UserController.get);
UserRouter.get("/users", UserController.list);
UserRouter.post("/users", UserController.create);
UserRouter.delete("/users/:id", UserController.remove);

export default UserRouter;
