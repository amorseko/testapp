(function _AppMainAdmedikaRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.admedika', {
      url: '/admedika',
      abstract: true,
      views: {
        'menuContent@app.main': {
          template: '<ion-nav-view name="menuContent"></ion-nav-view>'
        }
      }
    });
  }

  angular.module('app.main.admedika').config(route);
}());
