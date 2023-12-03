import mongoose from "mongoose";


const AuthSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Users", AuthSchema);