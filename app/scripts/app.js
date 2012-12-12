"use strict";

var aerogearDevnexusApp = angular.module( "aerogearDevnexusApp", [])
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
        }])
        .directive( "jumpTo", function() {
            return {
                restrict: 'A',
                link: function ( scope, element, attributes ) {
                    if ( scope.speaker.id == scope.$eval( attributes.jumpTo ) ) {
                        setTimeout( function() {
                            jQuery( "body" ).animate({
                                scrollTop: jQuery( "#collapse-" + scope.speaker.id ).offset().top - 40
                            }, 1500);
                        }, 100);
                    }
                }
            };
        });
