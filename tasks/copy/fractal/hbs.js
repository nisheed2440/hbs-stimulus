module.exports = {
    fn: function (gulp) {
        return gulp.src([
            './src/components/**/*.hbs'
        ])
        .pipe(gulp.dest('./dist/components'));
    }
};