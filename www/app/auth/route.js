(function _AppAuthRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.auth', {
      url: '/auth',
      abstract: true,
      views: {
        'content@app': {
          templateUrl: 'app/auth/index.html'
        }
      }
    });
  }

  angular.module('app.auth').config(route);
}());
