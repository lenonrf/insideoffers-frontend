    (function () {
        'use strict';

        angular.module('app')
            .controller('OffersCtrl', [ '$scope', '$location', 'Offer', 'OfferValidator',
                '$mdDialog', 'logger', 'Affiliation', 'Questions', '$uibModal', 'MyHall', '$compile', 
                '$templateRequest', 'lodash', 'Upload', OffersCtrl]) 

        function OffersCtrl($scope, $location, Offer, OfferValidator, $mdDialog, logger,
                            Affiliation, Questions, $uibModal, MyHall, $compile, $templateRequest, lodash, Upload) {

            
            var _ = lodash;

            Affiliation.list().then(function(data){
                $scope.affiliation = data;
            });  



            $scope.isEdit = false;
            $scope.isSponsoring = true;
            $scope.isSurvey = true;
            $scope.isQuestionHall = true;
            $scope.isBalcony = true;
            $scope.statusFilter = true;

            $scope.isImageSponsoring = false;
            $scope.isImageSurvey = false;
            $scope.isImageQuestionHall = false;
            $scope.isImageBalcony = false;
            
            $scope.affiliationEdit = [];
            $scope.affiliationToDeleteOfferMyhall = [];

            $scope.domainList = [];
            $scope.dynamicSegmentation = [];

            $scope.offers = [];

            $scope.offer = {};
            //$scope.offer.affiliation = [{}];
            $scope.offer.affiliationData = [{
                
                affiliation: {},
                
                isSponsoring : false,
                isSurvey : false,
                isQuestionHall : false,
                isBalcony : false,

                delivery: [{
                    type: '',
                    url: '',
                    image: ''
                }]
            }];


            $scope.offer.segmentation = {};
            $scope.offer.segmentation.dynamicSegmentation = [];
            $scope.offer.segmentation.forbiddenDomains = [];
            $scope.offer.segmentation.dddRegion = [];
            $scope.offer.delivery = {};
            $scope.offer.capping = {
                number: null,
                frequencie: null
            };
            
            
            $scope.offer.delivery.sponsoring = {};
            $scope.offer.delivery.survey = {};
            $scope.offer.delivery.questionHall = {};
            $scope.offer.delivery.balcony = {};
            
            $scope.offer.mainQuestion = {
                title: '',
                description: '',
                answerList:[{
                    answer: "",
                    action: null,
                    questions: []
                }]
            };


            $scope.offer.delivery.questionHall.isUploadImage = true;
            $scope.offer.delivery.balcony.isUploadImage = true;
            $scope.offer.delivery.survey.isUploadImage = true;
            $scope.offer.delivery.sponsoring.isUploadImage = true;




            $scope.getAffiliationName = function(affIndex){

               var affSearch = _.find($scope.affiliation, function (o) { return o._id === affIndex; });
               return affSearch.name;

            };



            $scope.setAffiliationDelivery = function(item, index){

                var isSponsoring = item.isSponsoring;
                var isSurvey = item.isSurvey;
                var isQuestionHall = item.isQuestionHall;
                var isBalcony = item.isBalcony;

                console.log('');
                console.log('isSponsoring', isSponsoring);
                console.log('isSurvey', isSurvey);
                console.log('isQuestionHall', isQuestionHall);
                console.log('isBalcony', isBalcony);

                $scope.offer.affiliationData[index].delivery = [];

                if(isSponsoring){
                    $scope.offer.affiliationData[index].delivery.push({
                        offerType: 'sponsoring',
                        urlType: '',
                        url: '',
                        image: ''
                    });
                }

                if(isSurvey){
                    $scope.offer.affiliationData[index].delivery.push({
                        offerType: 'survey',
                        urlType: '',
                        url: '',
                        image: ''
                    });
                }

                if(isQuestionHall){
                    $scope.offer.affiliationData[index].delivery.push({
                        offerType: 'questionHall',
                        urlType: '',
                        url: '',
                        image: ''
                    });
                }

                if(isBalcony){
                    $scope.offer.affiliationData[index].delivery.push({
                        offerType: 'balcony',
                        urlType: '',
                        url: '',
                        image: ''
                    });
                }


                console.log($scope.offer.affiliationData[index].delivery);
            };




            $scope.filter = function(){

                var filterObj = {

                    action: 'filter',
                    affiliation: $scope.filter.affiliationFilter,
                    offerType: $scope.filter.offerTypeFilter,
                    dateFilter: {
                        type: $scope.filter.dateFilterType,
                        dateStart: $scope.buildDateParam($scope.filter.dateStartFilter),
                        dateEnd: $scope.buildDateParam($scope.filter.dateEndFilter)
                    }

                };


                Offer.filter(filterObj).then(function(data){



                });
            };


            $scope.buildDateParam = function(dateParam){

                if(dateParam){
                
                    return dateParam.getFullYear()+'-'+(dateParam.getMonth()+1)+'-'+dateParam.getDate();    
                
                }else{
                     return null;
                }

                
            }


            $scope.filterByAffiliation = function(){
                
                Offer.list().then(function(data){

                    if($scope.affiliationFilter === 'all'){
                        $scope.domainList = $scope.buildDomainList(data); 
                        $scope.offers = $scope.domainList;
                        $scope.initListGrid(); 
                        return null;
                    }
                    
                    var domainListFilter = [];

                    for(var x=0; x<data.length; x++){

                        for(var y=0; y<data[x].affiliation.length; y++){

                            if(data[x].affiliation[y]._id === $scope.affiliationFilter){
                                domainListFilter.push(data[x]);
                            }  
                        }                            
                    }

                    $scope.domainList = $scope.buildDomainList(domainListFilter); 
                    $scope.offers = $scope.domainList;
                    $scope.filterByOfferTypeAndStatus();
                    $scope.initListGrid();
                });
            };




            $scope.initWizard = function(){

                $scope.wizard = {

                    currentStep : 0,
                    currentTemplate : 'app/offers/offers_new_step_1.html',

                    buttonNextStatus : 'enabled',
                    buttonPreviousStatus: 'disabled',
                    isButtonFinishVisible: 'display: none;',

                    steps: [
                        {
                            status: 'enabled',
                            template : 'app/offers/offers_new_step_1.html',
                            headerClass: 'first current'
                        },
                        {
                            status: 'disabled',
                            template : 'app/offers/offers_new_step_2.html',
                            headerClass: 'disabled'
                        },
                        {
                            status: 'disabled',
                            template : 'app/offers/offers_new_step_3.html',
                            headerClass: 'disabled'
                        }
                    ]

                };
            };

            $scope.initWizard();




            /**
             * List
             */
            if($location.path() === '/offers'){

                Offer.list().then(function(data){

                    if(data.length > 0){
                        $scope.domainList = $scope.buildDomainList(data);
                        $scope.offers = $scope.domainList;
                        
                        //console.log('offers', $scope.offers);
                        $scope.header = ['name' ,'acceptance', 'refusal', 'impressions','status'];
                        $scope.filterByOfferTypeAndStatus();
                        
                        
                        $scope.initListGrid();    
                    }
                    

                });
            }




            /**
             * Build de domain list grid
             */
            $scope.buildDomainList = function(data){

                var affiliationNames = [];
                var domainList = [];
                var clicks = 0;
                var impressions = 0;
                var acceptanceRate = {
                    acceptance: 0,
                    refusal: 0,
                    total: 0
                };
                
                for(var x=0; x<data.length; x++){

                    affiliationNames = [];

                    for (var y=0; y<data[x].affiliation.length; y++) { 
                        affiliationNames.push(data[x].affiliation[y].name)
                    }

                    impressions = $scope.getTotalClicksImpressions(data[x].stats.impressions);
                    acceptanceRate = $scope.getAcepptanceRate(data[x].stats.acceptance);

                    domainList.push({
                        _id: data[x]._id,
                        name: data[x].name,
                        affiliation: affiliationNames.toString().replace(',',', '),
                        eCPM: '0',
                        //clicks: clicks,
                        acceptance: $scope.getRate(acceptanceRate.acceptance, acceptanceRate.total),
                        refusal: $scope.getRate(acceptanceRate.refusal, acceptanceRate.total),
                        status: data[x].status,
                        impressions: impressions,
                        conversions: '0',
                        offersType: {
                            isSponsoring: data[x].isSponsoring,
                            isSurvey: data[x].isSurvey,
                            isQuestionHall: data[x].isQuestionHall,
                            isBalcony: data[x].isBalcony
                        }
                    });
                }

                return domainList;
            };




            $scope.getTotalClicksImpressions = function(list){

                var total = 0;

                if(!list || (list.length === 0)){
                    return 0;
                }

                lodash.forEach(list, function(item, key) {
                    total += item.count;
                });

                return total;

            };


            $scope.getAcepptanceRate = function(acceptanceList){

                var totalAcceptance = 0;
                var totalRefusal = 0;

                if(!acceptanceList || (acceptanceList.length === 0)){
                    
                    return {
                        acceptance: 0,
                        refusal: 0,
                        total: 0
                    };
                }
             
                lodash.forEach(acceptanceList, function(item, key) {
                    totalAcceptance += item.acceptanceCount;
                    totalRefusal += item.refusalCount;
                });
                
                return {
                    acceptance: totalAcceptance,
                    refusal: totalRefusal,
                    total: (totalAcceptance+totalRefusal)
                };
            };



            $scope.getRate = function(number, total){

                if(!number){
                    return '0%';
                }
                
                var rate = Math.round((number/total)*100);

                return rate+'% ('+number+')';
            };



            /**
             * New
             */
            $scope.new = function(){
                $location.path('/offers/new');
            };





            /**
             * Filter By Offer Type
             */
            $scope.filterByOfferTypeAndStatus = function(){

                /*var offersFiltered = [];

                for(var x=0; x<$scope.offers.length; x++){

                    if($scope.isSponsoring){
                        if($scope.offers[x].offersType.isSponsoring){
                            offersFiltered.push($scope.offers[x]);
                        } 
                    }

                    if($scope.isSurvey){
                        if($scope.offers[x].offersType.isSurvey){
                            offersFiltered.push($scope.offers[x]);
                        } 
                    }

                    if($scope.isQuestionHall){
                        if($scope.offers[x].offersType.isQuestionHall){
                            offersFiltered.push($scope.offers[x]);
                        } 
                    }

                    if($scope.isBalcony){
                        if($scope.offers[x].offersType.isBalcony){
                            offersFiltered.push($scope.offers[x]);
                        } 
                    }
                    
                }
                
                offersFiltered = _.uniqBy(offersFiltered, function (e) {
                    return e._id;
                });*/

                var offersFiltered = $scope.offers;

                $scope.domainList = $scope.filterByStatus(offersFiltered);
                $scope.initListGrid();

            };



            /**
             * Filter By Status
             */
            $scope.filterByStatus = function(offers){

                var offersFiltered = [];

                for(var x=0; x<offers.length; x++){

                    if(offers[x].status === $scope.statusFilter){
                        offersFiltered.push(offers[x]);
                    }
                }

                return offersFiltered;
            };






            /**
             * Edit
             */
            if($location.path() === '/offers/edit'){

                Offer.find($location.search().id).then(function(data){

                    console.log('data', data);

                    $scope.isEdit = true;
                    $scope.offer = data;
                    $scope.dynamicSegmentation = $scope.offer.segmentation.dynamicSegmentation;

                    $scope.affiliationChanged = {
                        status : false,
                        oldValue : $scope.offer.affiliation
                    };


                });
            }



            $scope.updateAffiliationChanged = function(){

                $scope.affiliationChanged.status = 
                    ($scope.affiliationChanged.oldValue !== $scope.offer.affiliation) ? true : false;

            };


            $scope.edit = function(id){
                $location.path('/offers/edit').search({id:id});
            };


            $scope.details = function(id){
                $location.path('/offers/details').search({id:id});
            };







            /**
             * Delete
             * @param ev
             * @param id
             */
            $scope.delete = function(ev, id){

                var confirm = $mdDialog.confirm()
                    .title('Would you like to delete this record ?')
                    .targetEvent(ev)
                    .ok('Yes')
                    .cancel('No');

                $mdDialog.show(confirm).then(function() {
                    Offer.delete(id).then(function(data){

                        logger.logSuccess("Offer <b>"+data.name+"</b> has been <b>REMOVED</b> !!!");

                        $scope.domainList = [];

                        Offer.list().then(function(data){

                            for(var x=0; x<data.length; x++){

                                $scope.domainList.push({
                                    _id : data[x]._id,
                                    name: data[x].name,
                                    eCPM: '0',
                                    clicks: '0',
                                    impressions: '0',
                                    conversions: '0'
                                });
                            }

                            $scope.header = ['name', 'eCPM', 'clicks', 'impressions','conversions'];
                            $scope.initListGrid();

                        });
                    });

                }, function() { });

            };



            $scope.isValid = function(step){
                return (OfferValidator.validate(step, $scope.offer));
            };




            /**
             * Show the next step in wizard
             * @returns {null}
             */
            $scope.next = function(){

                var step = $scope.wizard.currentStep;

                if(!$scope.isValid(step)) return null;


                if(step === 2){
                    return null;
                }

                $scope.wizard.currentStep += 1;
                $scope.nextHeader(step);
                $scope.nextTemplate(step);
                $scope.enablePreviousButton();

                if(step === 1){

                    $scope.disableNextButton();
                    $scope.enableFinishButton();
                    return null;
                }
            };


            /**
             * Build the obj to persist in dynamic Segmentation
             * @returns {Array}
             */
            $scope.buildDynamicSegmentationForPersist = function (){

                var objReturn = [];
                for(var x=0; x<$scope.dynamicSegmentation.length; x++){
                    objReturn.push($scope.dynamicSegmentation[x]._id);
                }

                return objReturn;
            };



            $scope.uploadFile = function (file, itemDelivery) {

                Upload.upload({
                
                    url: '/api/upload', 
                    data:{
                        file:file,
                    } 
                
                }).then(function (resp) { 
                    
                    if(resp.data.error_code === 0){ 
                        itemDelivery.image = 'http://cdn.insideoffers.com.br/'+resp.config.data.file.name;
                        //$scope.setImageOfferType(resp.config.data.file.name, itemDelivery);
                    }
                });
            };


            $scope.setImageOfferType = function (file_name, itemDelivery){

                

                /*switch(offerType){

                    case 'sponsoring':
                        
                        $scope.offer.delivery.sponsoring.largeImage = 'http://cdn.insideoffers.com.br/'+file_name;
                        $scope.isImageSponsoring = true;
                    
                    break;

                    case 'survey':
                        
                        $scope.offer.delivery.survey.smallImage = 'http://cdn.insideoffers.com.br/'+file_name;
                        $scope.isImageSurvey = true;

                    break;

                    case 'questionHall':

                        $scope.offer.delivery.questionHall.largeImage = 'http://cdn.insideoffers.com.br/'+file_name;
                        $scope.isImageQuestionHall = true;

                    break;

                    case 'balcony':

                        $scope.offer.delivery.balcony.largeImage = 'http://cdn.insideoffers.com.br/'+file_name;
                        $scope.isImageBalcony = true;
                    
                    break;
                }*/

            };


            /*$scope.removeAffiliationField = function(){

                if($scope.affiliationEdit.length > 0){
                    $scope.affiliationEdit.pop();
                
                }else{
                    
                    var affToDelete = $scope.offer.affiliation.pop();
                    $scope.affiliationToDeleteOfferMyhall.push(affToDelete);
                }
         
                
            };


            $scope.addAffiliationField = function(){

                if($scope.isEdit){
                    $scope.affiliationEdit.push({});
                }else{
                    $scope.offer.affiliation.push({});
                }

                $scope.offer.delivery.sponsoring.affiliationURL = { affiliation: '', url: ''};
                $scope.offer.delivery.survey.affiliationURL = { affiliation: '', url: ''};
                $scope.offer.delivery.questionHall.affiliationURL = { affiliation: '', url: ''};
                $scope.offer.delivery.balcony.affiliationURL = { affiliation: '', url: ''};
            };*/




            $scope.addAffiliationData = function(){
                $scope.offer.affiliationData.push({});
            };


            $scope.removeAffiliationData = function(index){

                $scope.affiliationToDeleteOfferMyhall.push(
                    $scope.offer.affiliationData[index].affiliation);

                $scope.offer.affiliationData.splice(index, 1);
                
            };






            
            $scope.update = function(){

                $scope.offer.segmentation.dynamicSegmentation = 
                    $scope.buildDynamicSegmentationForPersist();
                
                for(var x=0; x<$scope.affiliationEdit.length; x++){
                    $scope.offer.affiliation.push($scope.affiliationEdit[x]);
                }



                Offer.update($scope.offer).then(function(data){

                    Offer.find(data._id).then(function(data){

                        $scope.isEdit = true;
                        $scope.offer = data;
                        $scope.dynamicSegmentation = $scope.offer.segmentation.dynamicSegmentation;

   
                        if($scope.affiliationToDeleteOfferMyhall.length > 0){

                            for(var x=0;x<$scope.affiliationToDeleteOfferMyhall.length; x++){
                                
                                if(!_.isEmpty($scope.affiliationToDeleteOfferMyhall[x])){
                                    MyHall.deleteOfferFromAffiliation(
                                        $scope.offer._id, $scope.affiliationToDeleteOfferMyhall[x]);
                                }
                            }
                        }
                            
                        
                        $scope.affiliationEdit = [];
                        $scope.affiliationToDeleteOfferMyhall = [];

                        logger.logSuccess("Offer <b>" + data.name + "</b> has been <b>UPDATED</b> !!!");
                        $scope.initWizard();

                    });

                });
            };


            /**
             * Insert a new offer
             * @returns {null}
             */
            $scope.finish = function(){

                if(!$scope.isValid($scope.wizard.currentStep)) return null;

                $scope.offer.status = true;
                $scope.offer.segmentation.dynamicSegmentation = $scope.buildDynamicSegmentationForPersist();

                console.log('$scope.offer', $scope.offer)

                Offer.create($scope.offer).then(function(data){

                    console.log('data', data)


                    if(data){
                        logger.logSuccess("Offer <b>"+data.name+"</b> has been <b>CREATED</b> !!!");
                        $location.path('/offers');
                    }
                });
            };


            $scope.previous = function(){

                var step = $scope.wizard.currentStep;

                if(step === 0){
                    return null;
                };

                $scope.wizard.currentStep -= 1;
                $scope.disableFinishButton();
                $scope.enableNextButton();
                $scope.enablePreviousButton();
                $scope.previousHeader(step);
                $scope.previousTemplate(step);

                if(step === 1){
                    $scope.disablePreviousButton();
                }
            };







            /* ------------------------------------------------------------------------------------ */
            /**
             * MODALS
             */


            /**
             * Main function to open the modals in offers wizard
             * @param type
             */
            $scope.openModal = function (type,  affIndex, deliveryIndex) {

               
                switch (type){

                    case 'dynamicQuestion':
                        $scope.openModalDynimicQuestions();
                        break;

                    case 'buildDeliveryURL':
                        
                        
                        $scope.openModalDeliveryURL(
                            $scope.offer.affiliationData[affIndex].delivery[deliveryIndex].url, 
                            affIndex, 
                            deliveryIndex);
                        
                        break;
                }
            };


            /**
             * Open the dynamic question modal
             */
            $scope.openModalDynimicQuestions = function () {


                Questions.list().then(function(data){

                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'myModalContent.html',
                        controller: 'OffersWizardModalDynamicQuestionCtrl',
                        size: 'lg',
                        backdrop  : 'static',
                        keyboard  : false,
                        resolve: {
                            itemsModal: function () {
                                return data;
                            },
                            selectedItems: function () {
                                return $scope.dynamicSegmentation;
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedItems) {
                        $scope.dynamicSegmentation = selectedItems;
                    }, function () { });

                });

            };


            /**
             * Open the modal that wil construct the URL for delivery
             */
            $scope.openModalDeliveryURL = function (url, affIndex, deliveryIndex) {

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modalBuildURLContent.html',
                    controller: 'OffersWizardModalBuildURLCtrl',
                    size: 'lg',
                    backdrop  : 'static',
                    keyboard  : false,
                    resolve: { 

                        offerTypeDelivery: function () {
                            return $scope.offer.affiliationData[affIndex].delivery[deliveryIndex];
                        },
                        
                        url : function(){
                            return url;
                        }
                    }
                });

                modalInstance.result.then(function (obj) {

                    $scope.offer.affiliationData[affIndex].delivery[deliveryIndex].url = obj.url;
                    $scope.offer.affiliationData[affIndex].delivery[deliveryIndex].gender = obj.gender;
                    $scope.offer.affiliationData[affIndex].delivery[deliveryIndex].birthDate = obj.birthDate;

                    console.log('affiliationData.delivery', $scope.offer.affiliationData[affIndex].delivery[deliveryIndex]);
                    
                }, function () {});
            };





            /* ------------------------------------------------------------------------------------ */
            /**
             * QUESTIONS
             */

            $scope.removeItem = function(index) {
                $scope.offer.mainQuestion.answerList.splice(index, 1);
            };



            $scope.newAnswer = function() {
                $scope.offer.mainQuestion.answerList.push({
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



            $scope.showConfirmUserFields = function(index){

                $scope.cleanActions(index);
                $scope.offer.mainQuestion.answerList[index].action.textConfirmation ='';
                $scope.offer.mainQuestion.answerList[index].action.field = null;

                angular.element(document.getElementById('confirmUserFields_'+index)).css('display', 'flex');
            };



            $scope.showInputNewField = function(index){

                $scope.cleanActions(index);
                $scope.offer.mainQuestion.answerList[index].action.textInput = '';
                $scope.offer.mainQuestion.answerList[index].action.fieldTag = null;

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
                //var el = $compile('<question data="'+item+'" key='+subQuestionId+'"/>')($scope);
                //angular.element(document.getElementById(div)).append(el);


                $templateRequest('app/offers/offers_question.html').then(function(html){
                    
                    var template = angular.element(html);
                    //element.append(template);
                    //$compile(template)(scope);
                    
                    console.log('template', template);
                    
                    var el = $compile(template)($scope);
                    angular.element(document.getElementById(div)).append(el);

                });


            };






            $scope.disableNextButton = function(){
                $scope.wizard.buttonNextStatus = 'disabled';
            };

            $scope.enableNextButton = function(){
                $scope.wizard.buttonNextStatus = 'enabled';
            };

            $scope.disablePreviousButton = function(){
                $scope.wizard.buttonPreviousStatus = 'disabled';
            };

            $scope.enablePreviousButton = function(){
                $scope.wizard.buttonPreviousStatus = 'enabled';
            };

            $scope.enableFinishButton = function(){
                $scope.wizard.isButtonFinishVisible = 'display: block;';
            };

            $scope.disableFinishButton = function(){
                $scope.wizard.isButtonFinishVisible = 'display: none;';
            };

            $scope.nextHeader = function(step){
                $scope.wizard.steps[step].headerClass = 'disabled';
                $scope.wizard.steps[step+1].headerClass = 'first current';
            };

            $scope.previousHeader = function(step){
                $scope.wizard.steps[step].headerClass = 'disabled';
                $scope.wizard.steps[step-1].headerClass = 'first current';
            };

            $scope.nextTemplate = function(step){
                $scope.wizard.currentTemplate = $scope.wizard.steps[step+1].template;
            };

            $scope.previousTemplate = function(step){
                $scope.wizard.currentTemplate = $scope.wizard.steps[step-1].template;
            };


        }

    })();
