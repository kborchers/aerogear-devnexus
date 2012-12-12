"use strict";

aerogearDevnexusApp.controller( "NavCtrl", function( $scope, $location ) {
    $scope.path = $location.path();
});
