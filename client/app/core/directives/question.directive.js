(function () {

    'use strict';

    angular.module('app').directive('question', ['$filter', '$timeout', '$compile', 'Upload', 
        function($filter, $timeout, $compile, Upload){
            return {

                restrict: 'AE',
                replace: true,
                templateUrl: 'app/core/directives/question.directive.html',

                link: function($scope, $element, attrs) {


                        $scope.mainQuestion = {
                            title: '',
                            description: '',
                            answerList:[{
                                answer: "",
                                action: null,
                            }]
                        };

                    


                    $scope.removeItem = function(index) {
                        $scope.mainQuestion.answerList.splice(index, 1);
                    };



                    $scope.newAnswer = function() {
                        $scope.mainQuestion.answerList.push({
                            //id : $scope.offer.mainQuestion.length,
                            answer: '',
                            action: null,
                            question: []
                        });
                    };



                    $scope.choiseAction = function(action, index){

                        switch(action){

                            case 'do_nothing':
                            case 'delivery':
                                $scope.cleanActions(index);
                                break;

                            case 'confirm_user_fields':
                                $scope.showConfirmUserFields(index);
                                break;

                            case 'open_new_input_field':
                                $scope.showInputNewField(index);
                                break;
                        }

                    };


                    $scope.uploadFile = function (file) {

                        console.log('file', file);

                        Upload.upload({
                        
                            url: '/api/upload', 
                            data:{
                                file:file,
                            } 
                        
                        }).then(function (resp) { 
                            
                            if(resp.data.error_code === 0){ 
                                
                                console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ');
                                 $scope.mainQuestion.smallImage = resp.config.data.file.name;

                            }
                        });
                    };



                    $scope.showConfirmUserFields = function(index){

                        $scope.cleanActions(index);
                        $scope.mainQuestion.answerList[index].action.textConfirmation ='';
                        $scope.mainQuestion.answerList[index].action.field = null;

                        angular.element(document.getElementById('confirmUserFields_'+index)).css('display', 'flex');
                    };



                    $scope.showInputNewField = function(index){

                        $scope.cleanActions(index);
                        $scope.mainQuestion.answerList[index].action.textInput = '';
                        $scope.mainQuestion.answerList[index].action.fieldTag = null;

                        angular.element(document.getElementById('inputNewField_'+index)).css('display', 'flex');
                    };



                    $scope.cleanActions = function(index){
                        angular.element(document.getElementById('confirmUserFields_'+index)).css('display', 'none');
                        angular.element(document.getElementById('inputNewField_'+index)).css('display', 'none');

                    };



                    $scope.addSubQuestion = function(div, item){

                        if(!$scope.subQuestionList){
                            $scope.subQuestionList = [];
                        }

                        var subQuestionId = "";
                        for( var i=0; i < 5; i++ ){
                            subQuestionId += "ABCDEF0123456789".charAt(
                                Math.floor(Math.random() * "ABCDEF0123456789".length));
                        }

                        $scope.subQuestionList.push(subQuestionId);
                        var el = $compile('<question data="'+item+'" key='+subQuestionId+'"/>')($scope);
                        angular.element(document.getElementById(div)).append(el);
                    };



                    if(attrs.isoffer === 'true'){
                        $scope.mainQuestion = $scope.offer.mainQuestion;
                    }
                }
            };
        }])

})();
