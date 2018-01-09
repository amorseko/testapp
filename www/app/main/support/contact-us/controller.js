(function _AppMainSupportContactUsController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.support.contact-us.controller:MainSupportContactUsController
   *
   * @requires $ionicHistory
   * @requires $q
   * @requires analytic
   * @requires app.providers.graphql.service:graphql
   * @requires app.providers.toast.factory:toast
   *
   * @description
   * Contact us controller.
   */
  function MainSupportContactUsController($ionicHistory, $q, analytic, graphql, toast) {
    var vm = this;

    vm.isLoading = false;
    vm.submit = submit;

    /**
     * @ngdoc function
     * @name app.main.support.contact-us.controller#submit
     * @methodOf app.main.support.contact-us.controller:MainSupportContactUsController
     *
     * @description
     * Processing send inquiry.
     *  If success, a success toast will be shown.
     *  Otherwise, an error toast will be shown.
     *
     * @param {Object} variables Object describing the inquiry.
     *  The object has following properties:
     *  - **content** - `{string}` - Content of the inquiry.
     */
    function submit(variables) {
      var query = [
        'mutation AddInquiry($content: String!) {',
        '  addInquiry(content: $content) {',
        '    _id',
        '  }',
        '}'
      ].join('');

      $q.resolve(true)
        .then(function resolve() {
          vm.isLoading = true;
          return graphql(query, variables);
        })
        .then(function resolve(res) {
          var result = angular.copy(res);
          return result && result.addInquiry && result.addInquiry._id;
        })
        .then(function resolve(res) {
          if (!(res)) throw new Error();
          toast.longBottom('Pesan berhasil dikirim');
          analytic.addInquiry();
          $ionicHistory.goBack();
        })
        .catch(function reject(err) {
          toast.shortBottom(err.toString());
        })
        .finally(function end() {
          vm.isLoading = false;
        });
    }
  }

  angular.module('app.main.support.contact-us').controller('MainSupportContactUsController', MainSupportContactUsController);
}());
