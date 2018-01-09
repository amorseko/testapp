(function _AppMainAdmedikaClaimController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.admedika.claim.controller:MainAdmedikaClaimController
   *
   * @requires $filter
   * @requires $ionicPopup
   * @requires $scope
   * @requires app.providers.datepicker.service:datepicker
   * @requires app.providers.graphql.service:graphql
   * @requires app.providers.toast.factory:toast
   *
   * @description
   * AdMedika claim controller.
   */
  function MainAdmedikaClaimController($filter, $ionicPopup, $scope, datepicker, graphql, toast) {
    var vm = this;
    var claim = {};

    vm.change = change;
    vm.claims = [];
    vm.getClaims = getClaims;
    vm.hasClaims = false;
    vm.parseDate = parseDate;
    vm.profile = {};
    vm.range = range;
    vm.sort = sort;

    claim.skip = 0;
    claim.limit = 5;
    claim.sort = '-dischargeDate';
    claim.planId = '*';
    claim.startDate = '';
    claim.endDate = '';

    getPlans();

    /**
     * @ngdoc function
     * @name app.main.admedika.claim.controller#getPlans
     * @methodOf app.main.admedika.claim.controller:MainAdmedikaClaimController
     *
     * @description
     * Get plans of the member.
     */
    function getPlans() {
      var query = [
        'query Plans {',
        '  profile {',
        '    admedika {',
        '      plans {',
        '        planId',
        '        planType',
        '      }',
        '    }',
        '  }',
        '}'
      ].join('');

      return graphql(query)
        .then(function resolve(res) {
          angular.copy(res.profile, vm.profile);
        })
        .catch(function reject() {
          toast.shortBottom('Failed to get plans');
        });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.claim.controller#change
     * @methodOf app.main.admedika.claim.controller:MainAdmedikaClaimController
     *
     * @description
     * Get claims of the member based on selected plan.
     *
     * @param {string} planId ID of the plan.
     */
    function change(planId) {
      claim.skip = 0;
      claim.planId = planId;

      vm.claims = [];
      vm.hasClaims = false;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.claim.controller#getClaims
     * @methodOf app.main.admedika.claim.controller:MainAdmedikaClaimController
     *
     * @description
     * Get claims of the member.
     */
    function getClaims() {
      var select = [
        'query Claim($planId: String, $skip: Int, $limit: Int, $sort: String, $startDate: String, $endDate: String) {',
        '  profile {',
        '    admedika {',
        '      claims(planId: $planId, skip: $skip, limit: $limit, sort: $sort, startDate: $startDate, endDate: $endDate) {',
        '        claimId',
        '        status',
        '        claimType',
        '        admissionDate',
        '        dischargeDate',
        '        planType',
        '        diagnosis',
        '        providerName',
        '        incured',
        '        excess',
        '        approved',
        '        remarks',
        '      }',
        '    }',
        '  }',
        '}'
      ].join('');

      graphql(select, claim)
        .then(function resolve(res) {
          var data = angular.copy(res);
          return data && data.profile && data.profile.admedika && data.profile.admedika.claims;
        })
        .then(function resolve(res) {
          return res && res.length ? res : [];
        })
        .then(function resolve(res) {
          vm.claims = vm.claims.concat(_.filter(res, 'claimId'));
          vm.hasClaims = claim.limit > res.length;

          claim.skip += claim.limit;
        })
        .catch(function reject() {
          toast.shortBottom('Failed to get claim history');
        })
        .finally(function done() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.claim.controller#parseDate
     * @methodOf app.main.admedika.claim.controller:MainAdmedikaClaimController
     *
     * @description
     * Parse claim date.
     *
     * @param {string} date Date of claim.
     *
     * @returns {string} formatted date.
     */
    function parseDate(date) {
      if (date && moment(date).isValid()) {
        return moment(date).format('MMM/DD/YYYY');
      }
      return '-';
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.claim.controller#range
     * @methodOf app.main.admedika.claim.controller:MainAdmedikaClaimController
     *
     * @description
     * Get claims of the member based on selected date range.
     */
    function range() {
      var scope = $scope;

      scope.data = {};
      scope.data.getEndDate = getEndDate;
      scope.data.getStartDate = getStartDate;

      $ionicPopup.show({
        scope: scope,
        templateUrl: 'app/main/admedika/claim/modal/date-range.html',
        title: 'Enter Date Range',
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Submit',
            type: 'button-positive',
            onTap: onTap
          }
        ]
      });

      function getEndDate() {
        datepicker.openDatePicker({
          closeOnSelect: true,
          from: scope.data.startDate,
          callback: function on(val) {
            scope.data.endDate = $filter('date')(val, 'd MMM yyyy');
          }
        });
      }

      function getStartDate() {
        datepicker.openDatePicker({
          closeOnSelect: true,
          to: scope.data.endDate,
          callback: function on(val) {
            scope.data.startDate = $filter('date')(val, 'd MMM yyyy');
          }
        });
      }

      function onTap() {
        if (scope.data.startDate && scope.data.endDate) {
          claim.skip = 0;
          claim.startDate = scope.data.startDate;
          claim.endDate = scope.data.endDate;

          vm.claims = [];
          vm.hasClaims = false;

          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      }
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.claim.controller#sort
     * @methodOf app.main.admedika.claim.controller:MainAdmedikaClaimController
     *
     * @description
     * Get claims of the member with sorting by discharge date.
     */
    function sort() {
      claim.sort = _.first(claim.sort) === '-' ? 'dischargeDate' : '-dischargeDate';
      claim.skip = 0;

      vm.claims = [];
      vm.hasClaims = false;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  }

  angular.module('app.main.admedika.claim').controller('MainAdmedikaClaimController', MainAdmedikaClaimController);
}());
