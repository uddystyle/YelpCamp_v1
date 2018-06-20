var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

var campgrounds = [
  { name: 'Salmon Creek', image: 'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b014439cf3c479a5eeb0_340.jpg' },
  { name: 'Granite Hill', image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b014439cf3c479a5eeb0_340.jpg' },
  { name: "Mountain Goat's Rest", image: 'https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg' },
  { name: 'Salmon Creek', image: 'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b014439cf3c479a5eeb0_340.jpg' },
  { name: 'Granite Hill', image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b014439cf3c479a5eeb0_340.jpg' },
  { name: "Mountain Goat's Rest", image: 'https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg' },
  { name: 'Salmon Creek', image: 'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b014439cf3c479a5eeb0_340.jpg' },
  { name: 'Granite Hill', image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b014439cf3c479a5eeb0_340.jpg' },
  { name: "Mountain Goat's Rest", image: 'https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg' }
]

app.get('/', function (req, res) {
  res.render('landing')
})

app.get('/campgrounds', function (req, res) {
  res.render('campgrounds', {campgrounds: campgrounds});
})

app.post('/campgrounds', function (req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name
  var image = req.body.image
  var newCampground = {name: name, image: image}
  campgrounds.push(newCampground)
  // redirect back to campgrounds page
  res.redirect('/campgrounds')
})

app.get('/campgrounds/new', function (req, res) {
  res.render('new.ejs')
})

app.listen(3000, function () {
  console.log('The YelpCamp Server Has Started!!');
})