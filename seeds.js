var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')

var data = [
  {
    name: "Cloud's Rest",
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c43eff2f7cb0c2f6838152683da69f81&auto=format&fit=crop&w=400&q=60',
    description: 'blah blah blah blah'
  },
  {
    name: "Desert Mesa",
    image: 'https://images.unsplash.com/photo-1444124818704-4d89a495bbae?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a128b113cb6090ba5d87ee29fc3a7869&auto=format&fit=crop&w=400&q=60',
    description: 'blah blah blah blah'
  },
  {
    name: "Canyon Floor",
    image: 'https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b201f4cac49215d2be151bb4d5bc454f&auto=format&fit=crop&w=400&q=60',
    description: 'blah blah blah blah'
  },
]

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err)
    }
    console.log('removed campgrounds!')
    // add a few campgrounds
    data.forEach(function (seed) {
      Campground.create(seed, function (err, campground) {
        if (err) {
          console.log(err)
        } else {
          console.log("added a campground")
          // create a comment
          Comment.create(
            {
              text: "This place is great, but I wish there was internet",
              author: 'Homer'
            }, function (err, comment) {
              if (err) {
                console.log(err)
              } else {
                campground.comments.push(comment)
                campground.save()
                console.log('Created new comment')
              }
            }
          )
        }
      })
    })
  })

  

  // add a few comments
}

module.exports = seedDB