(function _AppMainSupportTermsConditionController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.support.terms-condition.controller:MainSupportTermsConditionController
   *
   * @requires $scope
   * @requires app.providers.graphql.service:graphql
   *
   * @description
   * Terms and condition controller.
   */
  function MainSupportTermsConditionController($scope, graphql) {
    var vm = this;

    vm.getPage = getPage;
    vm.hasPage = false;
    vm.page = {};

    /**
     * @ngdoc function
     * @name app.main.support.terms-condition.controller#getPage
     * @methodOf app.main.support.terms-condition.controller:MainSupportTermsConditionController
     *
     * @description
     * Get terms and condition page.
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
        match: angular.toJson({ name: { $regex: 'terms-condition', $options: 'i' } })
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

  angular.module('app.main.support.terms-condition').controller('MainSupportTermsConditionController', MainSupportTermsConditionController);
}());
