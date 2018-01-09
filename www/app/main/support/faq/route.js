(function _AppMainSupportFaqRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.support.faq', {
      url: '/faq',
      views: {
        'menuContent@app.main.support': {
          templateUrl: 'app/main/support/faq/index.html',
          controller: 'MainSupportFaqController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/support/faq/controller.js');
        }
      }
    });
  }

  angular.module('app.main.support.faq').config(route);
}());
