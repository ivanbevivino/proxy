(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name prueba.service:pruebaApi
   *
   * @description
   *
   */
  angular
    .module('prueba')
    .service('pruebaApi', pruebaApi);

  function pruebaApi($http,API_URL) {
    var self = this;

        self.get = function () {
      return 'pruebaApi';
    };

     self.getprueba = function (path) {
      return $http.get(API_URL.API_BACKEND+ path).then(function(response) {
        return response.data;
      });
    };

    

  }
}());
