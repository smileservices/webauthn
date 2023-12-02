module.exports = (env, argv) => ({
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    entry: {
        //for dev
        // '/js/react-bundle': argv.mode === 'production'
        //     ? ['./static/react_files/react.min.js', './static/react_files/react-dom.min.js']
        //     : ['./static/react_files/react.development.js', './static/react_files/react-dom.development.js'],
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