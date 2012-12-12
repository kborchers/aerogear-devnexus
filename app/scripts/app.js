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
        .service( "dataService", function() {
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
                }).stores.speakers,
                presentationPipe: AeroGear.Pipeline({
                    name: "sessions",
                    settings: {
                        baseURL: "http://devnexus.com/s/",
                        endpoint: "presentations.json"
                    }
                }).pipes.sessions,
                presentationStore: AeroGear.DataManager({
                    name: "sessions",
                    type: "SessionLocal",
                    settings: {
                        storageType: "localStorage"
                    }
                }).stores.sessions
            };
        });
