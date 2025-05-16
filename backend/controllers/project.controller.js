import projectModel from '../models/project.model.js'
import * as projectService from '../services/project.service.js'
import { validationResult } from 'express-validator'
import UserModel from '../models/user.model.js'

export const createProject = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});

    }



    try{

        const {name} = req.body; //will be sending name in the body from the frontend

        const loggedInUser = await UserModel.findOne({ email: req.user.email });
        console.log(loggedInUser)
        console.log(loggedInUser._id.toString());

        const userId = loggedInUser._id.toString();

        const newProject = await projectService.createProject({
            name, userId
        })

        res.status(201).json({
            message: 'Project created successfully',
            project: newProject
        })


    }catch(err) {
        console.log(err);
        return res.status(400).json({message: 'Some error occurred'});
    }


}

export const getAllProjects = async (req, res) => {

    try{
        const loggedInUser = await UserModel.findOne({
            email: req.user.email
        })

        console.log(loggedInUser)

        const allUserProjects = await projectService.getAllProjectsByUserId({userId: loggedInUser._id.toString()});


        return res.status(200).json({projects: allUserProjects})






    }catch(err) {
        console.log(err);
        res.status(400).json({err : err.message});
    }
}


export const addUserToProject = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try{

        const {projectId, user} = req.body;

        const loggedInUser = await UserModel.findOne({
            email: req.user.email
        })

        const userId = loggedInUser._id.toString();

        const project = await projectService.addUserToProject({
            projectId, user, userId
        })

        return res.status(200).json({
            project,
        })


    }catch(err){

        console.log(err);
        res.status(400).json({err: err.message});

    }
}


export const getProjectById = async (req, res) => {

    const {projectId} = req.params;

    try{

        const project = await projectService.getProjectById({projectId});

        return res.status(200).json({
            project
        })


    }catch(err) {
        console.log(err);
        res.status(400).json({err: err.message});
    }
 }


