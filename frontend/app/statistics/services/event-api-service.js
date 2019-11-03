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

     self.getstatistics = function () {
      return $http.get(API_URL.API_OTT_URL + '/statistics').then(function(response) {
        return response.data;
      });
    };

     self.addstatistics = function (request) {
      return $http.post(API_URL.API_OTT_URL + '/statistics', request).then(function(response) {
        
        
        return response.data;
      });
    };

     self.getstatisticsbyId = function (statisticsId) {
      return $http.get(API_URL.API_OTT_URL + '/statistics/'+statisticsId).then(function(response) {
        return response.data;
      });
    };

       self.getstatisticsLimitOffset = function (limit,offset) {
      return $http.get(API_URL.API_OTT_URL + '/statistics?limit='+limit+'&offset='+offset).then(function(response) {
        return response.data;
      });

   
    };


       self.deletestatisticsbyId = function (statisticsId) {
       return $http.delete(API_URL.API_OTT_URL + '/statistics/'+statisticsId).then(function(response) {
        return response.data;
      });
    };



       self.updatestatistics = function (statisticsid,statistics) {
      return $http.put(API_URL.API_OTT_URL + '/statistics/',statistics).then(function(response) {
        return response.data;
      });
    };

      self.uploadFileToS3 = function (request) {
      return $http.post(API_URL.API_OTT_URL + '/image/upload', request).then(function(response) {
        return response.data;
      });
    };


          self.transformFileS3 = function (request) {
      return $http.post(API_URL.API_OTT_URL + '/image/resize', request).then(function(response) {
        return response.data;
      });
    };

       self.buscarstatisticso = function (title) {
      return $http.get(API_URL.API_OTT_URL + '/statistics/title/'+title).then(function(response) {
        return response.data;
      });
    };


       self.buscarstatisticsosinTitulo = function () {
      return $http.get(API_URL.API_OTT_URL + '/statistics/title/').then(function(response) {
        return response.data;
      });
    };

  }
}());
