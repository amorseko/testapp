(function _AppMainAdmedikaBenefitRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.admedika.benefit', {
      url: '/benefit',
      views: {
        'menuContent@app.main.admedika': {
          templateUrl: 'app/main/admedika/benefit/index.html',
          controller: 'MainAdmedikaBenefitController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/admedika/benefit/controller.js');
        }
      }
    });
  }

  angular.module('app.main.admedika.benefit').config(route);
}());
