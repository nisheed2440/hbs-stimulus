const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const argv  = require('yargs').argv;
// Global constants
global.BUILD_ENVIRONMENT = argv.env ? argv.env : 'dev';
global.ESLINT_RC = JSON.parse(fs.readFileSync(path.resolve(`.eslintrc`), 'utf8'));
global.APP_NAMESPACE = pkg.namespace || 'XT';
global.PARTIALS_OBJ = {};

/*
 * Configure a Fractal instance.
 *
 * This configuration could also be done in a separate file, provided that this file
 * then imported the configured fractal instance from it to work with in your Gulp tasks.
 * i.e. const fractal = require('./my-fractal-config-file');
 */

/* Create a new Fractal instance and export it for use elsewhere if required */
global.fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
global.fractal.set('project.title', 'FooCorp Component Library');
global.fractal.set('project.version', 'v1.0');
global.fractal.set('project.author', 'Mickey Mouse');

/* Tell Fractal where the components will live */
global.fractal.components.set('path', __dirname + '/dist/components');

/* Tell Fractal where the documentation pages will live */
global.fractal.docs.set('path', __dirname + '/src/docs');

/* Specify a directory of static assets */
global.fractal.web.set('static.path', __dirname + '/dist');

/* Set the static HTML build destination */
global.fractal.web.set('builder.dest', __dirname + '/build');

/* Set the default preview template */
global.fractal.components.set('default.preview', '@component-preview');
global.fractal.components.set('title', 'Core');
global.fractal.components.set('label', 'core');

// any other configuration or customisation here
global.fractalLogger = global.fractal.cli.console; // keep a reference to the fractal CLI console utility

/** 
 * Function to update the partials and helpers in the hbs engine used in the fractal instance.
*/
global.updateFractalEngine = function() {
    const hbs = require('@frctl/handlebars')({
        helpers: {
            json: function(context) {
                return JSON.stringify(context, null ,4);
            },
            concat: function(basePath, assetPath) {
                return path.join(basePath, assetPath).replace(/\\/g,'/');
            }
        },
        partials: requireUncached('./dist/partials')
        /* other configuration options here */
    });
    
    global.fractal.components.engine(hbs); /* set as the default template engine for components */
    global.fractal.docs.engine(hbs); /* you can also use the same instance for documentation, if you like! */
};
// Gulp require tasks
// https://www.npmjs.com/package/gulp-require-tasks
require('gulp-require-tasks')({
    path: process.cwd() + '/tasks'
});
/**
 * Function to require uncached module/file 
 * @param {string} module The name of the module that needs to be freshly required.
 * https://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate
 */
function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module);
}
