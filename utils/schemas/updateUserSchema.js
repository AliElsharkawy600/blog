const Joi = require("joi");

const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({
      'string.email': 'Please provide a valid email address'
    })
}).min(1);

module.exports = updateUserSchema;
