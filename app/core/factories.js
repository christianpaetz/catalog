/**
 * Application factories
 * @author Martin Vach
 */

var appFactory = angular.module('appFactory', ['ngResource']);

// Get data from the server as object
appFactory.factory('DataFactory', function($resource, cfg) {
    return {
        get: function(param) {
            return $resource(cfg.server_url + param, {}, {query: {
                    method: 'GET',
                    params: {},
                    isArray: false
                }});
        }
    };
});

// Get data from the server as array
appFactory.factory('DataFactoryArray', function($resource, cfg) {
    return {
        get: function(param) {
            return $resource(cfg.server_url + param, {}, {query: {
                    method: 'GET',
                    params: {},
                    isArray: true
                }});
        }
    };
});
// Load JSON data from the server
appFactory.factory('jsonFactory', function($q, $http) {
    return {
        get: function(url) {
            var deferred = $q.defer(),
                    httpPromise = $http.get(url);
            httpPromise.then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                console.log(error);
            });
            return deferred.promise;
        }
    };
});
// Translation factory
appFactory.factory('transFactory', function(languages) {
    return {
        get: function(lang, key) {
            if (angular.isObject(languages[lang])) {
                if (angular.isDefined(languages[lang][key])) {
                    return languages[lang][key];
                }
            }
            return key;
        }
    };
});
