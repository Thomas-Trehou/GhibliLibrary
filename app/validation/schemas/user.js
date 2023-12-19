const Joi = require('joi');

const createUserSchema = Joi.object({
  firstname: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  lastname: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  passwordConfirm: Joi.ref('password'),
});

module.exports = createUserSchema;
