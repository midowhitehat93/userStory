/**
 * Created by youxel on 1/23/2016.
 */
angular.module('reverseDirective', [])

    .filter('reverse', function() {

        return function(items) {
            return items.slice().reverse();
        }

    });