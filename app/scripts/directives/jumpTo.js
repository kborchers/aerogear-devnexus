"use strict";

aerogearDevnexusApp.directive( "jumpTo", function() {
    return function ( scope, element, attributes ) {
        if ( scope.speaker.id == scope.$eval( attributes.jumpTo ) ) {
            setTimeout( function() {
                jQuery( "body" ).animate({
                    scrollTop: jQuery( "#collapse-" + scope.speaker.id ).offset().top - 40
                }, 1500);
            }, 100);
        }
    };
});
