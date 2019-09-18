(function () {

    'use strict';

    angular.module('app')
        .service('QuestionValidator', ['logger', QuestionValidator])

    function QuestionValidator(logger) {

        /**
         * Validate the entire structure of a Main Question
         * @param mainQuestion
         * @returns {boolean}
         */
        this.validateMainQuestion = function (mainQuestion) {

            if (!mainQuestion.title) {
                logger.logError("Please select a Main Question Title");
                $('#mainQuestionTitle').focus();
                return false;
            }

            /*if (!mainQuestion.description) {
                logger.logError("Please select a Main Question Description");
                $('#mainQuestionDescription').focus();
                return false;
            }*/

            if (!this.validateAnswerList(mainQuestion)) {
                return false;
            }

            return true;
        };


        /**
         * Validate only the Answer List of a Main Question
         * @param mainQuestion
         * @returns {boolean}
         */
        this.validateAnswerList = function (mainQuestion) {

            if (mainQuestion.answerList.length < 1) {
                logger.logError("Please fill the Answer ");
                $('#mainQuestionAnswer_0').focus();
                return false;
            }

            for (var x = 0; x < mainQuestion.answerList.length; x++) {

                if (!mainQuestion.answerList[x].answer) {
                    logger.logError("Please select a Main Question Answer " + (x + 1));
                    $('#mainQuestionAnswer_'+x).focus();
                    return false;
                }

                if (!mainQuestion.answerList[x].action.type) {
                    logger.logError("Please select a Main Question Action of Answer " + (x + 1));
                    $('#mainQuestionAction_'+x).focus();
                    return false;
                }
            }

            return true;
        };

        return this;
    }
})();
