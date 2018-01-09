(function _AppAuthForgetPasswordController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.auth.forget-password.controller:AuthForgetPasswordController
   *
   * @requires $ionicPopup
   * @requires $state
   * @requires $q
   * @requires app.providers.graphql.service:graphql
   *
   * @description
   * Forget and reset password controller.
   */
  function AuthForgetPasswordController($ionicPopup, $state, $q, graphql) {
    var vm = this;

    vm.isLoading = false;
    vm.submit = submit;

    /**
     * @ngdoc function
     * @name app.auth.forget-password.controller#submit
     * @methodOf app.auth.forget-password.controller:AuthForgetPasswordController
     *
     * @description
     * Processing forget and reset password.
     *  If success, user will be redirected to forget password success page.
     *  Otherwise, an error popup will be shown.
     *
     * @param {Object} variables Object describing the user credentials.
     *  The object has following properties:
     *  - **email** - `{string}` - Email of the user.
     */
    function submit(variables) {
      var query = [
        'mutation ForgetPassword($email: String!) {',
        '  forgetPassword(email: $email)',
        '}'
      ].join('');

      $q.resolve(true)
        .then(function resolve() {
          vm.isLoading = true;
          return graphql(query, variables);
        })
        .then(function resolve(res) {
          var result = angular.copy(res);
          return result && result.forgetPassword;
        })
        .then(function resolve(res) {
          if (!(res)) throw new Error();
          $state.go('app.auth.forget-password-success');
        })
        .catch(function reject() {
          $ionicPopup.alert({
            templateUrl: 'app/auth/forget-password/modal/forget-password-error.html',
            cssClass: 'mp-popup-style',
            okText: 'Close'
          });
        })
        .finally(function end() {
          vm.isLoading = false;
        });
    }
  }

  angular.module('app.auth.forget-password').controller('AuthForgetPasswordController', AuthForgetPasswordController);
}());
