/**
 * Custom angular webpack configuration
 */
const TerserPlugin = require("terser-webpack-plugin");

 module.exports = (config, options) => {
    if (config.optimization.minimizer[0]) {
        config.optimization.minimizer[0] = (
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_classnames: true,
                    compress: {
                        pure_getters: false
                    }
                }
            })
        )
    }

    config.target = 'electron-renderer';

    if (options.fileReplacements) {
        for(let fileReplacement of options.fileReplacements) {
            if (fileReplacement.replace !== 'src/environments/environment.ts') {
                continue;
            }

            let fileReplacementParts = fileReplacement['with'].split('.');
            if (fileReplacementParts.length > 1 && ['web'].indexOf(fileReplacementParts[1]) >= 0) {
                config.target = 'web';
            }
            break;
        }
    }

    return config;
}