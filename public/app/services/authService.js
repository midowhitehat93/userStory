/**
 * Created by youxel on 1/23/2016.
 */
angular.module('authService', [])

.factory('Auth', function($http, $q, AuthToken){

        var authFactory = {};

        authFactory.login = function(username, password){
            return $http.post('/api/login', {
                username: username,
                password: password
            })
                .success(function(data){
                    AuthToken.setToken(data.token);
                    return data;
                })
        }

        authFactory.logout = function(){
            AuthToken.setToken(); //empty token
        }

        authFactory.isLoggedIn = function(){ // if the user has a token or not
            if(AuthToken.getToken())
                return true;
            else
                return false;
        }

        authFactory.getUser = function(){ // get all the user info
            if(AuthToken.getToken())
                return $http.get('/api/me');
            else
                return $q.reject({ message: "User has no token" });
        }

        return authFactory;
    })

.factory('AuthToken', function($window){// get the token from the browser
        var authTokenFactory = {};

        authTokenFactory.getToken = function(){ // get the token from the local storage
            return $window.localStorage.getItem('token');
        }

        authTokenFactory.setToken = function(token){
            if(token)
                $window.localStorage.setItem('token', token);
            else
                $window.localStorage.removeItem('token');
        }

        return authTokenFactory;
    })

.factory('AuthInterceptor', function($q, $location, AuthToken){
        var interceptorFactory = {};

        interceptorFactory.request = function(config){ // request to check if the token is exist in the local storage
            var token = AuthToken.getToken();

            if(token){ // if the token in the local storage
                config.headers['x-access-token'] = token;
            }

            return config;
        };

        interceptorFactory.responseError = function(response){ // if do not have a token redirect to the login page
            if(response.status == 403)
                $location.path('/login');
            return $q.reject(response);
        }

        return interceptorFactory;
    });