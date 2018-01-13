const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

/**
 * Middleware
 */
app.use((req, res, next) => {
  var now = new Date().toString();
  fs.appendFile('logs/middleware.log', `${now}: ${req.method} ${req.url}\n`, (
    err) => {
    if (err) {
      console.log("Could not append to the log file");
    }
  });
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintainence.hbs', {
//     pageTitle: 'Maintainence page'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => new Date().getFullYear());
hbs.registerHelper(
  'upperCase', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   'name': 'Sudeep',
  //   'location': 'Mumbai'
  // })
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcome: 'Hello. Welcome to the web server',
    // year: new Date().getFullYear()
  });
});


app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    // year: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
