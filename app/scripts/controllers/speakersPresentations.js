"use strict";

aerogearDevnexusApp.controller( "SpeakersPresentationsCtrl", function( $scope, $routeParams, $location, dataService ) {
    var viewName, offlineData,
        // Offline Data expires after 1 hour
        expireTime = 3600000,
        today = (new Date()).getTime();

    if ( $location.$$path.indexOf( "speakers" ) >= 0 ) {
        viewName = "speaker";
    } else {
        viewName = "presentation";
    }

    offlineData = dataService[ viewName + "Store" ].read(),

    // Set the open collapse panel
    $scope.open = $routeParams.id;

    if ( offlineData && offlineData.length && ( today - offlineData[ 0 ].saved ) < expireTime ) {
        $scope[ viewName + "s" ] = offlineData[ 0 ][ viewName ];
    } else {
        dataService[ viewName + "Pipe" ].read({
            jsonp: {
                callback: "jsonp",
                customCallback: "handleMatterhornData"
            },
            success: function( data ) {
                var listData = data[ viewName + "List" ];
                listData.saved = (new Date()).getTime();
                dataService[ viewName + "Store" ].save( listData, { reset: true } );
                $scope[ viewName + "s" ] = listData[ viewName ];
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
});
