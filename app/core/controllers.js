/**
 * Application controllers
 * @author Martin Vach
 */

/*** Controllers ***/
var appController = angular.module('appController', []);

// Test controller
appController.controller('TestController', function($scope, $http, $routeParams, $filter, $log, DataFactory, jsonFactory, transFactory, cfg, languages) {

});

// Base controller
appController.controller('BaseController', function($http, $scope, $cookies, $filter, $log, transFactory, cfg, languages) {
    $scope.download = cfg.download;
    $scope.lang = (angular.isDefined($cookies.lang) ? $cookies.lang : cfg.lang);
    $scope.changeLang = function(lang) {
        $cookies.lang = lang;
        $scope.lang = lang;
    };
    $scope._t = function(key) {
        return transFactory.get($scope.lang, key);
    };
    $scope.cfg = cfg;

});

// Home controller
appController.controller('HomeController', function($scope) {
    $scope.data = 'The HomeController content comes here';

});

// Products controller
appController.controller('ProductsController', function($scope, $routeParams, DataFactory, DataFactoryArray, paginationService, cfg) {
    $scope.products = [];
    $scope.currentPage = 1;
    $scope.pageSize = cfg.page_results;
    $scope.headline = 'Product';
    $scope.pageType = 'products';
    $scope.pageDescription = '';
    $scope.reset = function() {
        $scope.products = angular.copy([]);
    };
    // Load data
    $scope.load = function(lang) {
        DataFactory.get('data/z_' + lang + '.json').query(function(data) {
            // Use filtering
            if (angular.isDefined($routeParams.filter) && angular.isDefined($routeParams.val)) {
                switch ($routeParams.filter) {
                    case 'vendor':
                        angular.forEach(data, function(v, k) {
                            if (angular.isObject(v.TechData)) {
                                if ($routeParams.val == v.TechData.ZManufacturersName) {
                                    $scope.products.push(v);
                                    $scope.vendorImage = cfg.manufacturer_images + v.ZManufacturersImage;
                                }
                            }
                        });
                        $scope.headline = $routeParams.val;
                        $scope.pageType = 'vendors';
                        DataFactoryArray.get('data/manufacturers_' + lang + '.json').query(function(man) {
                            angular.forEach(man, function(v, k) {
                                if (v.manufacturers_name === $routeParams.val) {
                                    $scope.vendorDescription = v.description;
                                    $scope.vendorUrl = v.manufacturers_url;
                                }

                            });
                        });
                        break;
                    case 'zwaveplus':
                        angular.forEach(data, function(v, k) {
                            if (angular.isDefined(v.ZWavePlus)) {
                                if ($routeParams.val == v.ZWavePlus) {
                                    $scope.products.push(v);
                                }
                            }
                        });
                        $scope.headline = 'Z-Wave Plus';
                        break;

                    case 'category':
                        DataFactory.get('data/c_' + lang + '.json').query(function(cat) {
                            var category = cat[$routeParams.val];
                            if (angular.isObject(category)) {
                                angular.forEach(category.products, function(v, k) {
                                    if (angular.isObject(data[v])) {
                                        $scope.products.push(data[v]);
                                    }
                                });
                                $scope.headline = category['name'];
                                $scope.pageType = 'categories';
                                $scope.pageDescription = category['description'];
                            }

                        });
                        break;
                }

            } else {
                angular.forEach(data, function(v, k) {
                    $scope.products.push(v);
                });
            }
        });
    };

    // Watch for pagination change
    $scope.$watch('currentPage', function(page) {
        paginationService.setCurrentPage(page);
    });

    $scope.setCurrentPage = function(val) {
        $scope.currentPage = val;
    };

    // Watch for lang change
    $scope.$watch('lang', function() {
        $scope.reset();
        $scope.load($scope.lang);
    });

});

// Product Overview controller
appController.controller('ProductOverviewController', function($scope, DataFactory, paginationService, cfg) {
    $scope.products = [];
    $scope.predicate = 'vendor';
    $scope.reverse = false;
    $scope.reset = function() {
        $scope.products = angular.copy([]);
    };

    // Load data
    $scope.load = function(lang) {
        DataFactory.get('data/z_' + lang + '.json').query(function(data) {
            angular.forEach(data, function(v, k) {
                var obj = {};
                if (angular.isObject(v.TechData)) {
                    obj['sku'] = v.TechData.ZProductsSku;
                    obj['vendor'] = v.TechData.ZManufacturersName;
                    obj['basic'] = v.TechData.Basic;
                    obj['generic'] = v.TechData.Generic;
                    obj['inclusion'] = v.TechData.Inclusion;
                    $scope.products.push(obj);
                }

            });
        });
    };
    // Watch for lang change
    $scope.$watch('lang', function() {
        $scope.reset();
        $scope.load($scope.lang);
    });

    // Order by
    $scope.orderBy = function(field) {
        $scope.predicate = field;
        $scope.reverse = !$scope.reverse;
    };

});

