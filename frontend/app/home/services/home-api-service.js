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


    self.homeReports = function (userid) {
      return $http.get(API_URL.API_OTT_URL + '/home/' + userid).then(function (response) {
        return response.data;
      });
    };

    self.getUseronline = function (id, eventid, from, to) {
      var req = {
        "id": id,
        "eventid": eventid,
        "from": from,
        "to": to
      }
      return $http.post(API_URL.API_OTT_REPORTS + '/reports/',req).then(function (response) {
        return response.data;
      });
    };




  }
}());
