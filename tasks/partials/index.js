const fs = require('fs');
const beautify = require('js-beautify').js_beautify;
module.exports = {
    deps: ['partials:list'],
    fn: function (_, cb) {
        const content = beautify(`
            module.exports = ${JSON.stringify(global.PARTIALS_OBJ)}
        `, {
            indent_size: 2
        });
        fs.writeFile('dist/partials.js', content, cb);
    }
};