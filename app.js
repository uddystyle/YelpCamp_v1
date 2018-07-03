var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')
var seedDB = require('./seeds')


mongoose.connect('mongodb://localhost/yelp_camp_v4')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
seedDB()

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
      res.render('campgrounds/index', {campgrounds: allCampgrounds})
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
  res.render('campgrounds/new')
})

app.get('/campgrounds/:id', function (req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      console.log(foundCampground)
      // render show template with that campground
      res.render('campgrounds/show', {campground: foundCampground})
    }
  })
})

// ====================
// COMMENTS ROUTES
// ====================
app.get('/campgrounds/:id/comments/new', function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      res.render('comments/new', {campground: campground})
    }
  })
})

app.post('/campgrounds/:id/comments', function(req, res) {
  // lookup campground using ID
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err)
        } else {
          campground.comment.push(comment)
          campground.save()
          res.redirect('/campgrounds/' + campground._id)
        }
      })
    }
  })
  // create new comment
  // connect new comment to campground
  // redirect campground show page
})

app.listen(3000, function () {
  console.log('The YelpCamp Server Has Started!!')
})
