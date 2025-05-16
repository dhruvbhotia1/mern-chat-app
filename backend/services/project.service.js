import projectModel from '../models/project.model.js';
import mongoose from 'mongoose';

export const createProject = async ({
    name, userId
}) => {
    if (!name) {
        throw new Error('Name is required');
    }

    if(!userId) {
        throw new Error('User is required');
    }


    const project = await projectModel.create({
        name, user: [userId]
    })

    return project;


}

export const getAllProjectsByUserId = async ({userId}) => {

    if(!userId) {
        throw new Error('User is required');

    }

    const allUserProjects = await projectModel.find({user: userId})

    return allUserProjects;

}

export const addUserToProject = async ({projectId, user, userId }) => {

    if(!projectId) {
        throw new Error("Project ID is required");
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid Project ID");
    }

    if(!user) {
        throw new Error("User is required");
    }

    if(!Array.isArray(user) || user.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {

        throw new Error("Invalid user ID(s) in users array");
    }

    if(!userId) {
        throw new Error("userId is required");
    }

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
    }

    const project = await projectModel.findOne({_id: projectId, user: userId });

    console.log(project);

    if(!project) {
        throw new Error("user not being to this project");
    }

    const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId,
    }, {
        $addToSet: {
            user: {
                $each: user
            }
        }
    } , {new : true})

    return updatedProject;


}

export const getProjectById = async ({projectId}) => {

    if(!projectId) {
        throw new Error("Invalid Project ID");
    }

    const project = await projectModel.findOne({
        _id: projectId
    }).populate('user')

    return project;
}