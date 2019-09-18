(function () {

    'use strict';

    angular.module('app')
        .service('Affiliation', ['$q', 'EntityManager', Affiliation])

    function Affiliation($q, EntityManager) {


        var URI = '/api/affiliation/';


        this.create = function(affiliation){

            var deferred = $q.defer();

            EntityManager.create(URI, affiliation).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };



        this.update = function(affiliation){

            var deferred = $q.defer();

            EntityManager.update(URI+affiliation._id, affiliation).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };



        this.list = function(){

            var deferred = $q.defer();

            EntityManager.list(URI).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };



        this.find = function(id){

            var deferred = $q.defer();

            EntityManager.find(URI+id).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };



        this.delete = function(id){

            var deferred = $q.defer();

            EntityManager.delete(URI+id).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };




        this.generateAPIKeycode = function(code){

            console.log('affiliation', code);
        };


        return this;
    }


})();
