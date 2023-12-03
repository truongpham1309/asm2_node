import Products_model from "../models/Products_model"
import { validationProduct } from "../validations/productsValidate";

export const getAllProducts = async (req, res) => {
    try {
        const data = await Products_model.find();
        if(!data || data.length === 0){
            return res.status(404).json({
                message: "Khong co san pham nao",
                data: [],
            })
        }

        return res.status(200).json({
            message: "Lay san pham thanh cong",
            data: data,
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server Error",
        })
    }
}

export const getDetailProduct = async (req, res) => {
    try {

        const data = await Products_model.findById(req.params.id);
        if(!data){
            return res.status(404).json({
                message: "Khong co san pham phu hop",
                data: {},
            })
        }

        return res.status(200).json({
            message: "Lay san pham thanh cong",
            data, data
        })
        
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server Error",
        })
    }
}

export const createProducts = async (req, res) => {
    try {
        const { error } = validationProduct.validate(req.body);

        if(error) {
            res.status(400).json({
                message: error.message,
                name: "Them san pham that bai",
            })
        }

        const data = await Products_model.create(req.body);
        if(!data){
            res.status(404).json({
                message: "Them san pham that bai",
            })
        }

        return res.status(200).json({
            message: "Them san pham thanh cong",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server Error",
        })
    }
}

export const removeProduct = async (req, res) => {
    try {
        const data = await Products_model.findByIdAndDelete(req.params.id);

        if(!data){
            res.status(404).json({
                message: "Xoa san pham that bai",
            })
        }

        return res.status(200).json({
            message: 'Xoa san pham thanh cong'
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server Error",
        })
    }
}

export const updateProducts = async (req, res) => {
    try {
        const { error } = validationProduct.validate(req.body);

        if(error){
            const errors = error.details.map(err => err.message);

            return res.status(404).json({
                message: errors,
            })
        }

        const data = Products_model.findOneAndReplace({_id: req.params.id}, req.body, {new: true});

        if(!data){
            return res.status(404).json({
                message: "Cap nhat san pham that bai"
            })
        }

        return res.status(200).json({
            message: "Cap nhat san pham thanh cong",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server Error",
        })
    }
}