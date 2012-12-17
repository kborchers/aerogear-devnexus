"use strict";

aerogearDevnexusApp.directive( "jumpTo", function() {
    return function ( scope, element, attributes ) {
        var args = scope.$eval( "[" + attributes.jumpTo + "]" );
        if ( scope[ args[ 1 ] ].id == args[ 0 ] ) {
            setTimeout( function() {
                jQuery( "body" ).animate({
                    scrollTop: jQuery( "#collapse-" + scope[ args[ 1 ] ].id ).offset().top - 40
                }, 1500);
            }, 100);
        }
    };
});
