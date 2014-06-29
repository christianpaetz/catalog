/**
 * Application Directives
 * @author Martin Vach
 */

angApp.directive('sortBy', function() {
    return {
        restrict: "E",
        replace: true,
        template: '<span ng-show="predicate == {{field}}"><i ng-show="!reverse" class="fa fa-sort-asc"></i><i ng-show="reverse" class="fa fa-sort-desc"></i></span>',
        compile: function (tElement, tAttrs) {
            // this is link function
            return function (scope) {
                scope.field = tAttrs.field;
            };            
        }
    };
});