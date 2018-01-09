(function _AppConfig_() {
  'use strict';

  function analytic(analyticProvider, ANALYTIC) {
    analyticProvider.set({
      enable: ANALYTIC.ENABLE
    });
  }

  function graphql(graphqlProvider, GRAPHQL) {
    graphqlProvider.set({
      url: GRAPHQL.URL
    });
  }

  function imageFallback(imageFallbackProvider, IMAGE) {
    imageFallbackProvider.set({
      image: IMAGE.AVATAR
    });
  }

  function ionicConfig($ionicConfigProvider) {
    $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.spinner.icon('circles');
  }

  function log($logProvider) {
    $logProvider.debugEnabled(true);
  }

  angular
    .module('app')
      .config(analytic)
      .config(graphql)
      .config(imageFallback)
      .config(ionicConfig)
      .config(log);
}());
