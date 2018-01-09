(function _AppMainSupportFaqController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.support.faq.controller:MainSupportFaqController
   *
   * @requires $scope
   * @requires app.providers.graphql.service:graphql
   *
   * @description
   * FAQ controller.
   */
  function MainSupportFaqController($scope, graphql) {
    var vm = this;

    vm.getPage = getPage;
    vm.hasPage = false;
    vm.page = {};

    /**
     * @ngdoc function
     * @name app.main.support.faq.controller#getPage
     * @methodOf app.main.support.faq.controller:MainSupportFaqController
     *
     * @description
     * Get faq page.
     */
    function getPage() {
      var query = [
        'query Supports($match: String, $limit: Int) {',
        '  supports(match: $match, limit: $limit) {',
        '    _id',
        '    title',
        '    subtitle',
        '    content',
        '  }',
        '}'
      ].join('');
      var variables = {
        limit: 1,
        match: angular.toJson({ name: { $regex: 'faq', $options: 'i' } })
      };

      graphql(query, variables)
        .then(function resolve(res) {
          var result = angular.copy(res);
          return result && result.supports && result.supports.length && result.supports.pop();
        })
        .then(function resolve(res) {
          angular.copy(res, vm.page);
        })
        .finally(function end() {
          vm.hasPage = true;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
  }

  angular.module('app.main.support.faq').controller('MainSupportFaqController', MainSupportFaqController);
}());
