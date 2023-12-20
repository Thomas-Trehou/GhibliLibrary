/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
// Utilisation de PSQL

const dataMapper = require('../dataMappers/filmDataMapper');
const userDataMapper = require('../dataMappers/userDataMapper');
const formatUser = require('../utils/formatUser');

const mainController = {

  renderHomePage(_, res) {
    res.render('home');
  },

  redirectHomePage(_, res) {
    res.redirect('/app');
  },

  async renderFilmsListPage(_, res) {
    try {
      const films = await dataMapper.getdAllFilms();
      res.render('films', { films });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  },

  async renderFilmsByReleaseDatePage(req, res) {
    try {
      const param = req.params.filmDate;

      if (isNaN(param) === true || param === undefined) {
        return res.status(404).render('404', { error: `${param} is not allowed.` });
      }
      const filmDate = Number(req.params.filmDate);
      const foundFilms = await dataMapper.getFilmsByDate(filmDate);

      res.render('filmsByDates', { foundFilms });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  },

  async renderOneFilmPage(req, res) {
    try {
      const param = req.params.filmID;

      if (isNaN(param) === true || param === undefined) {
        return res.status(404).render('404', { error: `${param} is not allowed.` });
      }
      const filmID = Number(req.params.filmID);
      const foundFilm = await dataMapper.getFilmById(filmID);

      if (!foundFilm) {
        return res.status(404).render('404');
      }

      res.render('film', { foundFilm });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  },

  async addBookmark(req, res) {
    const bookmark = Number(req.body.bookmark);

    const userEmail = req.session.user.email;

    const foundFilm = await dataMapper.getFilmById(bookmark);
    if (!foundFilm) {
      return res.status(404).render('404', { error: 'The film you choose is not in our database. Please verify your choice.' });
    }

    await userDataMapper.setBookmark(bookmark, userEmail);

    const user = await userDataMapper.findUser(userEmail);
    const formattedUser = formatUser(user);

    req.session.user = formattedUser;

    res.redirect('/app/users/profile');
  },

};

module.exports = mainController;
