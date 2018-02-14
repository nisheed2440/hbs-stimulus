const wait = require('gulp-wait');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const filesize = require('rollup-plugin-filesize');
const uglify = require('rollup-plugin-uglify');
const path = require('path');
const fs = require('fs');
const map = require('map-stream');
const _ = require('lodash');

module.exports = {
    fn: function (gulp) {
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

        return gulp.src([
            './src/components/**/*.js'
        ])
            .pipe(wait(500))
            .pipe(map(function (file, done) {
                // Require the corresponding package.json
                const dirname = path.dirname(file.path);
                const contents = JSON.parse(fs.readFileSync(path.join(dirname, 'package.json'), 'utf8'));
                const componentName = dirname.split('\\').slice(-1)[0];
                const componentFile = path.basename(file.path);

                return rollup.rollup({
                    input: path.join(dirname, componentFile),
                    plugins: rollupPlugins,
                    external: _.get(contents, 'rollup.inputOptions.external', []).concat("app"),
                }).then(bundle => {
                    done(null, file);
                    return bundle.write(_.defaultsDeep({
                            file: `./dist/components/${componentName}/${componentFile}`,
                            format: 'iife',
                            sourcemap: global.BUILD_ENVIRONMENT === 'prod' ? false : true,
                            paths: {
                                app: '../../scripts/app.js'
                            },
                            globals: {
                                app: `${global.APP_NAMESPACE}.App`
                            }
                        },
                        Object.assign({}, _.get(contents, 'rollup.outputOptions', {}), {
                            name: `${global.APP_NAMESPACE}.${_.get(contents, 'rollup.outputOptions.name', '')}`
                        })
                    ));
                });

            }))
            .pipe(gulp.dest('./dist/temp'));
    }
};