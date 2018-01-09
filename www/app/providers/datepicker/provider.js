(function _AppProviderDatepickerProvider_() {
  'use strict';

  /** @this */
  function datepicker() {
    var config = {
      titleLabel: null,
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),
      mondayFirst: true,
      weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      templateType: 'popup',
      showTodayButton: false,
      closeOnSelect: false,
      disableWeekdays: []
    };

    this.set = function set(userConfig) {
      angular.merge(config, userConfig);
    };

    /**
     * @ngdoc service
     * @name app.providers.datepicker.service:datepicker
     *
     * @description
     * Datepicker service.
     * See {@link https://github.com/rajeshwarpatlolla/ionic-datepicker ionic-datepicker}.
     */
    this.$get = function get($ionicModal, $ionicPopup, $rootScope, datepickerFactory) {
      var $scope = $rootScope.$new();

      $scope.today = resetHMSM(new Date()).getTime();
      $scope.data = {};
      $scope.disabledDates = [];
      $scope.prevMonth = prevMonth;
      $scope.nextMonth = nextMonth;
      $scope.dateSelected = dateSelected;
      $scope.setIonicDatePickerTodayDate = setIonicDatePickerTodayDate;
      $scope.setIonicDatePickerDate = setIonicDatePickerDate;
      $scope.monthChanged = monthChanged;
      $scope.yearChanged = yearChanged;
      $scope.closeIonicDatePickerModal = closeIonicDatePickerModal;

      $ionicModal.fromTemplateUrl('app/providers/datepicker/templates/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function resolve(modal) {
        $scope.modal = modal;
      });

      $scope.$on('$destroy', function destroy() {
        $scope.modal.remove();
      });

      function resetHMSM(currentDate) {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate;
      }

      function prevMonth() {
        if ($scope.currentDate.getMonth() === 1) {
          $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
        }
        $scope.currentDate.setMonth($scope.currentDate.getMonth() - 1);
        $scope.data.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.data.currentYear = $scope.currentDate.getFullYear();
        refreshDateList($scope.currentDate);
      }

      function nextMonth() {
        if ($scope.currentDate.getMonth() === 11) {
          $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
        }
        $scope.currentDate.setDate(1);
        $scope.currentDate.setMonth($scope.currentDate.getMonth() + 1);
        $scope.data.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.data.currentYear = $scope.currentDate.getFullYear();
        refreshDateList($scope.currentDate);
      }

      function dateSelected(selectedDate) {
        if (!selectedDate || Object.keys(selectedDate).length === 0) return;

        $scope.selctedDateEpoch = selectedDate.epoch;

        if ($scope.mainObj.closeOnSelect) {
          $scope.mainObj.callback($scope.selctedDateEpoch);
          if ($scope.mainObj.templateType.toLowerCase() === 'popup') {
            $scope.popup.close();
          } else {
            closeModal();
          }
        }
      }

      function setIonicDatePickerTodayDate() {
        var today = new Date();
        refreshDateList(new Date());
        $scope.selctedDateEpoch = resetHMSM(today).getTime();
        if ($scope.mainObj.closeOnSelect) {
          $scope.mainObj.callback($scope.selctedDateEpoch);
          closeModal();
        }
      }

      function setIonicDatePickerDate() {
        $scope.mainObj.callback($scope.selctedDateEpoch);
        closeModal();
      }

      function setDisabledDates(mainObj) {
        if (!mainObj.disabledDates || mainObj.disabledDates.length === 0) {
          $scope.disabledDates = [];
        } else {
          $scope.disabledDates = [];
          angular.forEach(mainObj.disabledDates, function each(val) {
            $scope.disabledDates.push(resetHMSM(new Date(val)).getTime());
          });
        }
      }

      function refreshDateList(date) {
        var currentDate = resetHMSM(date);
        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        var firstDayMonday;
        var tempDate;
        var disabled;
        var index;

        $scope.currentDate = angular.copy(currentDate);
        $scope.monthsList = [];

        if ($scope.mainObj.monthsList && $scope.mainObj.monthsList.length === 12) {
          $scope.monthsList = $scope.mainObj.monthsList;
        } else {
          $scope.monthsList = datepickerFactory.monthsList;
        }

        $scope.yearsList = datepickerFactory.getYearsList($scope.mainObj.from, $scope.mainObj.to);
        $scope.dayList = [];
        $scope.firstDayEpoch = firstDayEpoch(currentDate, firstDay);
        $scope.lastDayEpoch = lastDayEpoch(currentDate, lastDay);

        for (index = firstDay; index <= lastDay; index += 1) {
          tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), index);
          disabled = isDisabled(tempDate);

          $scope.dayList.push({
            date: tempDate.getDate(),
            month: tempDate.getMonth(),
            year: tempDate.getFullYear(),
            day: tempDate.getDay(),
            epoch: tempDate.getTime(),
            disabled: disabled
          });
        }

        firstDayMonday = $scope.dayList[0].day - $scope.mainObj.mondayFirst;
        firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;

        for (index = 0; index < firstDayMonday; index += 1) {
          $scope.dayList.unshift({});
        }

        $scope.rows = [0, 7, 14, 21, 28, 35];
        $scope.cols = [0, 1, 2, 3, 4, 5, 6];
        $scope.data.currentMonth = $scope.mainObj.monthsList[currentDate.getMonth()];
        $scope.data.currentYear = currentDate.getFullYear();
        $scope.data.currentMonthSelected = angular.copy($scope.data.currentMonth);
        $scope.currentYearSelected = angular.copy($scope.data.currentYear);
        $scope.numColumns = 7;

        function firstDayEpoch(current, first) {
          var curDate = new Date(current.getFullYear(), current.getMonth(), first);
          return resetHMSM(curDate).getTime();
        }

        function lastDayEpoch(current, last) {
          var curDate = new Date(current.getFullYear(), current.getMonth(), last);
          return resetHMSM(curDate).getTime();
        }

        function isDisabled(temp) {
          return (temp.getTime() < $scope.fromDate) ||
            (temp.getTime() > $scope.toDate) ||
            $scope.mainObj.disableWeekdays.indexOf(temp.getDay()) >= 0;
        }
      }

      function monthChanged(month) {
        var monthNumber = $scope.monthsList.indexOf(month);
        $scope.currentDate.setMonth(monthNumber);
        refreshDateList($scope.currentDate);
      }

      function yearChanged(year) {
        $scope.currentDate.setFullYear(year);
        refreshDateList($scope.currentDate);
      }

      function setInitialObj(ipObj) {
        $scope.mainObj = angular.copy(ipObj);
        $scope.selctedDateEpoch = resetHMSM($scope.mainObj.inputDate).getTime();

        if ($scope.mainObj.weeksList && $scope.mainObj.weeksList.length === 7) {
          $scope.weeksList = $scope.mainObj.weeksList;
        } else {
          $scope.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        }
        if ($scope.mainObj.mondayFirst) {
          $scope.weeksList.push($scope.mainObj.weeksList.shift());
        }

        $scope.disableWeekdays = $scope.mainObj.disableWeekdays;
        refreshDateList($scope.mainObj.inputDate);
        setDisabledDates($scope.mainObj);
      }

      function openModal() {
        $scope.modal.show();
      }

      function closeModal() {
        $scope.modal.hide();
      }

      function closeIonicDatePickerModal() {
        closeModal();
      }

      function openDatePicker(ipObj) {
        var buttons = [];

        delete $scope.fromDate;
        delete $scope.toDate;

        $scope.mainObj = angular.extend({}, config, ipObj);

        if ($scope.mainObj.from) {
          $scope.fromDate = resetHMSM(new Date($scope.mainObj.from)).getTime();
        }

        if ($scope.mainObj.to) {
          $scope.toDate = resetHMSM(new Date($scope.mainObj.to)).getTime();
        }

        if (ipObj.disableWeekdays && config.disableWeekdays) {
          $scope.mainObj.disableWeekdays = ipObj.disableWeekdays.concat(config.disableWeekdays);
        }

        setInitialObj($scope.mainObj);

        if (!$scope.mainObj.closeOnSelect) {
          buttons = [{
            text: $scope.mainObj.setLabel,
            type: 'button_set',
            onTap: function onTap() {
              $scope.mainObj.callback($scope.selctedDateEpoch);
            }
          }];
        }

        if ($scope.mainObj.showTodayButton) {
          buttons.push({
            text: $scope.mainObj.todayLabel,
            type: 'button_today',
            onTap: function onTap(e) {
              var today = new Date();
              refreshDateList(new Date());
              $scope.selctedDateEpoch = resetHMSM(today).getTime();
              if (!$scope.mainObj.closeOnSelect) {
                e.preventDefault();
              }
            }
          });
        }

        buttons.push({
          text: $scope.mainObj.closeLabel,
          type: 'button_close',
          onTap: function onTap() {}
        });

        if ($scope.mainObj.templateType.toLowerCase() === 'popup') {
          $scope.popup = $ionicPopup.show({
            templateUrl: 'app/providers/datepicker/templates/popup.html',
            scope: $scope,
            cssClass: 'ionic_datepicker_popup',
            buttons: buttons
          });
        } else {
          openModal();
        }
      }

      return {
        openDatePicker: openDatePicker
      };
    };
  }

  angular.module('app.providers.datepicker').provider('datepicker', datepicker);
}());
