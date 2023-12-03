import Auth_model from "../models/Auth_model";
import { validationAuth, validationAuthLogin } from "../validations/authValidate"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_CODE } = process.env;

export const registerAuth = async (req, res) => {
    try {

        const { body} = req;
        const { error } = validationAuth.validate(req.body);

        if(error){
            const errors = error.details.map(err => err.message);

            return res.status(404).json({
                name: "Body is required!",
                message: errors
            })
        }

        const checkEmail = await Auth_model.findOne({email: req.body.email});

        if(checkEmail){
            return res.status(404).json({
                message: "Email da ton tai",
            })
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        if(hashPassword) {
            return res.status(400).json({
                message: "Ma hoa mat khau that bai",
            })
        }

        const data = await Auth_model.create({username: body.username, password: hashPassword, email: body.email});

        if(!data){
            return res.status(404).json({
                message: "Dan ki that bai"
            })
        }

        body.password = undefined;

        return res.status(200).json({
            message: "Thanh cong",
            data: {
                username: data.username,
                email: data.email
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            name: error.name || "Error"
        })
    }
}

export const loginAuth = async (req, res) => {
    try {
        const { body} = req;
        const { error } = validationAuthLogin.validate(body);

        if(error){
            const errors = error.details.map(err => err.message);

            return res.status(404).json({
                name: "Body is required!",
                message: errors
            })
        }

        const checkEmail = await Auth_model.findOne({email: req.body.email});

        if(!checkEmail){
            return res.status(404).json({
                message: "Email khong dung",
            })
        }

        const checkPassword = await bcryptjs.compare(body.password, checkEmail.password);

        if(!checkPassword) {
            return res.status(404).json({
                message: "Mat khau khong dung",
            })
        }

        const token = jwt.sign({id: checkEmail._id}, SECRET_CODE, {expiresIn: "1d"});

        if(!token){
            return res.status(404).json({
                message: "Tao token that bai",
            })
        }

        return res.status(200).json({
            message: "Dang nhap thanh cong",
            token: token,
            data: {
                username: checkEmail.username,
                email: checkEmail.email
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            name: error.name || "Error"
        })
    }
}