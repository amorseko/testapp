(function _AppMainController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.controller:MainController
   *
   * @requires $q
   * @requires $scope
   * @requires $state
   * @requires $rootScope
   * @requires $timeout
   * @requires app.providers.graphql.service:graphql
   * @requires app.providers.toast.factory:toast
   * @requires EVENT
   *
   * @description
   * Main controller
   */
  function MainController(
    $q, $scope, $state, $rootScope, $timeout,
    graphql, toast, EVENT
  ) {
    var $this = $rootScope;
    var vm = this;

    vm.isLoading = false;
    vm.profile = {};

    getProfile();

    $this.$on(EVENT.PHOTO.CHANGED, function changed(event, args) {
      $scope.$evalAsync(function sync() {
        angular.merge(vm.profile, { photo: args });
      });
    });

    /**
     * @ngdoc function
     * @name app.main.controller#getProfile
     * @methodOf app.main.controller:MainController
     *
     * @description
     * Get user profile.
     */
    function getProfile() {
      var query = [
        'query Profile {',
        '  profile {',
        '    name',
        '    photo',
        '    admedika {',
        '      cardNumber',
        '    }',
        '  }',
        '}'
      ].join('');

      $q.resolve(true)
        .then(function resolve() {
          vm.isLoading = true;
          return graphql(query);
        })
        .then(function resolve(res) {
          var result = angular.copy(res);
          return result && result.profile;
        })
        .then(function resolve(res) {
          if (res) angular.copy(res, vm.profile);
          else $this.$root.logout();
        })
        .finally(function done() {
          vm.isLoading = false;
        });
    }
  }

  angular.module('app.main').controller('MainController', MainController);
}());
