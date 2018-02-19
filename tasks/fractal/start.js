const sequence = require('gulp-sequence');

module.exports = {
    deps: ['build'],
    fn: function(gulp) {
        let server;
        // Create fractal server instance
        function createFractalServer() {
            // Update partials and helpers in the hbs engine
            global.updateFractalEngine();
            server = global.fractal.web.server({
                sync: true
            });
            server.on('error', err => global.fractalLogger.error(err.message));
            server.start().then(() => {
                global.fractalLogger.success(`Fractal server is now running at ${server.url}`);
                server.emit('source:changed');
            });
        }

        createFractalServer();

        /** JS File changes */
        gulp.watch([
            './src/components/**/*.js',
            '!./src/components/**/*.spec.js'
        ], () => {
            sequence('scripts')((err) => {
                if (err) console.log(err);
                // Reload fractal server
                server.emit('source:changed');
            });
        });

        /** CSS File changes */
        gulp.watch([
            './src/components/**/*.scss',
        ], () => {
            sequence('styles')((err) => {
                if (err) console.log(err);
                // Reload fractal server
                server.emit('source:changed');
            });
        });

        /** HBS Partial File changes */
        gulp.watch([
            './src/components/**/partials/*.hbs',
        ], () => {
            sequence('partials')((err) => {
                if (err) console.log(err);
                // Update partials and helpers in the hbs engine
                global.updateFractalEngine();
                // Reload fractal server
                server.emit('source:changed');
            });
        });

        
        /** HBS Component File changes */
        gulp.watch([
            './src/components/**/*.hbs',
            './src/components/**/*.json',
            './src/components/**/*.md',
            '!./src/components/**/partials/*.hbs'
        ], () => {
            sequence('copy:fractal')((err) => {
                if (err) console.log(err);
                // Reload fractal server
                server.emit('source:changed');
            });
        });
    }
};