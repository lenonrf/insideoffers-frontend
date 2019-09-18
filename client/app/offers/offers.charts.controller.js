    

    (function () {
        'use strict';

        angular.module('app')
            .controller('OffersChatsCtrl', [ 'lodash', '$scope', '$location', 'Offer', 'Affiliation', OffersChatsCtrl]) 
        function OffersChatsCtrl(lodash, $scope, $location, Offer, Affiliation) {

        
            $scope.showChartData = false;
           

            $scope.acceptancePieChart = {
                percent: 1,
                options: {
                    animate: {
                        duration: 1500,
                        enabled: true
                    },
                    barColor: $scope.color.primary,
                    lineCap: 'round',
                    size: 180,
                    lineWidth: 5
                }
            };

            $scope.refusalPieChart = {
                percent: 1,
                options: {
                    size: 180,
                    animate: {
                        duration: 1500,
                        enabled: true
                    },
                    barColor: $scope.color.danger,
                    lineCap: 'round',
                    lineWidth: 5
                }
            };




            $scope.conversionsChart = {};
            $scope.conversionsChart.data = [];
            $scope.conversionsChart.options = {};

            $scope.conversionsChart.data = [
                {
                    data: [],

                    lines: {
                        show: true,
                        fill: true
                    }
                }, {
                    data: [],
                    label: "Conversions",
                    points: {
                        show: true
                    }
                }
            ];



            $scope.conversionsChart.options = {
                series: {
                    
                    points: {
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 4
                    }
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                tooltip: true,
                tooltipOpts: {
                    defaultTheme: true,
                    content: function(label, xval, yval) {
                        var content = "%s: "+ yval;
                        return content;
                    }
                },
                colors: [$scope.color.default, $scope.color.default],

                xaxis: {
                    ticks: []
                }
                
            };



            $scope.clicksCharts = {};
            $scope.clicksCharts.data = [];
            $scope.clicksCharts.options = {};

            $scope.clicksCharts.data = [
                {
                    data: [],

                    lines: {
                        show: true,
                        fill: true
                    }
                }, {
                    data: [],
                    label: "Clicks",
                    points: {
                        show: true
                    }
                }
            ];
            $scope.clicksCharts.options = {
                series: {
                    
                    points: {
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 4
                    }
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                tooltip: true,
                tooltipOpts: {
                    defaultTheme: true,
                    content: function(label, xval, yval) {
                        var content = '%s: '+yval;
                        return content;
                    }
                },
                colors: [$scope.color.success, $scope.color.success],

                xaxis: {
                    ticks: []
                }
            };




           
            $scope.revenueChart = {};
            $scope.revenueChart.data = [];
            $scope.revenueChart.options = {};

            $scope.revenueChart.data = [
                {
                    data: [],

                    lines: {
                        show: true,
                        fill: true
                    }
                }, {
                    data: [],
                    label: "Revenue",
                    points: {
                        show: true
                    }
                }
            ];
            $scope.revenueChart.options = {
                series: {
                    
                    points: {
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 4
                    }
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                tooltip: true,
                tooltipOpts: {
                    defaultTheme: true,
                    content: function(label, xval, yval) {
                        var content = '%s: R$ '+yval.toFixed(2);
                        return content;
                    }
                },
                colors: [$scope.color.success, $scope.color.success],

                xaxis: {
                    ticks: []
                }
            };


            $scope.cpcChart = {};
            $scope.cpcChart.data = [];
            $scope.cpcChart.options = {};

            $scope.cpcChart.data = [
                {
                    data: [],

                    lines: {
                        show: true,
                        fill: true
                    }
                }, {
                    data: [],
                    label: "CPC",
                    points: {
                        show: true
                    }
                }
            ];
            $scope.cpcChart.options = {
                series: {
                    
                    points: {
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 4
                    },
                    lines: { show: true }
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                tooltip: true,
                tooltipOpts: {
                    defaultTheme: true,
                    content: function(label, xval, yval) {
                        var content = '%s: R$ '+yval.toFixed(3);
                        return content;
                    }
                },
                colors: [$scope.color.primary, $scope.color.primary],

                xaxis: {
                    show: true,
                    ticks: []
                }
            };

            $scope.offerTypeChart = {};
            $scope.offerTypeChart.data = [];
            
            $scope.offerTypeChart.options = {
                    series: {
                        pie: {
                            show: true,
                            innerRadius: 0.55
                        }
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        hoverable: true,
                        clickable: true
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: "%p.0%, %s",
                        defaultTheme: false
                    }
                };

            $scope.showOfferTypeChart = false;



            $scope.offerAcceptanceRefusalChart = {};
            $scope.offerAcceptanceRefusalChart.data = [];
            
            $scope.offerAcceptanceRefusalChart.options = {
                    series: {
                        pie: {
                            show: true,
                            innerRadius: 0.55
                        }
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        hoverable: true,
                        clickable: true
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: "%p.0%, %s",
                        defaultTheme: false
                    }
                };









            $scope.filterOfferCustom = function(dateFilterType, dateStartFilter, dateEndFilter){

                var dateRange = {
                            dateStart : $scope.formatDateToProvider(dateStartFilter),
                            dateEnd : $scope.formatDateToProvider(dateEndFilter)
                        }
              
                $scope.showChartData = false;
                $scope.showOfferTypeChart = false;
                $scope.offerTypeChart.data = [];

                Offer.findWithStats($location.search().id, 
                    dateRange.dateStart, dateRange.dateEnd).then(function(data){

                    $scope.offer = data;
                    $scope.showDataChart($scope.offer);
                            
                });


                Offer.getStatsFromOfferType($location.search().id,
                    dateRange.dateStart, dateRange.dateEnd).then(function(data){


                    for (var x = 0; x < data.length; x++) {
                        
                        $scope.offerTypeChart.data.push({
                            label: data[x].origin,
                            data: data[x].count
                        });
                    }
                    
                    $scope.showOfferTypeChart = true;
                    console.log('getStatsFromOfferType', data);
                 
                });
            };



            $scope.filterOfferType = function(dateFilterType){

                if(dateFilterType === 'custom'){
                    return null;
                }

                if(!$scope.offer){
                    return null;
                }

                $scope.showChartData = false;
                $scope.showOfferTypeChart = false;
                $scope.offerTypeChart.data = [];

                var dateRange = $scope.getDateRange(dateFilterType);

                Offer.findWithStats($location.search().id, 
                    dateRange.dateStart, dateRange.dateEnd).then(function(data){

                    $scope.offer = data;
                    $scope.showDataChart($scope.offer);
                   
                    
                });


                Offer.getStatsFromOfferType($location.search().id,
                    dateRange.dateStart, dateRange.dateEnd).then(function(data){


                    for (var x = 0; x < data.length; x++) {
                        
                        $scope.offerTypeChart.data.push({
                            label: data[x].origin,
                            data: data[x].count
                        });
                    }
                    
                    $scope.showOfferTypeChart = true;
                    console.log('getStatsFromOfferType', data);
                 
                });


              
            };



            $scope.getDateRange = function(dateFilterType){

                switch(dateFilterType){

                    case 'today':
      
                        return {
                            dateStart : $scope.formatDateToProvider(new Date()),
                            dateEnd : $scope.formatDateToProvider(new Date())
                        }

                    break;

                    case 'this_month':

                        var date = new Date();
                        var firstDayDate = new Date(date.getFullYear(), date.getMonth(), 1);
                        var lastDayDate = new Date(date.getFullYear(), date.getMonth()+1, 0);

                        return {
                            dateStart : $scope.formatDateToProvider(firstDayDate),
                            dateEnd : $scope.formatDateToProvider(lastDayDate)
                        }

                    break;

                    case 'this_week':

                        var now = new Date();
                        var firstDayWeek = now.getDate() - now.getDay();

                        var dateStart = new Date(now.setDate(firstDayWeek));

                        return {
                            dateStart : $scope.formatDateToProvider(dateStart),
                            dateEnd : $scope.formatDateToProvider(new Date())
                        }

                    break;


                    case 'last_ten_days':

                        var now = new Date();

                        var firstDayDate = new Date();
                        firstDayDate.setDate(firstDayDate.getDate()-10);
                        
                        var lastDayDate = new Date();

                        return {
                            dateStart : $scope.formatDateToProvider(firstDayDate),
                            dateEnd : $scope.formatDateToProvider(lastDayDate)
                        }

                    break;

                    case 'all_time':

                        var date = new Date();
                        var firstDayDate = new Date(date.getFullYear(), date.getMonth(), 1);
                        var lastDayDate = new Date(date.getFullYear(), date.getMonth()+1, 0);
                        
                        return {
                            dateStart : $scope.formatDateToProvider(new Date($scope.offer.created)),
                            dateEnd : $scope.formatDateToProvider(lastDayDate)
                        }
                    
                    break;

                }

            };



            $scope.formatDateToProvider = function(date){

                return (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
            };



            $scope.showDataChart = function(offer){

                $scope.refusalPieChart.percent = offer.stats.refusal;
                $scope.acceptancePieChart.percent = offer.stats.acceptance;

                $scope.offerAcceptanceRefusalChart.data = [
                    {
                        label: 'Refusal',
                        data: offer.stats.refusal
                    },

                    {
                        label: 'Acceptance',
                        data: offer.stats.acceptance
                    },
                ];

                $scope.clicksCharts.data[0].data = [];
                $scope.clicksCharts.data[1].data = [];
                $scope.clicksCharts.options.xaxis.ticks = [];

                $scope.conversionsChart.data[0].data = [];
                $scope.conversionsChart.data[1].data = [];
                $scope.conversionsChart.options.xaxis.ticks = [];
                
                $scope.revenueChart.data[0].data = [];
                $scope.revenueChart.data[1].data = [];
                $scope.revenueChart.options.xaxis.ticks =[];

                $scope.cpcChart.data[0].data = [];
                $scope.cpcChart.data[1].data = [];
                $scope.cpcChart.options.xaxis.ticks =[];


                for(var x=0; x<offer.stats.dateFilter.length; x++){

                    // clicks
                    $scope.clicksCharts.data[0].data[x] = 
                        [x, offer.stats.dateFilter[x].clicks];

                    $scope.clicksCharts.data[1].data[x] = 
                        [x, offer.stats.dateFilter[x].clicks];

                    $scope.clicksCharts.options.xaxis.ticks[x] = 
                        [x, $scope.formatDateGraph(offer.stats.dateFilter[x].date)];


                    // conversion
                    $scope.conversionsChart.data[0].data[x] = 
                        [x, offer.stats.dateFilter[x].conversions];

                    $scope.conversionsChart.data[1].data[x] = 
                        [x, offer.stats.dateFilter[x].conversions];

                    $scope.conversionsChart.options.xaxis.ticks[x] = 
                        [x,  $scope.formatDateGraph(offer.stats.dateFilter[x].date)];

                    // revenue
                    $scope.revenueChart.data[0].data[x] = 
                        [x, offer.stats.dateFilter[x].revenue];

                    $scope.revenueChart.data[1].data[x] = 
                        [x, offer.stats.dateFilter[x].revenue];

                    $scope.revenueChart.options.xaxis.ticks[x] = 
                        [x, $scope.formatDateGraph(offer.stats.dateFilter[x].date)];


                    // cpc
                    $scope.cpcChart.data[0].data[x] = 
                        [x, offer.stats.dateFilter[x].cpc];

                    $scope.cpcChart.data[1].data[x] = 
                        [x, offer.stats.dateFilter[x].cpc];

                    $scope.cpcChart.options.xaxis.ticks[x] = 
                        [x, $scope.formatDateGraph(offer.stats.dateFilter[x].date)];
                

                }


                $scope.showChartData = true;
            };



            $scope.formatDateGraph = function(date){

                var dateSplited = date.split('-');
                return dateSplited[2]+'/'+dateSplited[1];
            };



            /**
             * Details
             */
            if($location.path() === '/offers/details'){

                $scope.showChartData = false;

                var dateRange = $scope.getDateRange('this_month');

                Offer.findWithStats($location.search().id,
                    dateRange.dateStart, dateRange.dateEnd).then(function(data){

                    $scope.offer = data;
                    $scope.showDataChart($scope.offer);
                    
                    console.log('$scope.offer', $scope.offer);
                 
                });


                Offer.getStatsFromOfferType($location.search().id,
                    dateRange.dateStart, dateRange.dateEnd).then(function(data){


                    for (var x = 0; x < data.length; x++) {
                        
                        $scope.offerTypeChart.data.push({
                            label: data[x].origin,
                            data: data[x].count
                        });
                    }
                    
                    $scope.showOfferTypeChart = true;
                    console.log('getStatsFromOfferType', data);
                 
                });


                /*Offer.getStatsFromTraficSource($location.search().id,
                    dateRange.dateStart, dateRange.dateEnd).then(function(data){

                    $scope.offerStatsTrafficSource = data;
                    console.log('getStatsFromTraficSource', data);
                 
                });*/
            }


           








        }

    })();
