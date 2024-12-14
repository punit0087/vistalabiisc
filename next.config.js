module.exports = {
  webpack: (config, { isServer }) => {
    // Add HTML loader rule
    config.module.rules.push({
      test: /\.html$/,
      use: "html-loader",
    });

    return config;
  },
};
