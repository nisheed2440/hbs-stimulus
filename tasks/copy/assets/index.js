module.exports = {
    fn: function (gulp) {
        return gulp.src([
            './src/assets/**/*.*'
        ])
        .pipe(gulp.dest('./dist/assets'));
    }
};