const bcrypt = require('bcrypt');
const dataMapper = require('../dataMappers/userDataMapper');

const usersController = {

  registerPage(_, res) {
    res.render('register');
  },

  // eslint-disable-next-line consistent-return
  async register(req, res) {
    try {
      const userEntry = await dataMapper.findUser(req.body.email);

      if (userEntry) {
        return res.render('register', {
          error: 'This email is already in use.',
        });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: encryptedPassword,
      };

      await dataMapper.addUser(newUser);

      res.render('login', { message: 'You can log in !' });
    } catch (err) {
      res.render('register', { error: err.message });
    }
  },

};

module.exports = usersController;
