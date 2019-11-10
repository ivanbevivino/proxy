(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name config.service:configApi
     *
     * @description
     *
     */
    angular
      .module('config')
      .service('configApi', configApi);
    function configApi($http,API_URL) {
    var self = this;
    self.get = function () {
      return 'config';
    };
    self.getConfig = function() {
      return $http.get(API_URL.API_BACKEND + 'getConfig').then(function(response) {
        return response.data;
      });
    };
    self.setConfig = function (req) {
      return $http.post(API_URL.API_BACKEND + 'setMaxRate',req).then(function(response) {
        return response.data;
      });
    };
  }
}());
