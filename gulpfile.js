const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const sass = require('gulp-sass');

gulp.task('nunjucks', function () {
    gulp.src('source/*.html')
        .pipe(nunjucks.compile())
        .pipe(gulp.dest('build'))
});

gulp.task('sass', function () {
  return gulp.src('source/style/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

gulp.task('copy_scripts', function () {
  gulp.src('source/scripts/*')
  .pipe(gulp.dest('build/scripts'))
});

gulp.task('default', function () {
  gulp.watch('./source/**/*', ['sass', 'nunjucks', 'copy_scripts']);
});
