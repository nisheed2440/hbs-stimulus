const wait = require('gulp-wait');
const path = require('path');
const map = require('map-stream');
const _ = require('lodash');
const minify = require('html-minifier').minify;
module.exports = {
    fn: function (gulp) {
        global.PARTIALS_OBJ = {};
        return gulp.src([
            './src/components/**/partials/*.hbs'
        ])
        .pipe(wait(500))
        .pipe(map(function (file, done) {
            const fileName = path.basename(file.path);
            const partialName = `_${_.camelCase(path.basename(file.path, path.extname(fileName)))}`;
            const partialContent = minify(file.contents.toString(), {
                collapseWhitespace: true,
                removeComments: true
            });
            global.PARTIALS_OBJ[partialName] = partialContent;
            done(null);
        }));
    }
};