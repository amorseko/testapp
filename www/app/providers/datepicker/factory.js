(function _AppProviderDatePickerFactory_() {
  'use strict';

  function datepickerFactory() {
    var monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function getYearsList(from, to) {
      var yearsList = [];
      var minYear = 1900;
      var maxYear = 2100;
      var index;

      minYear = from ? new Date(from).getFullYear() : minYear;
      maxYear = to ? new Date(to).getFullYear() : maxYear;

      for (index = minYear; index <= maxYear; index += 1) {
        yearsList.push(index);
      }

      return yearsList;
    }

    return {
      monthsList: monthsList,
      getYearsList: getYearsList
    };
  }

  angular.module('app.providers.datepicker').factory('datepickerFactory', datepickerFactory);
}());
