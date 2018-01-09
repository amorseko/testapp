(function _AppMainSupportTermsConditionRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.support.terms-condition', {
      url: '/terms-condition',
      views: {
        'menuContent@app.main.support': {
          templateUrl: 'app/main/support/terms-condition/index.html',
          controller: 'MainSupportTermsConditionController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/support/terms-condition/controller.js');
        }
      }
    });
  }

  angular.module('app.main.support.terms-condition').config(route);
}());
