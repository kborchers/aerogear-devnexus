"use strict";

aerogearDevnexusApp.controller( "NavCtrl", [ "$scope", "$location", function( $scope, $location ) {
    $scope.path = $location.path();
}]);
