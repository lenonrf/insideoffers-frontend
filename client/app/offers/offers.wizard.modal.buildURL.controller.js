(function () {
    'use strict';

    angular.module('app')
        .controller('OffersWizardModalBuildURLCtrl', [ '$scope', 'logger',
            '$uibModalInstance', 'offerTypeDelivery', 'url', 'lodash', OffersWizardModalBuildURLCtrl])

    function OffersWizardModalBuildURLCtrl($scope, logger, $uibModalInstance, offerTypeDelivery, url, lodash) {

        var _ = lodash;


        $scope.mask = 'dd/mm/yyyy';
        $scope.urlBuild = {};
        $scope.urlBuild.fields = {};

        $scope.valueMale = '';
        $scope.valueFemale = '';

        $scope.arrayFields = ['email','fullName','firstName','lastName','birthDate',
        'gender','cellphone','telephone','state','city','zipcode','ip', 'currentDate'];

        for (var x=0; x<$scope.arrayFields.length; x++) {
            $scope.urlBuild.fields[$scope.arrayFields[x]] = {}
            $scope.urlBuild.fields[$scope.arrayFields[x]].status = false;
            $scope.urlBuild.fields[$scope.arrayFields[x]].value = '';
        };



        /**
         * INIT METHOD
         */
 
        $scope.populateModal = function(){
            $scope.populateUserData();
        };

        




        $scope.populateCustomUserData = function(answerList){
            
            $scope.urlBuild.customUserData = [];

            for(var x=0; x<answerList.length; x++){

                switch(answerList[x].action.type){

                    case 'confirm_user_fields':
                    case 'open_new_input_field':

                        $scope.urlBuild.customUserData.push(answerList[x].action);

                    break;
                }

            }
        };




        $scope.populateUserData = function(){
            

            if(_.isEmpty(url)){
                return null;
            }

            var wsUrl = '';
            var arrayFields = url.match(/[a-zA-Z_0-9]*=<[a-zA-Z_0-9]*>/g);

            if(!arrayFields){
                $scope.urlBuild.mainUrl = url;
                return null;
            }

            for(var x=0; x<arrayFields.length; x++){

                $scope.populateModalFields(arrayFields[x]);
                url = url.replace('&'+arrayFields[x], '');
                url = url.replace(arrayFields[x], '');
                url = url.replace(/\?+/g, '?');
            }

            $scope.urlBuild.mainUrl = url;

        };




        $scope.populateModalFields = function(fieldItem){

            var field = fieldItem.split('=');
            var fieldKey = field[1].replace(/[<>]/g,'');


            if(fieldKey === 'birthDate'){
                $scope.mask = offerTypeDelivery.birthDate.mask;
            }

            if(fieldKey === 'gender'){

                $scope.valueMale = offerTypeDelivery.gender.valueMale;
                $scope.valueFemale = offerTypeDelivery.gender.valueFemale;
            }

            if($scope.urlBuild.fields[fieldKey]){

                $scope.urlBuild.fields[fieldKey].status = true; 
                $scope.urlBuild.fields[fieldKey].value = field[0];
            }
            
            

        };





        /**
         * Define that modal is closed and the data was sended to controller
         */
        $scope.ok = function() {


            console.log('$scope.urlBuild', $scope.urlBuild);


            if(!$scope.validate()) return null;

            var objReturn = {

                url: $scope.urlBuild.mainUrl,
                gender: {
                    isGender: false,
                    valueMale : $scope.valueMale,
                    valueFemale: $scope.valueFemale
                },
                birthDate:{
                    isBirthDate: false,
                    mask: $scope.mask
                }
            };


            for(var k in $scope.urlBuild.fields){

                if($scope.urlBuild.fields[k].status){
                
                    objReturn.url += ((objReturn.url.indexOf('?') > -1) ? '&':'?')
                        +$scope.urlBuild.fields[k].value+'='+$scope.getTag(k);

                    if(k ==='birthDate'){
                        objReturn.gender.isGender = true;

                    } else if( k === 'gender'){
                        objReturn.birthDate.isBirthDate = true;
                    }
                }

            }

            objReturn.url = objReturn.url.replace(/\?+/g, '?');
            objReturn.url = objReturn.url.replace('?&', '?');

            $uibModalInstance.close(objReturn);
        };


        /**
         * Cancel the modal
         */
        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };




        $scope.getTag = function(key) {

            switch (key){

                case 'email':
                    return '<email>';
                    break;

                case 'fullName':
                    return '<fullName>';
                    break;

                case 'firstName':
                    return '<firstName>';
                    break;

                case 'lastName':
                    return '<lastName>';
                    break;

                case 'birthDate':
                    return '<birthDate>';
                    break;

                case 'gender':
                    return '<gender>';
                    break;

                case 'cellphone':
                    return '<cellphone>';
                    break;

                case 'telephone':
                    return '<telephone>';
                    break;

                case 'state':
                    return '<state>';
                    break;

                case 'city':
                    return '<city>';
                    break;

                case 'zipcode':
                    return '<zipcode>';
                    break;

                case 'ip':
                    return '<ip>';
                    break;

                case 'currentDate':
                    return '<currentDate>';
                    break;

            }
        };



        $scope.validate = function(){

            if(!$scope.urlBuild.mainUrl){
                logger.logError("Please fill the Main URL");
                return false;
            }

            for(var k in $scope.urlBuild.fields){

                if($scope.urlBuild.fields[k].status){
                    
                    if(!$scope.urlBuild.fields[k].value){
                        logger.logError("Please fill all the fields selected");
                        return false;
                    }
                }

                
            }

            return true;
        };



        /**
         * Define a object that will be the data to questions selecteds
         */
        $scope.selectQuestion = function() {

            $scope.itemsModalSelected = [];

            for(var x=0; x<$scope.itemsModal.length; x++){
                if($scope.itemsModal[x].isSelected){
                    $scope.itemsModalSelected.push($scope.itemsModal[x])
                }
            }
        };



        $scope.populateModal();

    }
})();
