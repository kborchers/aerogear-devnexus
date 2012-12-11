"use strict";

var aerogearDevnexusApp = angular.module( "aerogearDevnexusApp", [])
        .config( [ "$routeProvider", function( $routeProvider ) {
            $routeProvider
                .when( "/", {
                    templateUrl: "views/main.html",
                    controller: "MainCtrl"
                })
                .when( "/speakers", {
                    templateUrl: "views/speakers.html",
                    controller: "SpeakersCtrl"
                })
                .when("/sessions", {
                    templateUrl: "views/sessions.html",
                    controller: "SessionsCtrl"
                })
                .otherwise({
                    redirectTo: "/"
                });
        }])
        .service( "speakerService", function() {
            return {
                speakerPipe: AeroGear.Pipeline({
                    name: "speakers",
                    settings: {
                        baseURL: "http://devnexus.com/s/",
                        endpoint: "speakers.json"
                    }
                }).pipes.speakers,
                speakerStore: AeroGear.DataManager({
                    name: "speakers",
                    type: "SessionLocal",
                    settings: {
                        storageType: "localStorage"
                    }
                }).stores.speakers
            };
        })
        .service( "sessionService", function() {
            return {
                sessionPipe: AeroGear.Pipeline({
                    name: "sessions",
                    settings: {
                        baseURL: "http://devnexus.com/s/",
                        endpoint: "presentations.json"
                    }
                }).pipes.sessions,
                sessionStore: AeroGear.DataManager({
                    name: "sessions",
                    type: "SessionLocal",
                    settings: {
                        storageType: "localStorage"
                    }
                }).stores.sessions
            };
        });
