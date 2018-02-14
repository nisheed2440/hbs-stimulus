'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();


const hbs = require('@frctl/handlebars')({
    helpers: {
        json: function(context) {
            return JSON.stringify(context, null ,4);
        }
    }
    /* other configuration options here */
});

fractal.components.engine(hbs); /* set as the default template engine for components */
fractal.docs.engine(hbs); /* you can also use the same instance for documentation, if you like! */

/* Set the title of the project */
fractal.set('project.title', 'FooCorp Component Library');
fractal.set('project.version', 'v1.0');
fractal.set('project.author', 'Mickey Mouse');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/dist/components');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/docs');

/* Specify a directory of static assets */
fractal.web.set('static.path', __dirname + '/dist');

/* Set the static HTML build destination */
fractal.web.set('builder.dest', __dirname + '/build');
/* Set the default preview template */
fractal.components.set('default.preview', '@preview');