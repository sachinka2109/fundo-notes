module.exports = {
    presets: [
      [
        "@babel/preset-env", // Transpile modern JavaScript to be compatible with older browsers
        {
          targets: {
            node: "current",
          },
          modules: "auto", // Use "auto" to enable ESM support
        },
      ],
      "@babel/preset-react",
    ],
    plugins: [],
};