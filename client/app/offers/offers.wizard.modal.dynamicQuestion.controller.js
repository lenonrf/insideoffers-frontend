(function () {
    'use strict';

    angular.module('app')
        .controller('OffersWizardModalDynamicQuestionCtrl', [ '$scope',
            '$uibModalInstance', 'itemsModal', 'selectedItems', OffersWizardModalDynamicQuestionCtrl])

    function OffersWizardModalDynamicQuestionCtrl($scope, $uibModalInstance, itemsModal, selectedItems) {


        $scope.itemsModal = itemsModal;
        $scope.itemsModalSelected = selectedItems;

        for(var x=0; x<$scope.itemsModalSelected.length; x++){
            for(var y=0; y<$scope.itemsModal.length; y++){

                if($scope.itemsModalSelected[x]._id === $scope.itemsModal[y]._id){
                    $scope.itemsModal[y].isSelected = true;
                }
            }
        }



        /**
         * Define that modal is closed and the data was sended to controller
         */
        $scope.ok = function() {
            $uibModalInstance.close($scope.itemsModalSelected);
        };


        /**
         * Cancel the modal
         */
        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
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

    }
})();
