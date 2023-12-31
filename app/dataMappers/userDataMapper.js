const client = require('./dataBase');

const dataMapper = {
  async getUser(emailParam) {
    const query = {
      text: 'SELECT * FROM "user" WHERE email=$1',
      values: [emailParam],
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  async getUserWithFavorite(emailParam) {
    const query = {
      text: 'SELECT "user".id, "user".firstname, "user".email, "user".password,  film.id AS film_id, film.title, film.original_title, film.description, film.director, film.banner_src, film.release_date, film.duration FROM "user" INNER JOIN film ON "user".favorite_film_id = film.id WHERE email=$1',
      values: [emailParam],
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  async addUser(user) {
    const query = {
      text: 'INSERT INTO "user" ("firstname", "lastname", "email", "password") VALUES ($1, $2, $3,$4)',
      values: [user.firstname, user.lastname, user.email, user.password],
    };
    const result = await client.query(query);
    return result.rows;
  },

  async setBookmark(favoriteFilmId, user) {
    const query = {
      text: 'UPDATE "user" SET favorite_film_id = $1  WHERE email = $2 ',
      values: [favoriteFilmId, user],
    };
    const result = await client.query(query);
    return result.rows;
  },
};

module.exports = dataMapper;
