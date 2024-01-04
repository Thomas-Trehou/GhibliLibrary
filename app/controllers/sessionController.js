/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const dataMapper = require('../dataMappers/userDataMapper');
const formatUser = require('../utils/formatUser');

const loginController = {

  loginPage(_, res) {
    res.render('login');
  },

  // eslint-disable-next-line consistent-return
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await dataMapper.getUserWithFavorite(email);

      if (!user) {
        return res.render('login', {
          error: 'This user does not exist',
        });
      }
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.render('login', {
          error: 'Incorrect credentials',
        });
      }

      const formattedUser = formatUser(user);

      req.session.user = formattedUser;

      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // eslint-disable-next-line consistent-return
  profilePage(req, res) {
    if (!req.session.user) {
      return res.render('login', {
        error: 'You have to be connected to access your profile.',
      });
    }
    res.render('profile');
  },

  logout: (req, res) => {
    req.session.user = false;

    res.redirect('/');
  },
};

module.exports = loginController;
