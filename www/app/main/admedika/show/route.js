(function _AppMainAdmedikaShowRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.admedika.show', {
      url: '/show',
      views: {
        'menuContent@app.main.admedika': {
          templateUrl: 'app/main/admedika/show/index.html',
          controller: 'MainAdmedikaMemberController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/admedika/member/controller.js');
        }
      }
    });
  }

  angular.module('app.main.admedika.show').config(route);
}());
