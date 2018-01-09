(function _AppMainSupportAboutRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.support.about', {
      url: '/about',
      views: {
        'menuContent@app.main.support': {
          templateUrl: 'app/main/support/about/index.html',
          controller: 'MainSupportAboutController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/support/about/controller.js');
        }
      }
    });
  }

  angular.module('app.main.support.about').config(route);
}());
