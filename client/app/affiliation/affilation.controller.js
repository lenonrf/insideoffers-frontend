(function () {
    'use strict';

    angular.module('app')
        .controller('AffiliationCtrl', [ '$scope', '$location', 'Affiliation', 
            'logger', '$mdDialog', 'MyHall', AffiliationCtrl])

    function AffiliationCtrl($scope,  $location, Affiliation, logger, $mdDialog, MyHall) {

        $scope.domainList = [];

        if($location.path() === '/affiliation'){

            Affiliation.list().then(function(data){
                $scope.domainList = data;
                $scope.header = ['name', 'code'];
                $scope.initListGrid();
            });
        }



        if($location.path() === '/affiliation/edit'){

            Affiliation.find($location.search().id).then(function(data){
                $scope.affiliation = data;
            });
        }



        $scope.new = function(){
            $location.path('/affiliation/new');
        };



        $scope.edit = function(id){
            $location.path('/affiliation/edit').search({id:id});
        };



        var originalAffiliation = angular.copy($scope.affiliation);
        $scope.canSubmit = function() {
            return $scope.affiliationForm.$valid && !angular.equals($scope.affiliation, originalAffiliation);
        };



        $scope.create = function(){

            Affiliation.create($scope.affiliation).then(function(data){
                if(data){
                    logger.logSuccess("Affiliate <b>"+data.name+"</b> has been <b>CREATED</b> !!!");
                    $location.path('/affiliation');
                }
            });
        };



        $scope.update = function(){

            Affiliation.update($scope.affiliation).then(function(data){
                if(data){
                    logger.logSuccess("Affiliate <b>"+data.name+"</b> has been <b>UPDATED</b> !!!");
                }
            });
        };



        $scope.delete = function(ev, id){

            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this record ?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function() {

                Affiliation.delete(id).then(function(data){

                    Affiliation.list().then(function(data){
                        $scope.domainList = data;
                        $scope.initListGrid();
                        logger.logSuccess("Affiliate <b>"+data.name+"</b> has been <b>REMOVED</b> !!!");

                    });
                });

            }, function() { });

        };
    }
})();
