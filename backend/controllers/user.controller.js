import UserModel from '../models/user.model.js'
import * as userService from '../services/user.service.js';
import {validationResult} from "express-validator";
import redisClient from '../services/redis.service.js';


export const createUserController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();

        res.status(201).json({user,token});

    }catch(err) {
        res.status(400).send(err.message);
    }
}

export const loginController = async(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});

    }

    try{

        const {email, password} = req.body;

        const user = await UserModel.findOne({email}).select('+password');

        if(!user) {
            return res.status(401).json({errors: 'Invalid email or password'});
        }

        const isMatch = await user.isValidPassword(password);

        if(!isMatch) {

            return res.status(401).json({errors: 'Invalid Password'});

        }

        const token = await user.generateJWT();

        delete user._doc.password;

        res.status(200).json({user, token});


    }catch(err) {
        res.status(400).send(err.message);
    }
}

export const profileController = async(req, res) => {

    console.log(req.user);
    res.status(200).json({user : req.user});

}

export const logoutController = async(req, res) => {
    try {

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        redisClient.set(token, 'logout', 'EX', 60*60*24);

        res.status(200).json({
            message: 'Logged out successfully'
        })


    }catch(err) {
        res.status(400).send(err.message);
    }
}

export const getAllUsersController = async(req, res) => {

    try{

        const loggedInUser = await UserModel.findOne({
            email: req.user.email
        })

        const userId = loggedInUser._id.toString();



        const allUsers = await userService.getAllUsers({userId});
        res.status(200).json({users: allUsers});


    }catch(err) {
        res.status(400).json({errors: err.message});
    }



}
