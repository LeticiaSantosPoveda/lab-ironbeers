const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, '/views/partials'));


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {    // con async await metemos el async delante de la función (req, res) y luego hacemos variable let beerArr = await...
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    const data = {
      beers: beersFromApi  // es porque el render no me admite un array, lo meto dentro de un objeto.
    }
    res.render('beers', data);    // res.render dentro de la promise
  })
  .catch(error => console.log(error));

});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    const randomData = {
      randomBeers: responseFromAPI
    }
    res.render('random-beer', randomData);
  })
  .catch(error => console.log(error));
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
