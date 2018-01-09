(function _AppMainProfileRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.profile', {
      url: '/profile',
      abstract: true,
      views: {
        'menuContent@app.main': {
          template: '<ion-nav-view name="menuContent"></ion-nav-view>'
        }
      }
    });
  }

  angular.module('app.main.profile').config(route);
}());
