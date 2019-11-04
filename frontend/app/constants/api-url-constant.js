(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontend.constant:API_URL
   *
   * @description
   *
   */
  angular
    .module('frontend')



    .constant('API_URL', {
      "API_BACKEND": "http://127.0.0.1:3000/",
      "API_REPORTS": "http://127.0.0.1:3000/",
    }) 





    .constant('VERSION', {
        "FRONT": "1.3.0"
      }

    )

   




}());