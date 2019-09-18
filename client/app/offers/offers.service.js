(function () {

    'use strict';

    angular.module('app')
        .service('Offer', ['$q', 'EntityManager', Offer])

    function Offer($q, EntityManager) {


        var URI = '/api/offer/';
        var currentOffer = {};


        this.setCurrentOffer = function(offer){
            this.currentOffer = offer;
        };


        this.getCurrentOffer = function(){
            return this.currentOffer;
        };



        this.create = function(offer){

            var deferred = $q.defer();

            EntityManager.create(URI, offer).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };



        this.update = function(offer){

            var deferred = $q.defer();

            EntityManager.update(URI+offer._id, offer).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };


        this.filter = function(filterObj){


            var URI = '/api/offer?action=filter';

            if(filterObj.affiliation !== 'all_aff'){
                URI += '&affiliation='+filterObj.affiliation;
            }

            if(filterObj.offerType !== 'all_offertype'){
                URI += '&offerType='+filterObj.offerType;
            }

            if(filterObj.dateFilter.type!== 'all_time'){
                
                URI += '&dateFilterType='+filterObj.dateFilter.type;

                if(filterObj.dateFilter.type === 'custom'){

                    URI += '&dateStart='+filterObj.dateFilter.dateStart;
                    URI += '&dateEnd='+filterObj.dateFilter.dateEnd;
                }
            }

            console.log('URI', URI);
           

            var deferred = $q.defer();

            EntityManager.list(URI).then(function(data){
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

            var URI = '/api/offer/affiliation/'+affiliationId;

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



        this.findWithStats = function(id, dateStart, dateEnd){

            var deferred = $q.defer();
            var dateParameters = '';

            if((dateStart) && (dateEnd)){
                dateParameters = '?dateStart='+dateStart+'&dateEnd='+dateEnd;    
            }

            var URI_FIND_STATS = URI+id+'/stats'+dateParameters;

            EntityManager.find(URI_FIND_STATS).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };



        this.getStatsFromOfferType = function(id, dateStart, dateEnd){

            var deferred = $q.defer();
            var dateParameters = '';

            if((dateStart) && (dateEnd)){
                dateParameters = '?dateStart='+dateStart+'&dateEnd='+dateEnd;    
            }

            var URI_FIND_STATS = URI+id+'/stats/offertype'+dateParameters;

            EntityManager.find(URI_FIND_STATS).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };





        this.getStatsFromTraficSource = function(id, dateStart, dateEnd){

            var deferred = $q.defer();
            var dateParameters = '';

            if((dateStart) && (dateEnd)){
                dateParameters = '?dateStart='+dateStart+'&dateEnd='+dateEnd;    
            }

            var URI_FIND_STATS = URI+id+'/stats/trafficsource'+dateParameters;

            EntityManager.find(URI_FIND_STATS).then(function(data){
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



        return this;
    }


})();
