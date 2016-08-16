var gulp            = require('gulp');
var runSequence     = require('run-sequence');
var sass            = require('gulp-sass');
var rename          = require('gulp-rename');
var htmlprocessor   = require('gulp-htmlprocessor');
var postcss         = require('gulp-postcss');
var uglify          = require('gulp-uglify');
var htmlmin         = require('gulp-htmlmin');
var browserSync     = require('browser-sync').create();
var autoprefixer    = require('autoprefixer');
var concat          = require('gulp-concat');
var cssnano         = require('gulp-cssnano');
var ghPages         = require('gulp-gh-pages');

gulp.task('browserSync', ['build'], function() {
    browserSync.init({
        port: 3000,
        server: {
            baseDir: './dist'
        }
    })
});

gulp.task('sass', function () {
    return gulp.src('./src/styles/style.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([
        autoprefixer({'browsers': ['last 5 versions', '> 1%']}),
    ]))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('minifyCSS', function () {
    return gulp.src(['./dist/styles/*.css', '!./dist/styles/*.min.css'])
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('concatCSS', function () {
    return gulp.src(['./node_modules/chico/dist/ui/chico.min.css', './dist/styles/style.min.css'])
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('css', function (done) {
    runSequence(
        'sass',
        'minifyCSS',
        'concatCSS'
        , done);
});

gulp.task('minifyJS', function () {
    return gulp.src('./src/scripts/script.js')
    .pipe(uglify({
        mangle: false
    }).on('error', function(e) {
        console.log(e);
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('concatJS', function () {
    return gulp.src(['./node_modules/chico/node_modules/tiny.js/dist/tiny.min.js',
                     './node_modules/chico/dist/ui/chico.min.js',
                     './dist/scripts/script.min.js'])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('js', function (done) {
    runSequence(
        'minifyJS',
        'concatJS'
        , done);
});


gulp.task('html', function () {
    return gulp.src('./src/views/index.html')
    .pipe(htmlprocessor())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
});

gulp.task('ghPages', function () {
    return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('serve', ['browserSync']);
gulp.task('build', ['css', 'js', 'html']);
gulp.task('deploy', function (done) {
    runSequence(
        'build',
        'ghPages'
        , done);
});

gulp.watch('./*.html').on('change', browserSync.reload);
gulp.watch('src/styles/*.scss', ['css']).on('change', browserSync.reload);
gulp.watch('src/scripts/*.js', ['js']).on('change', browserSync.reload);
