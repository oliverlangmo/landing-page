var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('site/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('site/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('site/css'));
});

// Minify index
gulp.task('html', function() {
  gulp.src('site/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  gulp.src('site/js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  gulp.src('site/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
  gulp.src('site/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('site/js/*.js', ['jshint']);
  gulp.watch('site/scss/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);