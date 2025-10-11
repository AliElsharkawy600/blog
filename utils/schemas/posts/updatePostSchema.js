const Joi = require("joi");

const updatePostSchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
})
  .min(1)
  .messages({ "object.min": "Cannot send empty object to update" });

module.exports = updatePostSchema;
