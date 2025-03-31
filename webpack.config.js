const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add .ios.js to extensions
  config.resolve.extensions = [
    '.ios.js',
    '.ios.jsx',
    '.ios.ts',
    '.ios.tsx',
    '.web.js',
    '.web.jsx',
    '.web.ts',
    '.web.tsx',
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
  ];

  return config;
}; 