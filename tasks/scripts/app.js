const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const filesize = require('rollup-plugin-filesize');
const uglify = require('rollup-plugin-uglify');
const _ = require('lodash');

module.exports = {
    fn: function () {
        // Common plugins
        var rollupPlugins = [
            resolve({
                jsnext: true
            }),
            babel({
                include: ['*.js', '**/*.js'],
                exclude: 'node_modules/**'
            }),
            filesize()
        ];

        // Production plugins
        if (global.BUILD_ENVIRONMENT === 'prod') {
            rollupPlugins.push(uglify());
        }

        return rollup.rollup({
            input: './src/app.js',
            plugins: rollupPlugins,
            external: ['stimulus'],
        }).then(bundle => {
            return bundle.write(_.defaultsDeep({
                name: `${global.APP_NAMESPACE}.App`,
                file: `./dist/scripts/app.js`,
                format: 'iife',
                sourcemap: global.BUILD_ENVIRONMENT === 'prod' ? false : true,
                globals: {
                    stimulus: 'Stimulus'
                }
            }));
        });

    }
};