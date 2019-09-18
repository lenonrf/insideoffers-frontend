(function () {

    'use strict';

    angular.module('app')
        .service('Dashboard', ['$q', 'EntityManager', Dashboard])

    function Dashboard($q, EntityManager) {


        this.listConversionByTrafficSource = function(affId, dateStart, dateEnd){

            var deferred = $q.defer();
            var dateParameters = '';

            if((dateStart) && (dateEnd)){
                dateParameters = '?dateStart='+dateStart+'&dateEnd='+dateEnd;    
            }

            var URI_FIND_STATS = '/api/affiliation/'+affId+'/stats/origintraffic'+dateParameters;

            console.log('URI_FIND_STATS', URI_FIND_STATS);

            EntityManager.find(URI_FIND_STATS).then(function(data){
                deferred.resolve(data);
            });

            return deferred.promise;
        };



        return this;
    }


})();
