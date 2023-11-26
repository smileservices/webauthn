module.exports = (env, argv) => ({
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    entry: {
        // just create the react-bundle once
        '/js/auth-app': './src/AuthApp.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/static/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
});