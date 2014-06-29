/**
 * Application base
 * @author Martin Vach
 */

//Define an angular module for our app
var angApp = angular.module('angApp', [
    'ngRoute',
    'ngCookies',
    'appController',
    'appFactory',
    'appConfig',
    'appLang'
]);

//Define Routing for app
angApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                // Home
                when('/', {
                    templateUrl: 'app/views/home.html'
                }).
                // Test
                when('/test', {
                    templateUrl: 'app/views/test.html'
                }).
                // Products
                when('/products/:filter?/:val?', {
                    templateUrl: 'app/views/products.html'
                }).
                // Product table
                when('/overview', {
                    templateUrl: 'app/views/product-overview.html'
                }).
                // Product detail
                when('/product/:sku', {
                    templateUrl: 'app/views/product-detail.html'
                }).
                // Vendors
                when('/vendors', {
                    templateUrl: 'app/views/vendors.html'
                }).
                // Categories
                when('/categories', {
                    templateUrl: 'app/views/categories.html'
                }).
                // Manual
                when('/manual', {
                    templateUrl: 'app/views/manual.html'
                }).
                otherwise({
                    redirectTo: '/'
                });
    }]);


