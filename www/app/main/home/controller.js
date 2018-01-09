(function _AppMainHomeController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.home.controller:MainHomeController
   *
   * @requires $scope
   * @requires $state
   * @requires $timeout
   * @requires app.providers.graphql.service:graphql
   * @requires app.providers.toast.factory:toast
   *
   * @description
   * Home controller.
   */
  function MainHomeController($scope, $timeout, graphql, member) {
    var vm = this;

    vm.getMember = getMember;
    vm.hasMember = false;
    vm.profile = {};

    /**
     * @ngdoc function
     * @name app.main.home.controller#getMember
     * @methodOf app.main.home.controller:MainHomeController
     *
     * @description
     * Get user profile.
     */
    function getMember() {
      member.getData().then(function resolve(res) {
        if (!(res && res.profile) && !(member.hasData)) {
          $timeout(getMember, 1234);
        } else {
          vm.hasMember = true;
          angular.copy(res.profile, vm.profile);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      });
    }
  }

  angular.module('app.main.home').controller('MainHomeController', MainHomeController);
}());
