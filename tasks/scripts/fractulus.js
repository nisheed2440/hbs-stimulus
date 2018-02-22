const wait = require('gulp-wait');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const filesize = require('rollup-plugin-filesize');
const uglify = require('rollup-plugin-uglify');
const commonjs = require('rollup-plugin-commonjs');
const path = require('path');
const map = require('map-stream');

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
            commonjs(),
            filesize()
        ];

        // Production plugins
        if (global.BUILD_ENVIRONMENT === 'prod') {
            rollupPlugins.push(uglify());
        }

        return gulp.src([
            './src/fractulus/scripts/*.js'
        ])
        .pipe(wait(500))
        .pipe(map(function (file, done) {
            // Require the corresponding package.json
            const dirname = path.dirname(file.path);
            const componentFile = path.basename(file.path);

            return rollup.rollup({
                input: path.join(dirname, componentFile),
                plugins: rollupPlugins
            }).then(bundle => {
                done(null, file);
                return bundle.write({
                        file: `./dist/fractulus/scripts/${componentFile}`,
                        format: 'umd'
                    });
            });

        }))
        .pipe(gulp.dest('./dist/temp'));
    }
};