(function _AppMainAdmedikaMemberRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.admedika.member', {
      url: '/member',
      views: {
        'menuContent@app.main.admedika': {
          templateUrl: 'app/main/admedika/member/index.html',
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

  angular.module('app.main.admedika.member').config(route);
}());
