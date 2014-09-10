'use strict';

angular.module('calendarDemoApp', []);

// your controller and directive code go here
angular.module('calendarDemoApp').controller('CalendarCtrl', function() {
  var vm = this;
  vm.today = new Date();
});

angular.module('calendarDemoApp').directive('calendar', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/calendar.html',
    scope: {
      date: '='
    },
    link: function(scope) {
      var currentDate;

      scope.today = scope.date;

      scope.$watch('date', function(newDate) {
        buildCalendar(newDate);
      });

      scope.$watch('targetDate', function(newTarget) {
        scope.date = new Date(newTarget.year, newTarget.month, 1);
      }, true);

      scope.setToday = function() {
        scope.date = scope.today;
      };

      var buildCalendar = function(date) {
        currentDate = date;

        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();

        scope.targetDate = {
          month: month,
          year: year
        };

        scope.months = getMonths();
        scope.years = getYears();
        scope.daysOfWeek = getDaysOfWeek();
        scope.days = CalendarRange.getMonthlyRange(currentDate);

        scope.weeks = [];

        var totalWeeks = Math.ceil(scope.days.days.length / 7);

        for (var i = 0; i < totalWeeks; i++) {
          scope.weeks[i] = [];
          for (var j = 0; j < 7; j++) {
            scope.weeks[i].push(scope.days.days[j + (i * 7)]);
          }
        }
      };

      var getMonths = function() {
        return ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'];
      };

      var getYears = function() {
        var currentYear = new Date().getFullYear();

        var years = [];

        for (var i = currentYear - 20; i <= currentYear + 20; i++) {
          years.push(i);
        }

        return years;
      };

      var getDaysOfWeek = function() {
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      };

    }
  };
});