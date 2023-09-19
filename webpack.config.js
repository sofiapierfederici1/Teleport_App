const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry : {
        index : "./src/js/index.js"
    },
    output : {
        path : path.resolve(__dirname, "dist"),
        filename : "bundle.js"
    },
    module : {rules : [
        {
        test : /\.css$/i,
        use : ["style-loader", "css-loader"]
    },
    {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
    }
    ]},
    plugins : [
        new HtmlWebpackPlugin({
            title : "Quality of city life",
            template : "./src/templete.html",
    })
    ],
    devServer : {
        port : 3000,
        open : true,
        static : path.resolve(__dirname, "dist"),
    },
    mode : "production",
}

