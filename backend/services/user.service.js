import UserModel from '../models/user.model.js';


export const createUser = async ({email, password}) => {

    if(!email || !password) {
        throw new Error("Email and password are required");
    }

    const hashedPassword = await UserModel.hashPassword(password); //intellisense not recognizing this function

    const user = await UserModel.create({
        email, password: hashedPassword
    })

    return user;

}


export const getAllUsers = async({userId}) => {

    try{
        const allUsers = await UserModel.find({
            _id: {$ne: userId}
        }).select('-password');
        return allUsers;
    }catch(err) {

        console.log(err);
        throw new Error("Error fetching users");
    }
}


