const path = require("path");

module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              modifyVars: {
                "primary-color": "#008b94",
                "link-color": "#008b94",
                "layout-header-background": "#000b0c"
              },
              javascriptEnabled: true
            }
          }
        }
      ],
      include: path.resolve(__dirname, "../")
    });

    // Return the altered config
    return config;
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"]
};
