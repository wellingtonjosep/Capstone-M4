import { Router } from "express";

import userCreateController from "../controllers/users/userCreate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";
import userListController from "../controllers/users/userList.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import verifyEmailMiddleware from "../middlewares/verifyEmail.middleware";

import animalCreateController from "../controllers/animals/animalCreate.controller";
import animalListController from "../controllers/animals/animalList.controller";
import animalLostListController from "../controllers/animals/animalListLost.controller";
import updateAnimalController from "../controllers/animals/animalUpdate.controller";
import animalsFoundListController from "../controllers/animals/animalsListFound.controller";

import userAnimalsController from "../controllers/users/userAnimals.controller";
import commentsCreateController from "../controllers/comments/commentsCreate.controller";
import findAnimalsCommentsController from "../controllers/animals/findAnimalsComments.controller";

import verifyFieldsMiddleware from "../middlewares/verifyFields.middleware";
import verifyFieldsAnimalsCreateMiddleware from "../middlewares/verifyFieldsAnimalsCreate.middleware";
import verifyIdUserMiddleware from "../middlewares/verifyIdUser.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";
import confirmEmailMiddleware from "../middlewares/confirmEmail.middleware";
import userConfirmController from "../controllers/users/userConfirm.controller";

const router = Router();

//USUÁRIO
router.get("/users", verifyTokenMiddleware, verifyIsAdmMiddleware, userListController);
router.get("/users/animals/:id", userAnimalsController);
router.post("/users", verifyFieldsMiddleware, verifyEmailMiddleware, userCreateController
);
router.post("/users/login", confirmEmailMiddleware, userLoginController);
router.patch("/users/:id", verifyTokenMiddleware, verifyIdUserMiddleware, verifyEmailMiddleware, userUpdateController);
router.delete("/users/:id", verifyTokenMiddleware, userDeleteController);

//VERIFY
router.get("/users/verify/:id", userConfirmController);

//ANIMAIS
router.get("/animals", animalListController);
router.post("/animals", verifyFieldsAnimalsCreateMiddleware, animalCreateController);
router.patch("/animals/:id", verifyTokenMiddleware, updateAnimalController)
router.get("/animals/lost", animalLostListController);
router.get("/animals/found", animalsFoundListController);
router.get("/animals/comments/:id", findAnimalsCommentsController);
router.patch("/animals/:id", verifyTokenMiddleware, updateAnimalController);

//COMENTÁRIOS
router.post("/comments", verifyTokenMiddleware, commentsCreateController);

export default router;
