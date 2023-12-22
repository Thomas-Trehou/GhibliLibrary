const client = require('./dataBase');

const dataMapper = {

  async getdAllFilms() {
    const query = {
      text: 'SELECT * FROM film',
    };
    const result = await client.query(query);
    return result.rows;
  },

  async getFilmsByDate(sartReleaseYear, endReleaseYear) {
    const query = {
      text: 'SELECT * FROM film WHERE release_date >= $1 AND release_date <= $2',
      values: [sartReleaseYear, endReleaseYear],
    };
    const result = await client.query(query);
    return result.rows;
  },

  async getFilmById(id) {
    const query = {
      text: 'SELECT * FROM film WHERE id = $1',
      values: [id],
    };
    const result = await client.query(query);
    return result.rows[0];
  },
};

module.exports = dataMapper;
