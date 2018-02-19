const flatten = require('gulp-flatten');
module.exports = {
    fn: function (gulp) {
        return gulp.src([
            './dist/components/**/*.map'
        ])
        .pipe(flatten())
        .pipe(gulp.dest('./dist/scripts'));
    }
};