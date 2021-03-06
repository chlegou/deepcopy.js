const path = require('path');

module.exports = function(config) {
  const { file } = config;

  if (!file) {
    throw new Error('file is not found');
  }

  config.set({
    basePath: __dirname,
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },
    customLaunchers: {
      // NOTE: https://docs.travis-ci.com/user/chrome#Sandboxing
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        chromeDataDir: path.resolve(__dirname, '.chrome'),
        flags: ['--no-sandbox']
      }
    },
    files: [
      {
        pattern: require.resolve('power-assert/build/power-assert'),
        watched: false
      },
      {
        pattern: file,
        watched: true
      },
      {
        pattern: 'test/unit/**/*.js',
        watched: true
      }
    ],
    frameworks: ['mocha'],
    reporters: ['dots']
  });
};
