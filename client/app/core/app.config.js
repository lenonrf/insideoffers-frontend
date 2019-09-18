(function() {
    'use strict';

    angular.module('app.core')
    .factory('appConfig', [appConfig])
    .config(['$mdThemingProvider', mdConfig])

    function appConfig() {
        var pageTransitionOpts = [
            {
                name: 'Fade up',
                "class": 'animate-fade-up'
            }, {
                name: 'Scale up',
                "class": 'ainmate-scale-up'
            }, {
                name: 'Slide in from right',
                "class": 'ainmate-slide-in-right'
            }, {
                name: 'Flip Y',
                "class": 'animate-flip-y'
            }
        ];
        var date = new Date();
        var year = date.getFullYear();
        var main = {
            brand: 'Inside Offers',
            name: 'Lisa',
            year: year,
            layout: 'wide',                                 // 'boxed', 'wide'
            menu: 'vertical',                               // 'horizontal', 'vertical', 'collapsed'
            fixedHeader: true,                              // true, false
            fixedSidebar: true,                             // true, false
            pageTransition: pageTransitionOpts[0],          // 0, 1, 2, 3... and build your own
            skin: '12'                                      // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
        };
        var color = {
            primary:    '#009688',
            success:    '#8BC34A',
            info:       '#00BCD4',
            infoAlt:    '#7E57C2',
            warning:    '#FFCA28',
            danger:     '#F44336',
            gray:       '#EDF0F1'
        };

        return {
            pageTransitionOpts: pageTransitionOpts,
            main: main,
            color: color
        }
    }

    function mdConfig($mdThemingProvider) {
        var cyanAlt = $mdThemingProvider.extendPalette('cyan', {
            'contrastLightColors': '500 600 700 800 900',
            'contrastStrongLightColors': '500 600 700 800 900'
        })
        var lightGreenAlt = $mdThemingProvider.extendPalette('light-green', {
            'contrastLightColors': '500 600 700 800 900',
            'contrastStrongLightColors': '500 600 700 800 900'
        })

        $mdThemingProvider
            .definePalette('cyanAlt', cyanAlt)
            .definePalette('lightGreenAlt', lightGreenAlt);


        $mdThemingProvider.theme('default')
            .primaryPalette('teal', {
                'default': '500'
            })
            .accentPalette('cyanAlt', {
                'default': '500'
            })
            .warnPalette('red', {
                'default': '500'
            })
            .backgroundPalette('grey');
    }


})();



(function () {
    'use strict';

    angular.module('app')
        .factory('AuthInterceptor', ['$rootScope', '$q', '$cookieStore', '$location', '$window', AuthInterceptor])
        function AuthInterceptor($rootScope, $q, $cookieStore, $location, $window) {

            return {

                request: function (config) {

                    config.headers = config.headers || {};

                    //console.log("$cookieStore.get('token')", $cookieStore.get('token'));

                    console.log("request",$location.url());

                    if ($cookieStore.get('token')) {

                        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');

                    }else{
                        console.log("login",$location.url(), config.url);
                        $location.path('/login');

                    }

                    return config;
                },

                responseError: function(response) {

                    console.log('error', response.status );

                    if(response.status === 401 || response.status === -1) {

                        $location.path('/login');
                        $cookieStore.remove('token');

                        return $q.reject(response);

                    }else {
                        return $q.reject(response);
                    }
                }
            };
        }

})();


/*(function () {
    'use strict';

    angular.module('app')
        .run(function ($rootScope, $location, Auth) {

            // Redirect to login if route requires auth and you're not logged in

            $rootScope.$on('$stateChangeStart', function (event, next) {
                Auth.isLoggedInAsync(function(loggedIn) {

                    console.log('loggedIn',loggedIn);
                    console.log('(next.authenticate && !loggedIn)',(next.authenticate && !loggedIn));

                    if (next.authenticate && !loggedIn) {
                    //if (!loggedIn) {
                        $location.path('/login');
                    }
                });
            });
        });


})();*/

(function () {
    'use strict';
    
    angular.module("app").run(function ($rootScope, $state, Auth) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

            if (toState.authenticate && !Auth.isLoggedIn()){
                $state.transitionTo("login");
                event.preventDefault(); 
            }
        });
    });
})();



(function () {
    'use strict';


    angular.module('app')
        .config(['$httpProvider', '$translateProvider', function($httpProvider, $translateProvider) {

            $translateProvider.useSanitizeValueStrategy('escapeParameters');
            //$httpProvider.interceptors.push('AuthInterceptor');
        }]);

})();


