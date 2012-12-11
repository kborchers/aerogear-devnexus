"use strict";

aerogearDevnexusApp.controller( "NavCtrl", function( $scope, $location ) {
    $scope.activeRoute = function( route ) {
        return $location.path() === route;
    };
});
