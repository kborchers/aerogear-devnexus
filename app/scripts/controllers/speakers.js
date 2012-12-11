"use strict";

aerogearDevnexusApp.controller( "SpeakersCtrl", function( $scope, speakerService ) {
    var offlineData = speakerService.speakerStore.read(),
        // Offline Data expires after 1 hour
        expireTime = 3600000,
        today = (new Date()).getTime();

    if ( offlineData && offlineData.length && ( today - offlineData[ 0 ].saved ) < expireTime ) {
        $scope.speakers = offlineData[ 0 ].speaker;
    } else {
        speakerService.speakerPipe.read({
            jsonp: {
                callback: "jsonp",
                customCallback: "handleMatterhornData"
            },
            success: function( data ) {
                var speakerData = data.speakerList;
                speakerData.saved = (new Date()).getTime();
                speakerService.speakerStore.save( speakerData, { reset: true } );
                $scope.speakers = speakerData.speaker;
                $scope.$apply();
            },
            error: function( data ) {
                if ( offlineData && offlineData.length ) {
                    $scope.speakers = offlineData[ 0 ].speaker;
                    $scope.$apply();
                } else {
                    console.log('error');
                }
            }
        });
    }
});
