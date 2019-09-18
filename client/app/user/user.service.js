(function () {

    'use strict';

    angular.module('app').service('User', ['$http', '$resource', '$rootScope', User])

    function User($http, $resource, $rootScope) {

        this.resource = $resource('/api/user/:id/:controller', {
          id: '@_id'
        },
        
        {
          changePassword: {
            method: 'PUT',
            params: {
              controller:'password'
            }
          },
          get: {
            method: 'GET',
            params: {
              id:'me'
            }
          }
        });


        this.setCurrentUser = function (id, token) {
            $http.get('/api/user/'+id+'?access_token='+token)
                .then(function(response) {
                    $rootScope.currentUser = response.data;
                }, function(response) {
                    console.log('error', response);
                });
        };

        return this;
    }

})();
