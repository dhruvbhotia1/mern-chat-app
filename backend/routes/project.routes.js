import {Router} from 'express';
import {body} from 'express-validator';
import * as projectController from '../controllers/project.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create',
    body('name').notEmpty().withMessage('Name is required'),
    authMiddleware.authUser,
    projectController.createProject

    )

router.get('/all',
    authMiddleware.authUser,
    projectController.getAllProjects)

router.put('/add-user' , authMiddleware.authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('user').isArray({min:1}).withMessage('User must be an array of string').bail().custom((user)=> user.every(user => typeof user === 'string')).withMessage('User must be of string'),
    projectController.addUserToProject)


router.get('/:get-project/:projectId', authMiddleware.authUser, projectController.getProjectById)

export default router;
