(function _AppMainSupportContactUsRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.support.contact-us', {
      url: '/contact-us',
      views: {
        'menuContent@app.main.support': {
          templateUrl: 'app/main/support/contact-us/index.html',
          controller: 'MainSupportContactUsController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/support/contact-us/controller.js');
        }
      }
    });
  }

  angular.module('app.main.support.contact-us').config(route);
}());
