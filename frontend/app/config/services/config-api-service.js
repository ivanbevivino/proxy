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


    self.getMainCategories = function() {
      return $http.get(API_URL.API_OTT_URL + '/config').then(function(response) {

        return response.data;
      });
    };

 self.getDatabyId = function(id) {
      return $http.get(API_URL.API_OTT_URL + '/config/data/'+id).then(function(response) {

        return response.data;
      });
    };

     self.setDatabyId = function(req) {
      return $http.post(API_URL.API_OTT_URL + '/config/data/',req).then(function(response) {

        return response.data;
      });
    };


    self.getTags = function() {
      return $http.get(API_URL.API_OTT_URL + '/tag').then(function(response) {

        return response.data;
      });
    };


    // self.getMainCategoriesLimitOffset = function(limit,offset) {
    //   return $http.get(API_URL.API_OTT_URL  + '/config?limit='+limit+'&offset='+offset).then(function(response) {
    //     return response.data;
    //   });
    // };


    self.syncCategories = function(request) {
      return $http.post(API_URL.API_OTT_URL  + '/config', request);
    };

    self.syncTags = function(request) {
      return $http.post(API_URL.API_OTT_URL  + '/tag', request);
    };

    self.newsyncCategories = function(request) {
      return $http.get(API_URL.API_OTT_URL  + '/categories', request);
    };


    // self.getconfigbyId = function(configId) {
    //   return $http.get(API_URL.API_OTT_URL  + '/config/' + configId).then(function(response) {
    //     return response.data;
    //   });
    // };



    // self.deleteconfigbyId = function(configId) {
    //   return $http.delete(API_URL.API_OTT_URL  + '/config/' + configId);
    // };



    // self.updateconfig = function(configId, config) {
    //   return $http.put(API_URL.API_OTT_URL  + '/config/' + configId, config);
    // };



    // self.getAllCategories = function() {
    //   return $http.get(API_URL.API_OTT_URL  + '/config').then(function(response) {

    //     return response.data;

    //   });
    // };




    // self.getAllTags = function() {
    //   return $http.get(API_URL.API_OTT_URL  + '/tag').then(function(response) {

    //     return response.data;

    //   });
    // };



  }
}());
