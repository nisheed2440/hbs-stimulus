module.exports = {
    fn: function (gulp) {
        return gulp.src([
            './src/fractulus/assets/**/*.*'
        ])
        .pipe(gulp.dest('./dist/fractulus/assets'));
    }
};