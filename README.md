# YelpCamp V1

>ルートパスにランディングページ実装 landing.ejs

`"/" render("landing")`

>campgroundページ作成 campgrounds.ejs ランディングページからurlリンク

`<a href="/campgrounds">View All Campgrounds</a>`

>campgroundsページでcampgrounds変数を使えるようにする

`app.js: res.render("campgrounds", {campgrounds: campgrounds});`
`campgrounds.ejs: <%= campgrounds %>`

`mkdir views/partials`
`touch views/partials/header.ejs`
`touch views/partials/footer.ejs`

`npm install body-parser --save`
`app.js: var bodyParser = require("body-parser")`
`app.js: app.use(bodyParser.urlencoded({extended: true}))`

```
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});
```

`touch views/new.ejs`