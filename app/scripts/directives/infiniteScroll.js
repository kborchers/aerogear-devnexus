"use strict";

aerogearDevnexusApp.directive( "infiniteScroll", function() {
    return function( scope, element, attr ) {
        $( window ).bind( "scroll", function() {
            scope.$broadcast( "parentScroll", [ attr ] );
        });
    };
});
