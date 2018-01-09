(function _AppMainAdmedikaMemberController_() {
  'use strict';

   /**
    * @ngdoc controller
    * @name app.main.admedika.member.controller:MainAdmedikaMemberController
    *
    * @requires $ionicHistory
    * @requires $rootScope
    * @requires $scope
    * @requires $timeout
    * @requires app.providers.graphql.service:graphql
    * @requires app.providers.toast.factory:toast
    * @requires EVENT
    *
    * @description
    * AdMedika member controller.
    */

  function MainAdmedikaMemberController(
    $ionicHistory, $rootScope, $scope, $timeout, graphql, toast, EVENT, $ionicPlatform, $state
  ) {
    var $root = $rootScope;
    var vm = this;
    var deregisterBackButtonAction = $ionicPlatform.registerBackButtonAction(customBackButton, 101);

    function customBackButton() {
      switch ($state.current.name) {
        case 'app.main.admedika.member':
          $state.go('app.main.home');
          break;
        case 'app.main.admedika.connect':
        case 'app.main.admedika.benefit':
        case 'app.main.admedika.claim':
        case 'app.main.admedika.provider':
          $state.go('app.main.admedika.member');
          break;
        default:
          // console.log($state.current.name);
          $ionicHistory.goBack();
          // toast.shortBottom($state.current.name);
      }
    }

    function customSoftBack() {
      customBackButton();
    }

    function destroyCustomHardBackButton() {
      deregisterBackButtonAction();
    }

    // customBackButton = customBackButton.bind(null, $state)

    // override default behaviour
    $root.$ionicGoBack = customSoftBack;

    // Effectively making the callback applied in this particular controller
    $scope.$on('$destroy', destroyCustomHardBackButton);

    vm.back = $ionicHistory.goBack;
    vm.getMember = getMember;
    vm.hasMember = false;
    vm.parseBenefits = parseBenefits;
    vm.parseBirthdate = parseBirthdate;
    vm.profile = {};

    $root.$on(EVENT.PHOTO.CHANGED, function changed(event, args) {
      $scope.$evalAsync(function sync() {
        angular.merge(vm.profile, { photo: args });
      });
    });

    /**
     * @ngdoc function
     * @name app.main.admedika.member.controller#getMember
     * @methodOf app.main.admedika.member.controller:MainAdmedikaMemberController
     *
     * @description
     * Get member details of the user.
     */
    function getMember() {
      var query = [
        'query Member {',
        '  profile {',
        '    _id',
        '    email',
        '    birthday',
        '    id',
        '    photo',
        '    admedika {',
        '      cardNumber',
        '      plans {',
        '        planType',
        '      }',
        '      member {',
        '        fullName',
        '        payorInfo',
        '        corporateInfo',
        '        policyNumber',
        '        dateOfBirth',
        '        memberId',
        '        memberType',
        '        planType',
        '        bpjsId',
        '        faskesLevel1',
        '        bpjsType',
        '        helpLine',
        '      }',
        '    }',
        '  }',
        '}'
      ].join('');

      graphql(query)
        .then(function resolve(res) {
          angular.copy(res.profile, vm.profile);
        })
        .catch(function reject() {
          toast.shortBottom('Failed to get member info');
        })
        .finally(function done() {
          vm.hasMember = true;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.member.controller#parseBenefits
     * @methodOf app.main.admedika.member.controller:MainAdmedikaMemberController
     *
     * @description
     * Concat benefit with `,` separator.
     *
     * @param {Array} benefits Array of benefits.
     *
     * @returns {string} formatted benefits.
     */
    function parseBenefits(benefits) {
      return benefits && benefits.map(function onEach(benefit) {
        return Object.prototype.hasOwnProperty.call(benefit, 'planType') && benefit.planType;
      }).filter(Boolean).join(', ');
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.member.controller#parseBirthdate
     * @methodOf app.main.admedika.member.controller:MainAdmedikaMemberController
     *
     * @description
     * Parse birthdate.
     *
     * @param {string} date Date of birth.
     *
     * @returns {string} formatted birthdate.
     */
    function parseBirthdate(date) {
      if (date && moment(date).isValid()) {
        return moment(date).format('DD MMM YYYY');
      }
      return date;
    }
  }

  angular.module('app.main.admedika.member').controller('MainAdmedikaMemberController', MainAdmedikaMemberController);
}());
