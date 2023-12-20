const dates = require('./dates');

const middlewares = {

  middleware404: (_, res) => {
    res.status(404).render('404');
  },

  middlewarelocals: (_, res, next) => {
    res.locals.dates = dates;

    next();
  },

  middlewareLocalUser: (req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user;
    } else {
      res.locals.user = null;
    }
    next();
  },
};

module.exports = middlewares;
