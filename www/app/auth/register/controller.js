(function _AppAuthRegisterController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.auth.register.controller:AuthRegisterController
   *
   * @requires $filter
   * @requires $ionicModal
   * @requires $ionicPopup
   * @requires $scope
   * @requires $state
   * @requires $q
   * @requires app.providers.analytic.service:analytic
   * @requires app.providers.datepicker.service:datepicker
   * @requires app.providers.graphql.service:graphql
   *
   * @description
   * Register controller.
   */
  function AuthRegisterController(
    $filter, $ionicModal, $ionicPopup, $scope, $state, $stateParams, $q,
    analytic, datepicker, graphql
  ) {
    var vm = this;
    var char = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var isAgree = false;
    var agreement;

    vm.code = _.sample(char.split(''), 4).join('');
    vm.getBirthday = getBirthday;
    vm.help = help;
    vm.isLoading = false;
    vm.submit = submit;
    vm.params = angular.copy($stateParams);

    /**
     * @ngdoc function
     * @name app.auth.register.controller#getBirthday
     * @methodOf app.auth.register.controller:AuthRegisterController
     *
     * @description
     * This function will invoke datepicker and assign birthday of parameter with selected date.
     *
     * @param {Object} data Object describing the user credentials.
     */
    function getBirthday(data) {
      datepicker.openDatePicker({
        closeOnSelect: true,
        to: new Date(),
        inputDate: new Date(1980, 0, 1),
        callback: function on(val) {
          angular.merge(data, { birthday: $filter('date')(val, 'd MMM yyyy') });
        }
      });
    }

    /**
     * @ngdoc function
     * @name app.auth.register.controller#help
     * @methodOf app.auth.register.controller:AuthRegisterController
     *
     * @description
     * This function will invoke popup containing information about AdMedika card number.
     */
    function help() {
      var scope = $scope;

      scope.data = {};
      scope.data.type = 'KARTU ADMEDIKA';
      scope.data.message = 'Nomor kartu tertera di kartu AdMedika Anda (16 Digit)';

      showAlert(scope);
    }

    /**
     * @ngdoc function
     * @name app.auth.register.controller#showAlert
     * @methodOf app.auth.register.controller:AuthRegisterController
     *
     * @description
     * This function will invoke popup containing info, success or error information.
     *
     * @param {Object} scope Object describing the information.
     *  The object has following properties:
     *  - **data** - `{Object}` - Data of the information.
     *    - **type** - `{string}` - Type of the information.
     *    - **message** - `{string}` - Message of the information.
     */
    function showAlert(scope) {
      return $ionicPopup.alert({
        scope: scope,
        templateUrl: 'app/auth/register/modal/register-error.html',
        cssClass: 'mp-popup-style',
        okText: 'OK',
        okType: 'button-default'
      });
    }

    /**
     * @ngdoc function
     * @name app.auth.register.controller#submit
     * @methodOf app.auth.register.controller:AuthRegisterController
     *
     * @description
     * This function will validate user credentials before processing the registration.
     *  If success, registration will be processed.
     *  Otherwise, an error popup will be shown.
     *
     * @param {Object} variables Object describing the user credentials.
     *  The object has following properties:
     *  - **birthday** - `{string}` - Birthday of the user.
     *  - **cardNumber** - `{string=}` - AdMedika card number of the user.
     *  - **email** - `{string}` - Email of the user.
     *  - **gender** - `{string}` - Gender of the user (male|female).
     *  - **name** - `{string}` - Name of the user.
     *  - **password** - `{string}` - Password of the user.
     *  - **passwordConfirmation** - `{string}` - Password confirmation of the user.
     *  - **phone** - `{string}` - Phone number of the user.
     */
    function submit(variables) {
      var scope = $scope;

      scope.data = {};

      $q.resolve(true)
        .then(function resolve() {
          if (!(variables.name)) {
            throw new Error('INFORMASI :: Isi nama lengkap anda');
          }
          if (!(variables.birthday)) {
            throw new Error('INFORMASI :: Isi tanggal lahir anda');
          }
          if (!(variables.gender)) {
            throw new Error('INFORMASI :: Isi jenis kelamin anda');
          }
          if (!(variables.phone)) {
            throw new Error('INFORMASI :: Isi nomor handphone anda');
          }
          if (!(variables.email)) {
            throw new Error('INFORMASI :: Isi email anda');
          }
          if (!(variables.password)) {
            throw new Error('INFORMASI :: Isi password anda');
          }
          if (!(variables.passwordConfirmation)) {
            throw new Error('INFORMASI :: Isi konfirmasi password anda');
          }
          if (!(variables.code)) {
            throw new Error('INFORMASI :: Kode belum diisi');
          }
          if (!(/^[0-9]*$/.test(variables.phone))) {
            throw new Error('PERHATIAN :: Nomor HP harus berupa angka');
          }
          if (!(variables.phone.length > 9 && variables.phone.length < 13)) {
            throw new Error('PERHATIAN :: Nomor HP 10-12 karakter');
          }
          if (!(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(variables.email))) {
            throw new Error('PERHATIAN :: Format alamat email salah');
          }
          if (!(variables.password.length > 5)) {
            throw new Error('PERHATIAN :: Password minimal 6 karakter');
          }
          if (!(variables.password === variables.passwordConfirmation)) {
            throw new Error('PERHATIAN :: Konfirmasi password tidak cocok');
          }
          if (!(vm.code === variables.code)) {
            throw new Error('PERHATIAN :: Kode salah');
          }
          if (variables.cardNumber) {
            if (!(variables.cardNumber.length === 16)) {
              throw new Error('PERHATIAN :: Nomor Kartu AdMedika harus 16 Digit');
            }
            if (!(/^[0-9]*$/.test(variables.cardNumber))) {
              throw new Error('PERHATIAN :: Nomor kartu AdMedika harus berupa angka');
            }
          }
          return $ionicModal.fromTemplateUrl('app/auth/register/modal/agreement.html', {
            scope: scope,
            animation: 'slide-in-up'
          });
        })
        .then(function resolve(modal) {
          scope.modal = modal;
          scope.modal.register = register;

          if (agreement) scope.modal.agreement = agreement;
          else scope.modal.getTerms = getTerms;

          if (isAgree) register();
          else scope.modal.show();
        })
        .catch(function reject(err) {
          var message = err.toString().replace('Error:', '');
          var type = message.split(' :: ');

          if (type.length) {
            scope.data.type = type[0];
            scope.data.message = type[1];
          }

          showAlert(scope);
        });

      /**
       * @ngdoc function
       * @name app.auth.register.controller#getTerms
       * @methodOf app.auth.register.controller:AuthRegisterController
       *
       * @description
       * Get terms and condition content.
       *
       * @returns {Object} Object describing the terms content.
       */
      function getTerms() {
        var query = [
          'query Supports($match: String, $limit: Int) {',
          '  supports(match: $match, limit: $limit) {',
          '    _id',
          '    subtitle',
          '    content',
          '  }',
          '}'
        ].join('');
        var variable = {
          limit: 1,
          match: angular.toJson({ name: { $regex: 'terms-condition', $options: 'i' } })
        };

        graphql(query, variable)
          .then(function resolve(res) {
            var result = angular.copy(res);
            return result && result.supports && result.supports.length && result.supports.pop();
          })
          .then(function resolve(res) {
            if (res) {
              agreement = res;
              scope.modal.agreement = agreement;
            }
          })
          .finally(function done() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
      }

      /**
       * @ngdoc function
       * @name app.auth.register.controller#register
       * @methodOf app.auth.register.controller:AuthRegisterController
       *
       * @description
       * Processing register new user.
       *  If success, user will be redirected to activate page.
       *  Otherwise, an error popup will be shown.
       */
      function register() {
        var query = [
          'mutation Register($birthday: String!, $cardNumber: String, $email : String!, $gender : String!, $name : String!, $password: String!, $passwordConfirmation: String!, $phone: String!) {',
          '  register(birthday: $birthday, cardNumber: $cardNumber, email: $email, gender: $gender, name: $name, password: $password, passwordConfirmation: $passwordConfirmation, phone: $phone) {',
          '    _id',
          '  }',
          '}'
        ].join('');

        $q.resolve(true)
          .then(function resolve() {
            vm.isLoading = true;
            return scope.modal.remove();
          })
          .then(function resolve() {
            return graphql(query, _.omit(variables, 'code'));
          })
          .then(function resolve(res) {
            var result = angular.copy(res);
            return result && result.register && result.register._id;
          })
          .then(function resolve(res) {
            if (!(res)) throw new Error();
            analytic.addRegister(_.pick(variables, 'email'));
            $state.go('app.auth.activate');
          })
          .catch(function reject(err) {
            scope.data.message = err.toString().replace('Error:', '');
            showAlert(scope);
          })
          .finally(function end() {
            isAgree = true;
            vm.isLoading = false;
          });
      }
    }
  }
  angular.module('app.auth.register').controller('AuthRegisterController', AuthRegisterController);
}());
