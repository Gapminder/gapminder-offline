/**
 * Custom angular webpack configuration
 */
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (config, options) => {
    //check for serve
    if (config.devServer) {
        config.plugins.push(new CopyPlugin({
            patterns: [{
                context: path.resolve(__dirname, "preview-data", "translation"),
                from: "**/*",
                to: "assets/translation/"
            }]
        }))
    }

    if (config.optimization.minimizer[0]) {
        config.optimization.minimizer[0] = (
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                    compress: {
                        global_defs: {
                            ngDevMode: false,
                            ngI18nClosureMode: false,
                            ngJitMode: false
                        },
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