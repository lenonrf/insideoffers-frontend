(function () {

    'use strict';

    angular.module('app')
        .service('EntityManager', ['$http', '$q', EntityManager])

    function EntityManager($http, $q) {


        this.create = function(uri, data){

            var deferred = $q.defer();

            $http({
                  method: 'POST',
                  url: uri,
                  data: data
               }).then(function (response){
                     deferred.resolve(response.data);
               },function (error){
                    deferred.reject(null);
               });

            /*$http.post(uri, data)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    deferred.reject(null);
                });*/

            return deferred.promise;
        };



        this.list = function(uri, body){

            var deferred = $q.defer();


             $http({
                  method: 'GET',
                  url: uri
               }).then(function (response){
                     deferred.resolve(response.data);
               },function (error){
                    deferred.reject(null);
               });

            /*$http.get(uri)
                .success( function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                .error(function(err) {
                    deferred.reject(null);
                });*/

            return deferred.promise;
        };



        this.find = function(uri){

            var deferred = $q.defer();

            $http({
                  method: 'GET',
                  url: uri
               }).then(function (response){
                     deferred.resolve(response.data);
               },function (error){
                    deferred.reject(null);
               });

            /*$http.get(uri)
                .success( function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                .error(function(err) {
                    deferred.reject(null);
                });*/

            return deferred.promise;
        };



        this.update = function(uri, data){

            var deferred = $q.defer();

            $http({
                  method: 'PUT',
                  url: uri,
                  data: data
               }).then(function (response){
                     deferred.resolve(response.data);
               },function (error){
                    deferred.reject(null);
               });

            /*$http.put(uri, data)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    deferred.reject(null);
                });*/

            return deferred.promise;
        };



        this.delete = function(uri){

            var deferred = $q.defer();

            $http({
                  method: 'DELETE',
                  url: uri
                }).then(function (response){
                     deferred.resolve(response.data);
               },function (error){
                    deferred.reject(null);
               });

            /*$http.delete(uri)
                .success( function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                .error(function(err) {
                    deferred.reject(null);
                });*/

            return deferred.promise;
        };


        return this;
    }


})();
