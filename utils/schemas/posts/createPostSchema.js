const Joi = require("joi");

const createPostSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": "title is required" }),
  content: Joi.string()
    .required()
    .messages({ "any.required": "content body is required" }),
  userId: Joi.string().hex().length(24).optional(),
});

module.exports = createPostSchema;
