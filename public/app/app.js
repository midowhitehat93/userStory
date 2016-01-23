/**
 * Created by youxel on 1/23/2016.
 */
angular.module('MyApp', ['appRoutes','mainCtrl', 'authService', 'userCtrl', 'userService', 'storyService', 'storyCtrl', 'reverseDirective'])

.config(function($httpProvider){
        $httpProvider.interceptors.push('AuthInterceptor');
    });