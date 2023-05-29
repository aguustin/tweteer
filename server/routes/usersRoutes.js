import { Router } from "express";
import { authenticateUserController, createUserController, deleteAllUsersController, editProfileController, editPasswordController, getUsersController, followingController, checkFollowController, unFollowController } from "../controllers/userController.js";

const router = Router();

router.get('/getAllUsers', getUsersController);

router.post('/createUser', createUserController);

router.post('/authenticateUser', authenticateUserController);

router.put('/editPassword/:userName/:password/:confirmPassword', editPasswordController);

router.post('/editProfile', editProfileController);

router.put('/following/:followingId/:sessionId', followingController);

router.put('/unFollow/:followingId/:sessionId', unFollowController);

router.get('/checkFollow/:followingId', checkFollowController);

router.delete('/deleteAll', deleteAllUsersController)

export default router;