const concat = require('gulp-concat');

module.exports = {
    deps: ['scripts:components', 'copy:scripts:maps'],
    fn: function(gulp) {
        return gulp.src('./dist/components/**/*.js')
        .pipe(concat('components.js'))
        .pipe(gulp.dest('./dist/scripts'));
    }
};