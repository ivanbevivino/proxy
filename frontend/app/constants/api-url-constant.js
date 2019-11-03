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
      "API_OTT_URL": "https://da6kc61066.execute-api.us-east-1.amazonaws.com/production/api",
      "API_OTT_REPORTS": "https://0oluw0ewfg.execute-api.us-east-1.amazonaws.com/prod",
    }) 





    .constant('VERSION', {
        "FRONT": "1.3.0"
      }

    )

   




}());