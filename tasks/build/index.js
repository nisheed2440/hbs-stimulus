const sequence = require('gulp-sequence');

module.exports = {
    fn: function (_, cb) {
        sequence('clean:dist', 'clean:temp', 'scripts', 'styles', 'partials', 'copy:assets', 'scripts:fractulus', 'styles:fractulus', 'copy:fractulus', 'clean:temp')(cb);
    }
};