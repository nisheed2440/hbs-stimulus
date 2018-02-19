const sequence = require('gulp-sequence');

module.exports = {
    fn: function (_, cb) {
        sequence('copy:fractal:hbs','copy:fractal:config','copy:fractal:md')(cb);
    }
};