// Product detail controller
appController.controller('ProductDetailController', function($scope, $http, $routeParams, DataFactory, DataFactoryArray, cfg) {
    $scope.product = [];
    $scope.manual_long = false;
    $scope.manual_short = false;
    $scope.reset = function() {
        $scope.product = angular.copy([]);
    };
    // Load data
    $scope.load = function(lang) {
        DataFactory.get('data/z_' + lang + '.json').query(function(data) {
            if ($routeParams.sku in data) {
                $scope.sku = $routeParams.sku;
                $scope.product = data[$routeParams.sku];
                DataFactoryArray.get('data/manuals_' + lang + '.json').query(function(man) {
                    angular.forEach(man, function(v, k) {
                        if (v.sku === $routeParams.sku) {
                            $scope.manual_long = (v.link_long != 'false' ? cfg.manuals + v.link_long : false);
                            $scope.manual_short = (v.link_short != 'false' ? cfg.manuals + v.link_short : false);
                            $scope.manual_long_pdf = (v.link_long != 'false' ? cfg.pdf_manual + v.link_long : false);
                            $scope.manual_short_pdf = (v.link_short != 'false' ? cfg.pdf_manual + v.link_short : false);
                        }
                    });
                });
            }
            return false;
        });
    };
    // Watch for lang change
    $scope.$watch('lang', function() {
        $scope.reset();
        $scope.load($scope.lang);
    });
});

// Vendor controller
appController.controller('VendorsController', function($scope, $filter, DataFactory, cfg) {
    $scope.vendors = [];
    $scope.reset = function() {
        $scope.vendors = angular.copy([]);
    };

    // Load data
    $scope.load = function(lang) {
        DataFactory.get('data/z_' + lang + '.json').query(function(data) {
            angular.forEach(data, function(v, k) {
                var obj = {};
                if (angular.isObject(v.TechData)) {
                    var image_name = k.split('_');
                    obj['name'] = v.TechData.ZManufacturersName;
                    obj['image'] = cfg.manufacturer_images + v.ZManufacturersImage;
                    //obj['image'] = cfg.manufacturer_images + image_name[0].toLowerCase() + '.png';
                    //console.log(image_name[0].toLowerCase());
                    $scope.vendors.push(obj);
                }

            });
        });
    };
    $scope.load($scope.lang);
});

//Vendor detail controller
appController.controller('VendorController', function($scope) {
    $scope.data = 'The HomeController content comes here';

});

// Categories controller
appController.controller('CategoriesController', function($scope, $log, $routeParams, DataFactory, cfg) {
    $scope.categories = [];
    $scope.reset = function() {
        $scope.categories = angular.copy([]);
    };
    $scope.category_images = cfg.category_images;

    // Load data
    $scope.load = function(lang) {
        DataFactory.get('data/c_' + lang + '.json').query(function(data) {
            $scope.categories = data;
            return;
        });
    };
    // Watch for lang change
    $scope.$watch('lang', function() {
        $scope.reset();
        $scope.load($scope.lang);
    });

});

// Manual controller
appController.controller('ManualController', function($scope, DataFactoryArray, paginationService, cfg) {
    $scope.manuals = [];
    $scope.currentPage = 1;
    $scope.pageSize = cfg.page_results;
    $scope.reset = function() {
        $scope.manuals = angular.copy([]);
    };
    // Load data
    $scope.load = function(lang) {
        DataFactoryArray.get('data/manuals_' + lang + '.json').query(function(data) {
            $scope.manuals = data;
        });
    };

    // Watch for pagination change
    $scope.$watch('currentPage', function(page) {
        paginationService.setCurrentPage(page);
    });

    $scope.setCurrentPage = function(val) {
        $scope.currentPage = val;
    };

    // Watch for lang change
    $scope.$watch('lang', function() {
        $scope.reset();
        $scope.load($scope.lang);
    });

});