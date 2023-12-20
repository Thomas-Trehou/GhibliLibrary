const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const session = require('express-session');

const app = express();
const router = require('./app/router');
const middlewares = require('./middlewares/middlewares');

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('public'));

const port = 8080;

app.use(middlewares.middlewarelocals);

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'une chaine de charactères aléatoire',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
}));

app.use(middlewares.middlewareLocalUser);

app.use(router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
