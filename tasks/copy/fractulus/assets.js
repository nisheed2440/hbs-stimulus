module.exports = {
    fn: function (gulp) {
        return gulp.src([
            './src/_fractulus/assets/**/*.*'
        ])
        .pipe(gulp.dest('./dist/_fractulus/assets'));
    }
};