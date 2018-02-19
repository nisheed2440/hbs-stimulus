module.exports = {
    deps: ['build'],
    fn: function () {
        global.updateFractalEngine();
        const builder = global.fractal.web.builder();

        builder.on('progress', (completed, total) => global.fractalLogger.update(`Exported ${completed} of ${total} items`, 'info'));
        builder.on('error', err => global.fractalLogger.error(err.message));
        return builder.build().then(() => {
            global.fractalLogger.success('Fractal build completed!');
        });
    }
};