# YelpCamp V1

>ルートパスにランディングページ実装 landing.ejs

`"/" render("landing")`

>campgroundページ作成 campgrounds.ejs ランディングページからurlリンク

`<a href="/campgrounds">View All Campgrounds</a>`

>campgroundsページでcampgrounds変数を使えるようにする

`app.js: res.render("campgrounds", {campgrounds: campgrounds});`
`campgrounds.ejs: <%= campgrounds %>`

