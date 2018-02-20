const sequence = require('gulp-sequence');

module.exports = {
    fn: function (_, cb) {
        sequence('copy:fractulus:hbs','copy:fractulus:config','copy:fractulus:md', 'copy:fractulus:assets')(cb);
    }
};