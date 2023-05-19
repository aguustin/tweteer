import { Router } from "express";
import { authenticateUserController, createUserController, deleteAllUsersController, editPasswordController, getUsersController } from "../controllers/userController.js";

const router = Router();

router.get('/getAllUsers', getUsersController);

router.post('/createUser', createUserController);

router.post('/authenticateUser', authenticateUserController);

router.put('/editPassword/:userName/:password/:confirmPassword', editPasswordController);

router.delete('/deleteAll', deleteAllUsersController)

export default router;