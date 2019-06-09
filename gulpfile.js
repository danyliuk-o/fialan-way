var syntax = "scss";
var gulpVer = 4;
var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  autoprefixer = require("gulp-autoprefixer"),
  notify = require("gulp-notify"),
  rename = require("gulp-rename"),
  cleancss = require("gulp-clean-css");

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "app"
    }
  });
});

gulp.task("styles", function() {
  return gulp
    .src("app/" + syntax + "/common." + syntax)
    .pipe(
      sass({ outputStyle: "expanded" }).on(
        "error",
        notify.onError({
          message: "<%= error.message %>",
          title: "Sass Error!",
          sound: "Pop"
        })
      )
    )
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer(["last 15 versions", "> 0.1%"], { cascade: true }))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task("scripts", function() {
  return gulp
    .src([
      "app/js/**/*js"
    ])
    // .pipe(concat("scripts.min.js"))
    // .pipe(uglify())
    // .pipe(gulp.dest("app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("code", function() {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});

if (gulpVer == 3) {
  gulp.task("watch", ["styles", "scripts", "browser-sync"], function() {
    gulp.watch("app/" + syntax + "/**/*." + syntax + "", ["sass"]);
    gulp.watch("app/js/**/*.js", ["scripts"]);
    gulp.watch("app/*html", ["code"]);
  });

  gulp.task("default", ["watch"]);
}
if (gulpVer == "4") {
  gulp.task("watch", function() {
    // watch('app/'+syntax+'/**/*.'+syntax+'', {readDelay: 100}, function() {
    //     gulp.start('sass');
    // });
    gulp.watch("app/" + syntax + "/**/*." + syntax, gulp.parallel("styles"));
    gulp.watch("app/js/**/*.js", gulp.parallel("scripts"));
    gulp.watch("app/*html", gulp.parallel("code"));
  });

  gulp.task(
    "default",
    gulp.parallel("watch", "styles", "scripts", "browser-sync")
  );
}
