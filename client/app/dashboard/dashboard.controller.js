(function () {
    'use strict';

    angular.module('app')
        .controller('DashboardCtrl', [ '$scope', '$location', 'lodash', 'Dashboard', 'Affiliation', 
            'logger', '$mdDialog', DashboardCtrl])

    function DashboardCtrl($scope,  $location, lodash, Dashboard, Affiliation, logger, $mdDialog) {


    		var _ = lodash;

    		$scope.showLoaderRevenueOriginTraffic = false;
    		$scope.showDataRevenueOriginTraffic = false;
    		$scope.showNoDataRevenueOriginTraffic = false;


    		Affiliation.list().then(function(data){
                console.log('affiliation', data);
                $scope.affiliation = data;
            });  

        
            $scope.filterByType = function(affiliationValue, dateFilterType, dateStartFilter, dateEndFilter){

            	$scope.conversionPerTrafficSource = [];
            	$scope.totalRevenue = 0;
	  			$scope.totalPayout = 0;
	  			$scope.totalConvertionsPublisher = 0;
	  			$scope.totalConvertionsHO = 0;
	  			$scope.totalPercentage = 0;

            	
            	if(!affiliationValue){
            		logger.logError("Select a <b>Affiliation</b>");
            		return null;
            	}

            	if(dateFilterType === 'custom'){
            		if(!dateStartFilter){
	            		logger.logError("Select a <b>Date Start</b>");
	            		return null;
	            	}

	            	if(!dateEndFilter){
	            		logger.logError("Select a <b>Date End</b>");
	            		return null;
	            	}
            	}

            	$scope.showNoDataRevenueOriginTraffic = false;
 				$scope.showLoaderRevenueOriginTraffic = true;
  				$scope.showDataRevenueOriginTraffic = true;
                var dateRange = $scope.getDateRange(dateFilterType, dateStartFilter, dateEndFilter);


                Dashboard.listConversionByTrafficSource(affiliationValue,  
                    dateRange.dateStart, dateRange.dateEnd).then(function(data){

                    if(data.dataResult.length === 0){

                    	$scope.showNoDataRevenueOriginTraffic = true;
                    	$scope.showLoaderRevenueOriginTraffic = false;
						return null;
					}

					$scope.showLoaderRevenueOriginTraffic = false;
  					$scope.showDataRevenueOriginTraffic = true;

  					$scope.totalRevenue = 0;
  					$scope.totalPayout = 0;
  					$scope.totalConvertionsPublisher = 0;
  					$scope.totalConvertionsHO = 0;
                    
					console.log(data.dataResult);

					_.forEach(data.dataResult, function(item) {
						
						item.providerPercentage = Math.floor(
							(item.conversionProvider/item.conversionPublisher)*100);

						$scope.totalRevenue += item.revenue;
	  					$scope.totalPayout += item.payout;
	  					$scope.totalConvertionsPublisher += item.conversionPublisher;
	  					$scope.totalConvertionsHO += item.conversionProvider;
					});	

					$scope.totalPercentage = Math.floor(
						($scope.totalConvertionsHO/$scope.totalConvertionsPublisher)*100);

					$scope.conversionPerTrafficSource = 
                    	_.orderBy(data.dataResult, function(e) { return e.revenue}, ['desc']);
                          
                });

            };


            $scope.getDateRange = function(dateFilterType,  dateStartFilter, dateEndFilter){

                switch(dateFilterType){

                    case 'today':
      
                        return {
                            dateStart : $scope.formatDateToUrl(new Date()),
                            dateEnd : $scope.formatDateToUrl(new Date())
                        }

                    break;

                    case 'this_month':

                        var date = new Date();
                        var firstDayDate = new Date(date.getFullYear(), date.getMonth(), 1);
                        var lastDayDate = new Date(date.getFullYear(), date.getMonth()+1, 0);

                        return {
                            dateStart : $scope.formatDateToUrl(firstDayDate),
                            dateEnd : $scope.formatDateToUrl(lastDayDate)
                        }

                    break;

                    case 'this_week':

                        var now = new Date();
                        var firstDayWeek = now.getDate() - now.getDay();

                        var dateStart = new Date(now.setDate(firstDayWeek));

                        return {
                            dateStart : $scope.formatDateToUrl(dateStart),
                            dateEnd : $scope.formatDateToUrl(new Date())
                        }

                    break;


                    case 'last_ten_days':

                        var now = new Date();

                        var firstDayDate = new Date();
                        firstDayDate.setDate(firstDayDate.getDate()-10);
                        
                        var lastDayDate = new Date();

                        return {
                            dateStart : $scope.formatDateToUrl(firstDayDate),
                            dateEnd : $scope.formatDateToUrl(lastDayDate)
                        }

                    break;

                    case 'all_time':

                        var date = new Date();
                        var firstDayDate = new Date(date.getFullYear(), date.getMonth(), 1);
                        var lastDayDate = new Date(date.getFullYear(), date.getMonth()+1, 0);
                        
                        return {
                            dateStart : $scope.formatDateToUrl(new Date($scope.offer.created)),
                            dateEnd : $scope.formatDateToUrl(lastDayDate)
                        }

                    case 'custom':

                    	console.log(dateStartFilter);
                     
                        return {
                            dateStart : $scope.formatDateToUrl(dateStartFilter),
                            dateEnd : $scope.formatDateToUrl(dateEndFilter)
                        }
                    
                    break;

                }

            };



            $scope.formatDateToUrl = function(date){

                return date.getFullYear()+'-'+("0"+(date.getMonth()+1)).slice(-2)+'-'+("0"+date.getDate()).slice(-2);
            };


    }
})();
