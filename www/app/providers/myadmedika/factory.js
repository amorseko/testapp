(function _AppProvidersMyAdMedikaFactory_() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.providers.myadmedika.factory:myadmedika
   *
   * @requires $q
   * @requires $state
   * @requires $timeout
   * @requires $window
   * @requires app.providers.graphql
   * @requires app.providers.toast
   *
   * @description
   * MyAdMedika factory.
   */
  function myadmedika($q, $state, $timeout, $window, graphql, toast) {
    var config;
    var location = $window.location;
    var Platform = $window.ionic && $window.ionic.Platform;
    var query = [
      'query AppsConfig {',
      '  config {',
      '    apps {',
      '      android',
      '      ios',
      '      browser',
      '    }',
      '  }',
      '}'
    ].join('');

    graphql(query).then(function resolve(res) {
      var result = angular.copy(res);
      return result && result.config && result.config.apps;
    }).then(function resolve(res) {
      config = angular.copy(res);
    });

    function check() {
      $q.when(config)
        .then(function resolve(res) {
          if (!(res)) throw new Error('Please wait...');
          return (Platform.isIOS() || Platform.isIPad());
        })
        .then(function resolve(res) {
          if (res) return config.ios;
          if (Platform.isAndroid()) return config.android;
          return config.browser;
        })
        .then(function resolve(res) {
          location.href = res;
        })
        .catch(function reject(err) {
          toast.shortBottom(err.toString().replace('Error:', ''));
          $timeout(check, 2345);
        });
    }

    function open(isMember) {
      if (isMember) $state.go('app.main.admedika.member');
      else $state.go('app.main.admedika.connect');
    }

    return {
      check: check,
      open: open
    };
  }

  angular
    .module('app.providers.myadmedika')
      .factory('myadmedika', myadmedika);
}());
