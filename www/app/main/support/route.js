(function _AppMainSupportRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.support', {
      url: '/support',
      abstract: true,
      views: {
        'menuContent@app.main': {
          template: '<ion-nav-view name="menuContent"></ion-nav-view>'
        }
      }
    });
  }

  angular.module('app.main.support').config(route);
}());
