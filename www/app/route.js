(function _AppRoute_() {
  'use strict';

  function route($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
      url: '',
      abstract: true,
      views: {
        '': {
          template: '<ion-nav-view name="content"></ion-nav-view>'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/auth/login');
  }

  angular.module('app').config(route);
}());
