(function() {
  'use strict';

  angular
    .module('statistics')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('statistics', {
        url: '/statistics',
        templateUrl: 'statistics/views/statistics.tpl.html',
        controller: 'statisticsCtrl',
        controllerAs: 'statistics',
             resolve: {
          ev: function(statisticsApi) {
            // return statisticsApi.getstatisticsLimitOffset(15, 0);
          }
        },
        data: {
          requiresLogin: true
        }
      });
  }
}());
