const path = require('path');
module.exports = {
    mode: "production", //developmen
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.(png|jpg)$/,
            // use: [{
            //     loader: "file-loader",
            //     options: {
            //         name: "assets/images/[name][hash:5].[ext]"
            //     }
            // }]
            type: "asset",
            generator: {
                filename: "assets/images/[name][hash:5][ext]"
            },
            parser: {
                dataUrlCondition: {
                    maxSize: 3 * 1024 // 4kb
                }
            }
        }, {
            test: /\.ttf$/,
            type: "asset/resource",
            generator: {
                filename: "assets/fonts/[name][hash:5][ext]",

            }
        }, {
            test: /\.less$/i,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    // options: {
                    //     postcssOptions: {
                    //         plugins: [
                    //             [
                    //                 "autoprefixer",
                    //             ],
                    //         ],
                    //     },
                    // },
                },
                "less-loader"
            ]

        }]
    }
}