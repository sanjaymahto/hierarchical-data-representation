module.exports = (config) => {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai'],
    files: [
      'test.webpack.js',
    ],
    preprocessors: {
      'test.webpack.js': ['webpack'],
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              query: {
                presets: ['es2015'],
              },
            },
            exclude: /node_modules/,
          },
        ],
      },
    },
    exclude: [
      '**/*.swp',
    ],
    webpackMiddleware: {
      stats: 'errors-only',
    },
    reporters: ['progress', 'html'],
    // the default configuration
    htmlReporter: {
      outputDir: 'Unit-tests-Result', // where to put the reports
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: false, // name files instead of creating sub-directories
      pageTitle: null, // page title for reports; browser info by default
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
      reportName: 'Test-Report', // report summary filename; browser info by default
      // experimental
      preserveDescribeNesting: false, // folded suites stay folded
      foldAll: false, // reports start folded (only with preserveDescribeNesting)
    },
    port: 8081,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    singleRun: false,
    concurrency: Infinity,
  });
};
