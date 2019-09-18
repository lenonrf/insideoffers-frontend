(function () {

    'use strict';

    angular.module('app').directive('listgrid', ['$filter', '$timeout',
        function($filter, $timeout){
            return {

                restrict: 'AE',
                replace: true,
                templateUrl: 'app/core/directives/listgrid.directive.html',

                link: function($scope, elem, attrs) {

                    $scope.domainList = [];
                    $scope.currentPageData = []
                    $scope.searchKeywords = '';
                    $scope.domainListFiltered = [];
                    $scope.row = '';
                    $scope.numPerPageOpt = [3, 5, 10, 20];
                    $scope.numPerPage = $scope.numPerPageOpt[2];
                    $scope.currentPage = 1;
                    $scope.currentPage = [];

                    $scope.select = function select(page) {
                        var end, start;
                        start = (page - 1) * $scope.numPerPage;
                        end = start + $scope.numPerPage;
                        return $scope.currentPageData = $scope.domainListFiltered.slice(start, end);
                    };


                    $scope.onFilterChange = function() {
                        $scope.select(1);
                        $scope.currentPage = 1;
                        return $scope.row = '';
                    };


                    $scope.onNumPerPageChange = function() {
                        $scope.select(1);
                        return $scope.currentPage = 1;
                    };


                    $scope.onOrderChange = function() {
                        $scope.select(1);
                        return $scope.currentPage = 1;
                    };


                    $scope.search = function() {
                        console.log($scope.domainList);
                        $scope.domainListFiltered = $filter('filter')($scope.domainList, $scope.searchKeywords);
                        return $scope.onFilterChange();
                    };


                    $scope.order = function(rowName) {

                        if ($scope.row === rowName) {
                            return;
                        }

                        $scope.row = rowName;
                        $scope.domainListFiltered = $filter('orderBy')($scope.domainList, rowName);

                        return $scope.onOrderChange();
                    };


                    $scope.initListGrid = function() {
                        $scope.search();
                        return $scope.select($scope.currentPage);
                    };

                }
            };
    }])

})();
