(function () {

    'use strict';

    angular.module('app')
        .service('OfferValidator', ['logger', 'lodash', 'QuestionValidator', OfferValidator])

    function OfferValidator(logger, lodash, QuestionValidator) {

        var _ = lodash;

        /**
         * The main validation of a Offer Wizard
         * @param step
         * @param offer
         */
        this.validate = function(step, offer){

            switch(step){

                case 0:
                    return this.validateStepOne(offer);
                    break;

                case 1:
                    return true;
                    break;

                case 2:
                    return true;
                    //return this.validateStepThree(offer);
                    break;
            }
        };


        /**
         * Function responsible to validate the step 1 of wizard
         * @param offer
         * @returns {boolean}
         */
        this.validateStepOne = function(offer){


            if (!this.validateOfferDetails(offer)) {
                return false;
            }

            if (!QuestionValidator.validateMainQuestion(offer.mainQuestion)) {
                return false;
            }


            /*if (offer.isSurvey || offer.isQuestionHall || offer.isBalcony) {

                if (!QuestionValidator.validateMainQuestion(offer.mainQuestion)) {
                    return false;
                }
            }*/

            return true;
        };


        /**
         * Validate the details tab of a offer wizard
         * @param offer
         * @returns {boolean}
         */
        this.validateOfferDetails = function (offer) {


            if(_.isEmpty(offer.affiliationData[0].affiliation)){
                logger.logError("Please select an <b>Affiliation</b>");
                return false;
            }


            if (!offer.codeProvider) {
                logger.logError("Please put the <b>HO Code</b>");
                $('#codeProvider').focus();
                return false;

            }

            if (!offer.name) {
                logger.logError("Please select a <b>Offer Name</b>");
                $('#offerName').focus();
                return false;
            }


            /*if (!offer.affiliation) {
                logger.logError("Please select an Affiliation");
                $('#affiliation').focus();
                return false;
            }*/

            /*if (_.isEmpty(offer.capping.number)) {
                logger.logError("Please select a <b>Capping</b>");
                $('#capping').focus();
                return false;
            }

            if (_.isEmpty(offer.capping.frequencie)) {
                logger.logError("Please select a <b>Frequencie</b>");
                $('#frequencie').focus();
                return false;
            }*/



            return true;
        };


        /**
         * Responsible to validate the third step of a wizard
         * @param offer
         */
        this.validateStepThree = function (offer) {


            if (offer.isSponsoring) {

                if (!offer.delivery.sponsoring.wsUrl) {
                    logger.logError("Please fill a <b>Sponsoring Webservice URL</b>");
                    $('#wsUrlSponsor').focus();
                    return false;
                }
            }


            if (offer.isSurvey) {

                if(!offer.delivery.survey.type){
                    logger.logError("Please select a <b>Survey Delivery Type</b>");
                    $('#surveyType').focus();
                    return false;

                }else{

                    if(offer.delivery.survey.type === 'ws'){
                        if (!offer.delivery.survey.wsUrl) {
                            logger.logError("Please fill a <b>Survey Webservice URL</b>");
                            $('#wsUrlSurvey').focus();
                            return false;
                        }

                    } else if (offer.delivery.survey.type === 'tb'){
                        if (!offer.delivery.survey.targetBlankUrl) {
                            logger.logError("Please fill a <b>Survey Target Blank URL</b>");
                            $('#targetBlankUrlSurvey').focus();
                            return false;
                        }

                    }
                }

            }


            if (offer.isQuestionHall) {

                if(!offer.delivery.questionHall.type){
                    logger.logError("Please select a <b>Question Hall Delivery Type</b>");
                    $('#questionHallType').focus();
                    return false;

                }else{

                    if(offer.delivery.questionHall.type === 'ws'){
                        if (!offer.delivery.questionHall.wsUrl) {
                            logger.logError("Please fill a <b>Question Hall Webservice URL</b>");
                            $('#wsUrlQuenstionHall').focus();
                            return false;
                        }

                    } else if (offer.delivery.questionHall.type === 'tb'){
                        if (!offer.delivery.questionHall.targetBlankUrl) {
                            logger.logError("Please fill a <b>Question Hall Target Blank URL</b>");
                            $('#targetBlankUrlQuestionHall').focus();
                            return false;
                        }

                    }

                }


                if (!offer.delivery.questionHall.largeImage) {
                    logger.logError("Please fill a <b>Question Hall Image</b>");
                    $('#smallImageQuestionHall').focus();
                    return false;
                }

            }


            if (offer.isBalcony) {

                if(!offer.delivery.balcony.type){
                    logger.logError("Please select a <b>Balcony Delivery Type</b>");
                    $('#balconyType').focus();
                    return false;

                }else{

                    if(offer.delivery.balcony.type === 'ws'){
                        if (!offer.delivery.balcony.wsUrl) {
                            logger.logError("Please fill a <b>Balcony Webservice URL</b>");
                            $('#wsUrlBalcony').focus();
                            return false;
                        }

                    } else if (offer.delivery.balcony.type === 'tb'){
                        if (!offer.delivery.balcony.targetBlankUrl) {
                            logger.logError("Please fill a <b>Balcony Target Blank URL</b>");
                            $('#targetBlankUrlBalcony').focus();
                            return false;
                        }

                    }
                }

                if (!offer.delivery.balcony.largeImage) {
                    logger.logError("Please fill a <b>Balcony Image</b>");
                    $('#largeImageBalcony ').focus();
                    return false;
                }
            }

            return true;
        };

        return this;
    }
})();
