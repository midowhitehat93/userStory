/**
 * Created by youxel on 1/23/2016.
 */
angular.module('userService', [])

.factory('User', function($http){

        var userFactory = {};

        userFactory.create = function(userData){
            return $http.post('/api/signup', userData);
        }

        userFactory.all = function(){
            return $http.get('/api/users');
        }

        return userFactory;
    })