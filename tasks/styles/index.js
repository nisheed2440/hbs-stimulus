const sequence = require('gulp-sequence');

module.exports = {
    fn: function (_, cb) {
        sequence('styles:app', 'styles:components', 'concat:component:styles','clean:temp')(cb);
    }
};