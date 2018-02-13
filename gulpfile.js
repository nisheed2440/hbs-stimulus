const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const argv  = require('yargs').argv;
// Global constants
global.BUILD_ENVIRONMENT = argv.env ? argv.env : 'dev';
global.ESLINT_RC = JSON.parse(fs.readFileSync(path.resolve(`.eslintrc`), 'utf8'));
global.APP_NAMESPACE = pkg.namespace || 'XT';

// Gulp require tasks
// https://www.npmjs.com/package/gulp-require-tasks
require('gulp-require-tasks')({
    path: process.cwd() + '/tasks'
});
