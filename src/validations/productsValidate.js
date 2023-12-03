import Joi from "joi"
const validationProduct = Joi.object({
    name: Joi.string().required().min(5),
    price: Joi.number().required().min(0),
    desc: Joi.string()
});

export { validationProduct };