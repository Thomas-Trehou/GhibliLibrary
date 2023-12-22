/* eslint-disable no-console */
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
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async renderFilmsByReleaseDatePage(req, res) {
    try {
      const filmReleaseYear = Number(req.params.filmDate);

      if (isNaN(filmReleaseYear) === true) {
        return res.status(404).render('404', { error: `${filmReleaseYear} is not allowed.` });
      }

      const sartReleaseYear = (filmReleaseYear - 1);
      const endReleaseYear = (filmReleaseYear + 10);

      const foundFilms = await dataMapper.getFilmsByDate(sartReleaseYear, endReleaseYear);

      res.render('filmsByDates', { foundFilms });
    } catch (err) {
      console.error(err);
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
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async bookmarkFavoriteFilm(req, res) {
    try {
      const bookmark = Number(req.body.bookmark);

      const userEmail = req.session.user.email;

      const foundFilm = await dataMapper.getFilmById(bookmark);
      if (!foundFilm) {
        return res.status(404).render('404', { error: 'The film you choose is not in our database. Please verify your choice.' });
      }

      await userDataMapper.setBookmark(bookmark, userEmail);

      const user = await userDataMapper.getUserWithFavorite(userEmail);
      const formattedUser = formatUser(user);

      req.session.user = formattedUser;

      res.redirect('/app/users/profile');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

};

module.exports = mainController;
