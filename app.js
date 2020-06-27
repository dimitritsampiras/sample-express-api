const express = require('express');
const path = require('path');
const router = require('./routes/api/users');
const exphbs = require('express-handlebars');
const users = require('./database');

const app = express();

app.use((req, res, next) => {
  console.log(
    `GET request on ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  return next();
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index', {
  title: 'Users',
  users: users
}));

app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 500;
app.listen(PORT, () =>
  console.log('\x1b[36m', `The server is listening on port ${PORT}`)
);
