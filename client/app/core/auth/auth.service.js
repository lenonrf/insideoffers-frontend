(function () {

    'use strict';

    angular.module('app')

        .service('Auth', ['$location', '$rootScope', '$http', 'User', '$cookieStore', '$q', Auth])

    function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
        
        var currentUser = {};

        if ($cookieStore.get('token')) {
            currentUser = User.resource.get();
        }


        this.login = function (user, callback) {

            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.post('/api/login'+'?username='+user.email+'&password='+user.password).

                success(function (data) {

                    $cookieStore.put('token', data.token);
                    User.setCurrentUser(data.userId, data.token);
                    deferred.resolve(data);

                    return cb();
                }).
                error(function (err) {

                    this.logout();
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

            return deferred.promise;
        };


        this.logout = function () {
            $cookieStore.remove('token');
            currentUser = {};
        };



        this.createUser = function (user, callback) {
          
            var cb = callback || angular.noop;

            return User.save(user,
                function (data) {
                    $cookieStore.put('token', data.token);
                    currentUser = User.get();
                    return cb(user);
                },
                function (err) {
                    this.logout();
                    return cb(err);
                }.bind(this)).$promise;
        };



        this.changePassword = function (oldPassword, newPassword, callback) {
            var cb = callback || angular.noop;

            return User.changePassword({id: currentUser._id}, {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, function (user) {
                return cb(user);
            }, function (err) {
                return cb(err);
            }).$promise;
        };


      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      this.getCurrentUser = function() {
        return currentUser;
      };

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      this.isLoggedIn = function() {
        //console.log('token', $cookieStore.get('token'));
        //return currentUser.hasOwnProperty('role');
        return $cookieStore.get('token');
      };

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      this.isLoggedInAsync = function(cb) {

        if(currentUser.hasOwnProperty('$promise')) {

          currentUser.$promise.then(function() {

            cb(true);

          }).catch(function() {

            cb(false);

          });

        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      };

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      this.isAdmin = function() {
        return currentUser.role === 'admin';
      };

      /**
       * Get auth token
       */
      this.getToken = function() {
        return $cookieStore.get('token');
      };


        return this;
    }


})();
