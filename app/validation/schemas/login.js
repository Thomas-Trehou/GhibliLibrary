const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
});

module.exports = loginSchema;
