(function _AppMainProfileChangePasswordController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.profile.change-password.controller:MainProfileChangePasswordController
   *
   * @requires $ionicHistory
   * @requires $state
   * @requires $q
   * @requires app.providers.auth.service:auth
   * @requires app.providers.graphql.service:graphql
   * @requires app.providers.toast.factory:toast
   *
   * @description
   * Change password controller.
   */
  function MainProfileChangePasswordController($ionicHistory, $state, $q, auth, graphql, toast) {
    var vm = this;

    vm.isLoading = false;
    vm.submit = submit;

    /**
     * @ngdoc function
     * @name app.main.profile.change-password.controller#submit
     * @methodOf app.main.profile.change-password.controller:MainProfileChangePasswordController
     *
     * @description
     * Processing change password.
     *  If success, user will be redirected to login page.
     *  Otherwise, an error toast will be shown.
     *
     * @param {Object} variables Object describing the user credentials.
     *  The object has following properties:
     *  - **password** - `{string}` - New password of the user.
     *  - **passwordConfirmation** - `{string}` - New password confirmation of the user.
     */
    function submit(variables) {
      var query = [
        'mutation ChangePassword($password: String!, $passwordConfirmation: String!) {',
        '  changePassword(password: $password, passwordConfirmation: $passwordConfirmation)',
        '}'
      ].join('');

      $q.resolve(true)
        .then(function resolve() {
          if (!(variables.password.length > 5)) {
            throw new Error('Password minimal 6 karakter');
          }
          if (!(variables.password === variables.passwordConfirmation)) {
            throw new Error('Konfirmasi password tidak sesuai dengan password');
          }
          vm.isLoading = true;
          return graphql(query, variables);
        })
        .then(function resolve() {
          return auth.logout();
        })
        .then(function resolve() {
          return $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true,
            historyRoot: true
          });
        })
        .then(function resolve() {
          $state.go('app.auth.login');
          toast.longBottom('Password berhasil diubah. Silahkan login kembali.');
        })
        .catch(function reject(err) {
          toast.shortBottom(err.toString().replace('Error: ', ''));
        })
        .finally(function end() {
          vm.isLoading = false;
        });
    }
  }

  angular.module('app.main.profile.change-password').controller('MainProfileChangePasswordController', MainProfileChangePasswordController);
}());
