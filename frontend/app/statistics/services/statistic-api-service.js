(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name statistics.service:statisticsApi
   *
   * @description
   *
   */
  angular
    .module('statistics')
    .service('statisticsApi', statisticsApi);

  function statisticsApi($http,API_URL) {
    var self = this;

        self.get = function () {
      return 'statisticsApi';
    };

     self.getstatistics = function (report) {
      return $http.post(API_URL.API_BACKEND+ 'getMetric',report).then(function(response) {
        return response.data;
      });
    };

    

  }
}());
