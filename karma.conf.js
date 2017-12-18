// Karma configuration
// Generated on Wed Dec 13 2017 18:06:04 GMT+0400 (RTZ 3 (зима))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './test',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../bower_components/jquery/dist/jquery.js',
      '../bower_components/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../bower_components/jquery-minicolors/jquery.minicolors.js',
      '../bower_components/angular-minicolors/angular-minicolors.js',
      '../bower_components/moment/min/moment-with-locales.js',
      '../bower_components/angular-moment/angular-moment.js',
      '../bower_components/checklist-model/checklist-model.js',
      '../bower_components/angular-cookies/angular-cookies.js',
      '../bower_components/angular-ui-router/release/angular-ui-router.js',
      '../bower_components/angular-ui-mask/dist/mask.js',
      '../bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      '../bower_components/angular-translate/angular-translate.js',
      '../bower_components/bootstrap/dist/js/bootstrap.js',
      '../bower_components/angular-bootstrap/ui-bootstrap.min.js',
      '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      '../bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',
      '../bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      '../dist/ue.min.js',
       '**/*.spec.js'],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.spec.js': ['webpack']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    webpack: configureWebpack()
  });

  function configureWebpack(webpackConfigFunction) {
    return [{
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              plugins: ['transform-runtime'],
              presets: ['es2015']
            }
          }
        ]
      }
    }];
  }
}
