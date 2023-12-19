/* eslint-disable no-param-reassign */
function validate(validators) {
  return async (req, res, next) => {
    if (!Array.isArray(validators) && validators.schema && validators.source) {
      validators = [validators];
    }

    const validations = validators.map(({ schema, source }) => schema.validateAsync(req[source]));

    await Promise.all(validations)
      .then(() => next())
      .catch((err) => res.status(400).render('register', { error: err.message }));
  };
}

module.exports = validate;
