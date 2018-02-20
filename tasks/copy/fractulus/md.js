module.exports = {
    fn: function (gulp) {
        return gulp.src([
            './src/components/**/*.md'
        ])
        .pipe(gulp.dest('./dist/components'));
    }
};