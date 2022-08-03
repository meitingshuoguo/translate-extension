module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const miniCssExtractPlugin = webpackConfig.plugins.find(
        (element) => element.constructor.name === "MiniCssExtractPlugin"
      );
      miniCssExtractPlugin.options.filename = "static/css/[name].css";
      miniCssExtractPlugin.options.chunkFilename = "static/css/[name].css";

      return {
        ...webpackConfig,
        entry: {
          main: [
            env === "development" &&
              require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs,
          ].filter(Boolean),
          background: "./src/background.js",
        },
        output: {
          ...webpackConfig.output,
          filename: "static/js/[name].js",
          assetModuleFilename: "static/css1/[name].css",
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
      };
    },
  },
};
