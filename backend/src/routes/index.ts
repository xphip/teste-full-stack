import express, { Router } from "express";
import { ValidateAuth } from "../http/middlewares/validateAuthMiddleware";
import {
    ListUsersController, GetUsersController, CreateUsersController, UpdateUsersController, DeleteUsersController,
} from "../http/controllers/usersController";
import {
    ListTasksController, GetTasksController, CreateTasksController, UpdateTasksController, DeleteTasksController,
} from "../http/controllers/tasksController";
import {
    GetTokensController,
    CreateTokensController,
    DeleteTokensController,
    RefreshTokensController
} from "../http/controllers/tokensController";
import { IndexController } from "../http/controllers/indexController";
import { LoginAuthController } from "../http/controllers/authLoginController";
import { RegisterAuthController } from "../http/controllers/authRegisterController";
import {ValidateOwnership} from "../http/middlewares/validateOwnershipMiddleware";
import {ValidateIfIsAdmin} from "../http/middlewares/validateIfIsAdminMiddleware";

const rootRoutes: Router = express.Router();

// Private
{
    rootRoutes.get("/users", [ValidateAuth], ListUsersController);
    rootRoutes.get("/users/:id", [ValidateAuth, ValidateOwnership], GetUsersController);
    rootRoutes.post("/users/:id", [ValidateAuth, ValidateOwnership], CreateUsersController);
    rootRoutes.put("/users/:id", [ValidateAuth, ValidateOwnership], UpdateUsersController);
    rootRoutes.delete("/users/:id", [ValidateAuth, ValidateOwnership], DeleteUsersController);
}
{
    rootRoutes.get("/tasks", [ValidateAuth], ListTasksController);
    rootRoutes.get("/tasks/:id", [ValidateAuth, ValidateOwnership], GetTasksController);
    rootRoutes.post("/tasks/:id", [ValidateAuth, ValidateOwnership], CreateTasksController);
    rootRoutes.put("/tasks/:id", [ValidateAuth, ValidateOwnership], UpdateTasksController);
    rootRoutes.delete("/tasks/:id", [ValidateAuth, ValidateOwnership], DeleteTasksController);
}
{
    rootRoutes.get("/tokens", [ValidateAuth, ValidateOwnership], GetTokensController);
    rootRoutes.get("/tokens/refresh", [ValidateAuth], RefreshTokensController);
    rootRoutes.get("/tokens/:id", [ValidateAuth, ValidateIfIsAdmin], GetTokensController);
    rootRoutes.post("/tokens/:id", [ValidateAuth, ValidateIfIsAdmin], CreateTokensController);
    rootRoutes.delete("/tokens/:id", [ValidateAuth, ValidateIfIsAdmin], DeleteTokensController);
}

// Public
{
    rootRoutes.get("/", IndexController);
    rootRoutes.post("/auth/login", LoginAuthController);
    rootRoutes.post("/auth/register", RegisterAuthController);
}

export default rootRoutes;
