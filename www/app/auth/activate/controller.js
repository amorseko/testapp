(function _AppAuthActivateController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.auth.activate.controller:AuthActivateController
   *
   * @requires $ionicPopup
   * @requires $state
   * @requires $q
   * @requires app.providers.graphql.service:graphql
   * @requires app.providers.toast.factory:toast
   *
   * @description
   * Activate account controller.
   */
  function AuthActivateController($ionicPopup, $state, $q, graphql, toast) {
    var vm = this;

    vm.isLoading = false;
    vm.submit = submit;

    /**
     * @ngdoc method
     * @name app.auth.activate.controller#submit
     * @methodOf app.auth.activate.controller:AuthActivateController
     *
     * @description
     * Processing activate account.
     *  If success, user will be redirected to login page.
     *  Otherwise, an error popup will be shown.
     *
     * @param {Object} variables Object describing the user credentials.
     *  The object has following properties:
     *  - **code** - `{string}` - Activation code of the user.
     */
    function submit(variables) {
      var query = [
        'mutation Activate($code: String!) {',
        '  activate(code: $code) {',
        '    auth {',
        '      isActive',
        '    }',
        '  }',
        '}'
      ].join('');

      $q.resolve(true)
        .then(function resolve() {
          vm.isLoading = true;
          return graphql(query, variables);
        })
        .then(function resolve(res) {
          var data = angular.copy(res);
          return data && data.activate && data.activate.auth && data.activate.auth.isActive;
        })
        .then(function resolve(res) {
          if (!(res)) throw new Error();
          $state.go('app.auth.login');
          toast.longBottom('Akun anda telah aktif. Silahkan login.');
        })
        .catch(function reject() {
          $ionicPopup.alert({
            templateUrl: 'app/auth/activate/modal/activation-code-error.html',
            cssClass: 'mp-popup-style',
            okText: 'Close'
          });
        })
        .finally(function end() {
          vm.isLoading = false;
        });
    }
  }

  angular.module('app.auth.activate').controller('AuthActivateController', AuthActivateController);
}());
