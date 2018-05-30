const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const recipes = require('./routes/api/recipes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbURI = require('./config/keys').mongoURI;
mongoose
  .connect(dbURI)
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

// use route
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/recipes', recipes);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
