"use strict";

aerogearDevnexusApp.controller( "SessionsCtrl", function( $scope, sessionService ) {
    var offlineData = sessionService.sessionStore.read(),
        // Offline Data expires after 1 hour
        expireTime = 3600000,
        today = (new Date()).getTime();

    if ( offlineData && offlineData.length && ( today - offlineData[ 0 ].saved ) < expireTime ) {
        $scope.sessions = offlineData[ 0 ].presentation;
    } else {
        sessionService.sessionPipe.read({
            jsonp: {
                callback: "jsonp",
                customCallback: "handleMatterhornData"
            },
            success: function( data ) {
                var sessionData = data.presentationList;
                sessionData.saved = (new Date()).getTime();
                sessionService.sessionStore.save( sessionData, { reset: true } );
                $scope.sessions = sessionData.presentation;
                $scope.$apply();
            },
            error: function( data ) {
                if ( offlineData && offlineData.length ) {
                    $scope.sessions = offlineData[ 0 ].presentation;
                    $scope.$apply();
                } else {
                    console.log('error');
                }
            }
        });
    }
});
