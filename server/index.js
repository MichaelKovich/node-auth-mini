const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const strategy = require(`${__dirname}/strategy.js`);

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10000000,
  },
}));

// Set up passport after initializing the session
// Works in conjunction with the session to control user authentication.
app.use(passport.initialize()); //
app.use(passport.session()); //
passport.use(strategy); //

// Call the passport.serializeUser method and pass in a function as the first argument.
// This function should have a user and done parameter.
// This function should call done with null as the first argument and an object as the second argument.
// Use an object that only has the id, displayName, nickname, and email from user.
// Call the passport.deserializeUser method and pass in a function as the first argument.
// This function should should have a obj and doneparameter.
// obj will equal the object we passed into done from serializeUser.
// This function should call done with null as the first argument and obj as the second argument.
// After done is finished, the value of obj is then stored on req.user and req.session.passport.user.

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get(
  '/auth',
  passport.authenticate('auth0', {
    successRedirect: '/me',
    failureRedirect: '/auth',
    failureFlash: true,
  }),
);

app.get('/me', (req, res) => {
  if (!req.user) {
    res.status(401).json({message: 'Not Authenticated'});
    // could also res.redirect them back to the login page
  } else {
    res.status(200).json(req.user);
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
