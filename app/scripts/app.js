"use strict";

var aerogearDevnexusApp = angular.module( "aerogearDevnexusApp", [ "ngSanitize" ])
        .config( [ "$routeProvider", function( $routeProvider ) {
            $routeProvider
                .when( "/", {
                    templateUrl: "views/home.html",
                    controller: "HomeCtrl"
                })
                .when( "/speakers", {
                    templateUrl: "views/speakers.html",
                    controller: "SpeakersPresentationsCtrl"
                })
                .when( "/speakers/:id", {
                    templateUrl: "views/speakers.html",
                    controller: "SpeakersPresentationsCtrl"
                })
                .when("/sessions", {
                    templateUrl: "views/presentations.html",
                    controller: "SpeakersPresentationsCtrl"
                })
                .when( "/sessions/:id", {
                    templateUrl: "views/presentations.html",
                    controller: "SpeakersPresentationsCtrl"
                })
                .otherwise({
                    redirectTo: "/"
                });
        }]);
