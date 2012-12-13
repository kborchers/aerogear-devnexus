"use strict";

aerogearDevnexusApp.controller( "SpeakersPresentationsCtrl", [ "$scope", "$routeParams", "$location", "dataService", function( $scope, $routeParams, $location, dataService ) {
    var viewName, offlineData, saved,
        // Offline Data expires after 1 hour
        expireTime = 3600000,
        today = (new Date()).getTime();

    if ( $location.$$path.indexOf( "speakers" ) >= 0 ) {
        viewName = "speaker";
    } else {
        viewName = "presentation";
    }

    offlineData = dataService[ viewName + "Store" ].read();
    saved = dataService[ viewName + "Saved" ].read();

    // Set the open collapse panel
    $scope.open = $routeParams.id;

    // Set the markdown converter
    $scope.converter = new Markdown.Converter();

    // Update data
    if ( offlineData && offlineData.length && ( today - saved[ 0 ] ) < expireTime ) {
        $scope[ viewName + "s" ] = offlineData;
    } else {
        dataService[ viewName + "Pipe" ].read({
            jsonp: {
                callback: "jsonp",
                customCallback: "handleMatterhornData"
            },
            success: function( data ) {
                dataService[ viewName + "Store" ].save( data[ viewName + "List" ][ viewName ], { reset: true } );
                dataService[ viewName + "Saved" ].save( (new Date()).getTime(), { reset: true } );
                $scope[ viewName + "s" ] = data[ viewName + "List" ][ viewName ];
                $scope.$apply();
            },
            error: function( data ) {
                if ( offlineData && offlineData.length ) {
                    $scope[ viewName + "s" ] = offlineData[ 0 ][ viewName ];
                    $scope.$apply();
                } else {
                    $log('error');
                }
            }
        });
    }
}]);
