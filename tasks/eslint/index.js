const eslint = require('gulp-eslint');

module.exports = {
    fn: function (gulp) {
        return gulp.src([
            './src/app.js',
            './src/scripts/**/*.js',
            './src/components/**/*.component.js',
            './src/components/**/*.component.spec.js'
        ])
        .pipe(eslint('./.eslintrc'))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    }
};