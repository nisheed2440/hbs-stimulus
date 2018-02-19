const sequence = require('gulp-sequence');

module.exports = {
    fn: function (_, cb) {
        sequence('clean:dist', 'scripts', 'styles', 'partials', 'copy:fractal')(cb);
    }
};