(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {


            var routes, setRoutes;

            routes = [
                'ui/cards', 'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/timeline', 'ui/lists', 'ui/pricing-tables',
                'map/maps',
                'table/static', 'table/dynamic', 'table/responsive',
                'form/elements', 'form/layouts', 'form/validation', 'form/wizard',
                'chart/charts', 'chart/flot', 'chart/chartjs',
                'page/404', 'page/500', 'page/blank', 'page/forgot-password', 'page/invoice', 'page/lock-screen', 'page/profile', 'page/signin', 'page/signup',
                'app/calendar'
            ]

            setRoutes = function(route) {
                var config, url;
                url = '/' + route;
                config = {
                    url: url,
                    templateUrl: 'app/' + route + '.html'
                };
                $stateProvider.state(route, config);
                return $stateProvider;
            };

            routes.forEach(function(route) {
            return setRoutes(route);
            });



            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'app/core/auth/login.html',
                controller: 'AuthCtrl',
                authenticate: false


            }).state('logout', {
                url: '/logout',
                controller: 'AuthCtrl',
                authenticate: false


            }).state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html',
                authenticate: false


                /**
                 * AFFILIATION
                 */

            }).state('affiliation', {
                url: '/affiliation',
                templateUrl: 'app/affiliation/affiliation.html',
                controller: 'AffiliationCtrl',
                authenticate: false


            }).state('affiliation_new', {
                url: '/affiliation/new',
                templateUrl: 'app/affiliation/affiliation_new.html',
                controller: 'AffiliationCtrl',
                authenticate: false


            }).state('affiliation_edit', {
                url: '/affiliation/edit',
                templateUrl: 'app/affiliation/affiliation_edit.html',
                controller: 'AffiliationCtrl',
                authenticate: false                

                /**
                 * MYHALL
                 */

            }).state('myhall', {
                url: '/myhall',
                templateUrl: 'app/myhall/myhall.html',
                controller: 'MyHallCtrl',
                authenticate: false



                /**
                 * QUESTIONS
                 */

            }).state('questions', {
                url: '/questions',
                templateUrl: 'app/questions/questions.html',
                controller: 'QuestionsCtrl',
                authenticate: false

            }).state('questions_edit', {
                url: '/questions/edit',
                templateUrl: 'app/questions/questions_edit.html',
                controller: 'QuestionsCtrl',
                authenticate: false

            }).state('questions_new', {
                url: '/questions/new',
                templateUrl: 'app/questions/questions_new.html',
                controller: 'QuestionsCtrl',
                authenticate: false



                /**
                 * OFFERS
                 */

            }).state('offers', {
                url: '/offers',
                templateUrl: 'app/offers/offers.html',
                controller: 'OffersCtrl',
                authenticate: false

            }).state('offers_new', {
                url: '/offers/new',
                templateUrl: 'app/offers/offers_new.html',
                controller: 'OffersCtrl',
                authenticate: false

            }).state('offers_edit', {
                url: '/offers/edit',
                templateUrl: 'app/offers/offers_edit.html',
                controller: 'OffersCtrl',
                authenticate: false


            }).state('offers_details', {
                url: '/offers/details',
                templateUrl: 'app/offers/offers_details.html',
                controller: 'OffersChatsCtrl',
                authenticate: false
            


            }).state('index', {
                url: '/',
                templateUrl: 'app/dashboard/dashboard.html',
                //controller: 'OffersCtrl',
                authenticate: false
            });

            $urlRouterProvider.when('/', '/dashboard')
            .otherwise('/dashboard');


            $locationProvider.html5Mode(true);
        }]
    );

})();
