(function () {
    'use strict';

    angular.module('app')
        .controller('MyHallCtrl', [ '$scope', '$location', 'Affiliation', 'MyHall', MyHallCtrl])

    function MyHallCtrl($scope, $location, Affiliation, MyHall) {

        $scope.affiliationFilter = null;

        $scope.myhall = {};

        $scope.headerSponsoring = ['name', 'eCPM','conversions'];
        $scope.headerSurvey = ['order','name', 'eCPM', 'acceptance', 'refusal', 'impressions','conversions'];
        $scope.headerQuestionHall = ['order','name', 'eCPM', 'acceptance', 'refusal', 'impressions','conversions'];
        $scope.headerBalcony = ['order','name', 'eCPM', 'acceptance', 'refusal', 'impressions','conversions'];


        
        Affiliation.list().then(function(data){
            $scope.affiliation = data;
        });


        $scope.updateOrderSurveyListeners = {
            orderChanged: function(event) {
                
                var myhallObj = {
                    _id: $scope.myhall._id,
                    survey : []
                };
          
                for(var x=0; x<$scope.myhall.survey.length; x++){
                    myhallObj.survey.push($scope.myhall.survey[x]._id);
                }

                console.log('myhallObj', myhallObj);

                MyHall.update(myhallObj);
            },
        };

        $scope.updateOrderQuestionHallListeners = {
            orderChanged: function(event) {
                
                var myhallObj = {
                    _id: $scope.myhall._id,
                    questionHall : []
                };
          
                for(var x=0; x<$scope.myhall.questionHall.length; x++){
                    myhallObj.questionHall.push($scope.myhall.questionHall[x]._id);
                }

                MyHall.update(myhallObj);
            },
        };

        $scope.updateOrderBalconyListeners = {
            orderChanged: function(event) {

                var myhallObj = {
                    _id: $scope.myhall._id,
                    balcony : []
                };
          
                for(var x=0; x<$scope.myhall.balcony.length; x++){
                    myhallObj.balcony.push($scope.myhall.balcony[x]._id);
                }

                MyHall.update(myhallObj);
            },
        };


        $scope.order = function(direction, index, offersList, offerType){

            var offerIndex = offersList[index];
            var offerNext = offersList[index+1];

            switch(direction){

                case 'up':

                    offerIndex = offersList[index];
                    offerNext = offersList[index-1];

                    offersList[index] = offerNext;
                    offersList[index-1] = offerIndex;

                    break;

                case 'down':

                    offerIndex = offersList[index];
                    offerNext = offersList[index+1];

                    offersList[index] = offerNext;
                    offersList[index+1] = offerIndex;

                    break;

            }

            console.log('offersList', offersList);

            $scope.updateOrder(offersList, offerType);

        };



        $scope.updateOrder = function(offersList, offerType){

            var myhallObj = {
                //_id: $scope.myhall._id
            };

            switch(offerType){

                case 'survey':

                    myhallObj.survey = [];
                    for(var x=0; x<offersList.length; x++){
                        myhallObj.survey.push(offersList[x]._id);
                    }

                    break;

                case 'questionHall':

                    myhallObj.questionHall = [];
                    for(var x=0; x<offersList.length; x++){
                        myhallObj.questionHall.push(offersList[x]._id);
                    }              
                    
                    break;

                case 'balcony':

                    myhallObj.balcony = [];
                    for(var x=0; x<offersList.length; x++){
                        myhallObj.balcony.push(offersList[x]._id);
                    }

                    break;

            }

            console.log('myhallObj', myhallObj);

            MyHall.updateOrder(myhallObj, $scope.myhall._id);

        };


        


        $scope.filterByAffiliation = function(){

            MyHall.listByAffiliation($scope.affiliationFilter).then(function(data){

                console.log('data', data);

                if(data){

                    $scope.myhall = data;
                    $scope.showData = true;
                
                }else{

                    $scope.myhall.showData = false;
                    $scope.myhall.sponsoring = [];
                    $scope.myhall.survey = [];
                    $scope.myhall.questionHall = [];
                    $scope.myhall.balcony = [];
                }
            });
        };




        $scope.filterByAffiliationCode = function(){

            MyHall.listByAffiliation($scope.affiliationFilter).then(function(data){

                console.log('data', data);

                if(data.length > 0){

                    $scope.myhall = data[0];
                    $scope.showData = true;
                
                }else{

                    $scope.myhall.showData = false;
                    $scope.myhall.sponsoring = [];
                    $scope.myhall.survey = [];
                    $scope.myhall.questionHall = [];
                    $scope.myhall.balcony = [];
                }
            });
        };



    }

})();
