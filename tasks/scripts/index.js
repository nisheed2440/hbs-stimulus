const sequence = require('gulp-sequence');

module.exports = {
    fn: function (_, cb) {
        sequence('eslint', 'scripts:app', 'scripts:components', 'clean:temp')(cb);
    }
};