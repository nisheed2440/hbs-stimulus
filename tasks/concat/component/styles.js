const concat = require('gulp-concat');

module.exports = {
    deps: ['styles:components'],
    fn: function(gulp) {
        return gulp.src('./dist/components/**/*.css')
        .pipe(concat('components.css'))
        .pipe(gulp.dest('./dist/styles'));
    }
};