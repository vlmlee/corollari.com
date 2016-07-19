var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css')
var uglify = require('gulp-uglify');

gulp.task('minify-css', function() {
    return gulp.src('lib/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('minify-js', function() {
    gulp.src('lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'));
});
