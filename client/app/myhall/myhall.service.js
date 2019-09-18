(function () {

    'use strict';

    angular.module('app')
        .service('MyHall', ['$q', 'EntityManager', MyHall])

    function MyHall($q, EntityManager) {


        var URI = '/api/myhall/';
        var currentMyHall = {};


        this.setCurrentMyHall = function(myHall){
            this.currentMyHall = myHall;
        };


        this.getCurrentMyHall = function(){
            return this.currentMyHall;
        };



        this.create = function(myHall){

            var deferred = $q.defer();

            EntityManager.create(URI, myHall).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };



        this.update = function(myHall){

            var deferred = $q.defer();

            console.log('url', URI+myHall._id);

            EntityManager.update(URI+myHall._id, myHall).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };


        this.updateOrder = function(myHall, id){

            var deferred = $q.defer();

            console.log('url', URI+id);

            EntityManager.update(URI+id, myHall).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };




        this.changeOffer = function(body){

            var deferred = $q.defer();
            var affId = body.affiliation.oldValue;

            var uri = '/api/myHall/affiliation/'+affId;

            EntityManager.update(uri, body).then(function(data){
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




        this.listByAffiliation = function(affiliationId){

            var deferred = $q.defer();

            var URI = '/api/myhall/affiliation/'+affiliationId;

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



        this.deleteOfferFromAffiliation = function(offerId, affiliationId){

            var deferred = $q.defer();

            var URI = '/api/myhall/affiliation/'+affiliationId+'/offer/'+offerId;

            EntityManager.delete(URI).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };


        return this;
    }


})();
