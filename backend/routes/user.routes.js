import {Router} from 'express'
import * as userController from '../controllers/user.controller.js';
import {body} from 'express-validator';
const router = Router();
import * as authMiddleware from '../middleware/auth.middleware.js';



router.post('/register',
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    userController.createUserController)

router.post('/login',
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),userController.loginController)


router.get('/profile', authMiddleware.authUser , userController.profileController);

router.post('/logout', authMiddleware.authUser, userController.logoutController);

router.get('/all', authMiddleware.authUser, userController.getAllUsersController);

export default router;
