const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
});

const User = mongoose.model(userSchema);


// for validating user 
const validate = (User) => {
    const schema = Joi.object({
        first_name : Joi.string().required(),
        last_name : Joi.string().required(),
        email : Joi.string().email().required(),
        password : Joi.string().required(),
    })
    return schema.validate(User);
}

module.exports = { User , validate} ;
