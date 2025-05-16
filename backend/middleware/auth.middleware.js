import jwt from 'jsonwebtoken';
import redisClient from "../services/redis.service.js";


export const authUser = async (req, res, next) => {

    try {

        const token =  req.headers.authorization?.split(' ')[1] ||  req.cookies.token ;


        if(!token) {
            return res.status(401).send({error: 'Unauthorized User'});
        }

        const isBlackListed = await redisClient.get(token);

        if(isBlackListed) {
            res.cookie('token',);
            return res.status(401).send({error: 'Unauthorized User'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(err) {

        res.status(400).send({error : err.message});
    }
}