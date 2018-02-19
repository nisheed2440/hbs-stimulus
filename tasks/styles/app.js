const sass = require('gulp-sass');
const wait = require('gulp-wait');
const postcss = require('gulp-postcss');
const perfectionist = require('perfectionist');
const nano = require('cssnano');
const cssnext = require('postcss-cssnext');

// Postcss plugins
const processors = [
    perfectionist,
    cssnext
];


module.exports = {
    fn: function(gulp) {
        // Production plugins
        if (global.BUILD_ENVIRONMENT === 'prod') {
            processors.push(nano);
        }
        return gulp.src([
                `./src/app.scss`
            ])
            .pipe(wait(500))
            .pipe(sass({
                includePaths: ['node_modules', 'bower_components', 'src', '.']
            }))
            .pipe(postcss(processors))
            .pipe(gulp.dest('./dist/styles'));
    }
};