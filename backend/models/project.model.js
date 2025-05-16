import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
    name : {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: [true, 'Project name already exists'],

    },

    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

export default mongoose.model('Project', projectSchema);