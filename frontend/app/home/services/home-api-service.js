(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name home.service:HomeApi
   *
   * @description
   *
   */
  angular
    .module('home')
    .service('HomeApi', HomeApi);

  function HomeApi($http, API_URL) {
    var self = this;

    self.get = function () {
      return 'HomeApi';
    };


    // self.homeReports = function (userid) {
    //   return $http.get(API_URL.API_BACKEND + '/home/' + userid).then(function (response) {
    //     return response.data;
    //   });
    // };

    self.homeReports = function () {
      var req = {
        "id": 2
      }
      return $http.post(API_URL.API_BACKEND + 'getMetric/',req).then(function (response) {
        return response.data;
      });
    };

    self.homeReports2 = function () {
      var req = {
        "id": 1
      }
      return $http.post(API_URL.API_BACKEND + 'getMetric/',req).then(function (response) {
        return response.data;
      });
    };




  }
}());
