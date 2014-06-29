/**
 * Application base
 * @author Martin Vach
 */

/**
 * 
 * Filters out all duplicate objects items 
 * from an array by checking the specified key
 * 
 * Source: http://angular-ui.github.io/
 * Script url: https://github.com/angular-ui/ui-utils/blob/master/modules/unique/unique.js
 */
angApp.filter('unique', ['$parse', function($parse) {
        return function(items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var newItems = [],
                        get = angular.isString(filterOn) ? $parse(filterOn) : function(item) {
                    return item;
                };

                var extractValueToCompare = function(item) {
                    return angular.isObject(item) ? get(item) : item;
                };

                angular.forEach(items, function(item) {
                    var isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
    }]);

/**
 *  Strip HTML tags from input
 */
angApp.filter('stripTags', function() {
    return function(input) {
        return String(input).replace(/<[^>]+>/gm, '');
    };
});

/**
 * Print unsafe (tags, entities et.) html
 */
angApp.filter('unsafeHtml', function($sce) {
    return function(input) {
        return $sce.trustAsHtml(input);
    };
});

/**
 *  Split text with separator
 */
angApp.filter('splitText', function() {
    return function(input,separator,index) {
        var array = input.split(separator);
        return array[index];
    };
});