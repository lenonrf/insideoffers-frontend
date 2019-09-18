(function () {
    'use strict';

    angular.module('app')
        .controller('AuthCtrl', ['$scope', '$location', 'Auth', authCtrl]);

    function authCtrl($scope, $location, Auth) {



        if($location.path() === '/logout'){
            Auth.logout();
            $location.path('/login');
        }


        $scope.login = function(form) {

            $scope.submitted = true;

            if(form.$valid) {

                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then( function() {
                        console.log('login true');
                        $location.path('/dashboard');
                    })
                    .catch( function(err) {
                        $scope.errors.other = err.mssage;
                    });
            }
        };

    }

})();

