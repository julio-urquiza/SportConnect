import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    surname: {
        type: String,
        trim: true
    },
    avatarURL: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ["user", "owner"],
        required: true
    }
})

export default mongoose.model("Users", UserSchema)