var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

var Campground = mongoose.model('Campground', campgroundSchema)

// Campground.create(
//   {
//     name: 'Salmon Creek',
//     image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b014439cf4c47fafedbd_340.jpg',
//     description: 'This is a huge granite hill, no bathrooms. no water. Beautiful granite!'
//   }, function (err, campground) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('NEWLY CREATED CAMPGROUND: ')
//       console.log(campground)
//     }
//   }
// )

// var campgrounds = [
//   { name: 'Salmon Creek', image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b014439cf4c47fafedbd_340.jpg' },
//   { name: 'Granite Hill', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104497f9c57ca1e5b5b0_340.jpg' },
//   { name: "Mountain Goat's Rest", image: 'https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg' },
//   { name: 'Salmon Creek', image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b014439cf4c47fafedbd_340.jpg' },
//   { name: 'Granite Hill', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104497f9c57ca1e5b5b0_340.jpg' },
//   { name: "Mountain Goat's Rest", image: 'https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg' },
//   { name: 'Salmon Creek', image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b014439cf4c47fafedbd_340.jpg' },
//   { name: 'Granite Hill', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104497f9c57ca1e5b5b0_340.jpg' },
//   { name: "Mountain Goat's Rest", image: 'https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg' }
// ]

app.get('/', function (req, res) {
  res.render('landing')
})

// INDEX - show all campgrounds
app.get('/campgrounds', function (req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', {campgrounds: allCampgrounds})
    }
  })
  // res.render('campgrounds', {campgrounds: campgrounds})
})

// CREATE - add new campground to DB
app.post('/campgrounds', function (req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCampground = {name: name, image: image, description: desc}
  // Create a new campground and Save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      // redirect back to campgrounds page
      res.redirect('/campgrounds')
    }
  })
})

// NEW - show form to create new campground
app.get('/campgrounds/new', function (req, res) {
  res.render('new.ejs')
})

app.get('/campgrounds/:id', function (req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id, function (err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      // render show template with that campground
      res.render('show', {campground: foundCampground})
    }
  })
})

app.listen(3000, function () {
  console.log('The YelpCamp Server Has Started!!')
})
