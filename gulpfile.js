var gulp            = require('gulp');
var runSequence     = require('run-sequence');
var sass            = require('gulp-sass');
var postcss         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var concat          = require('gulp-concat');
var cssnano         = require('gulp-cssnano');

gulp.task('sass', function () {
    return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
        autoprefixer({'browsers': ['last 5 versions', '> 1%']}),
    ]))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minifyCSS', function () {
    return gulp.src(['./dist/css/*.css', '!./dist/css/*.min.css'])
    .pipe(concat('style.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build', function (done) {
    runSequence(
        'sass',
        'minifyCSS'
        , done);
});
