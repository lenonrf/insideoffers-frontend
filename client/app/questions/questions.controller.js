(function () {
    'use strict';

    angular.module('app')
        .controller('QuestionsCtrl', [ '$scope', '$location', 'Questions', 'logger', '$mdDialog', '$rootScope', QuestionsCtrl])

    function QuestionsCtrl($scope, $location, Questions, logger, $mdDialog, $rootScope) {

        $scope.mainQuestion = {};



        if($location.path() === '/questions'){

            Questions.list().then(function(data){
                $scope.domainList = data;
                $scope.header = ['title', 'description'];
                $scope.initListGrid();
            });
        }



        if($location.path() === '/questions/edit'){

            Questions.find($location.search().id).then(function(data){
                $scope.mainQuestion = data;
            });
        }



        $scope.new = function(){
            $location.path('/questions/new');
        };



        $scope.edit = function(id){
            $location.path('/questions/edit').search({id:id});
        };



        var originalMainQuestion = angular.copy($scope.mainQuestion);
        $scope.canSubmit = function() {
            return $scope.form.$valid && !angular.equals($scope.mainQuestion, originalMainQuestion);
        };



        $scope.create = function(){


            Questions.create($scope.mainQuestion).then(function(data){
                if(data){
                    logger.logSuccess("Main Question has been <b>CREATED</b> !!!");
                    $location.path('/questions');
                }
            });
        };



        $scope.update = function(){

            console.log($scope.mainQuestion);

            Questions.update($scope.mainQuestion).then(function(data){
                if(data){
                    logger.logSuccess("Main Question has been <b>UPDATED</b> !!!");
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
                Questions.delete(id).then(function(data){

                    logger.logSuccess("Affiliate <b>"+data.name+"</b> has been <b>REMOVED</b> !!!");

                    Questions.list().then(function(data){
                        $scope.domainList = data;
                        $scope.initListGrid();

                    });
                });

            }, function() { });

        };


    }

})();
