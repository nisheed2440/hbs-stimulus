module.exports = {
    fn: function (gulp) {
        return gulp.src([
            './src/components/**/*.json'
        ])
        .pipe(gulp.dest('./dist/components'));
    }
};