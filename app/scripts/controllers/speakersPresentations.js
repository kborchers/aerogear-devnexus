"use strict";

aerogearDevnexusApp.controller( "SpeakersPresentationsCtrl", [ "$scope", "$routeParams", "dataService", "$log", function( $scope, $routeParams, dataService, $log ) {
    var offlineSpeakers, offlinePresentations, saved, speakerDeferred, presentationDeferred,
        // Offline Data expires after 1 hour
        expireTime = 3600000,
        today = (new Date()).getTime();

    // Get offline data
    offlineSpeakers = dataService.speakerStore.read();
    offlinePresentations = dataService.presentationStore.read();
    saved = dataService.dataSaved.read();

    // Set the open collapse panel
    $scope.open = $routeParams.id;

    // Set the markdown converter
    $scope.converter = new Markdown.Converter();

    // Update data
    if ( offlineSpeakers && ( today - saved[ 0 ] ) < expireTime ) {
        $scope.speakers = offlineSpeakers;
        $scope.presentations = offlinePresentations;
    } else {
        speakerDeferred = dataService.speakerPipe.read({
            jsonp: {
                callback: "jsonp",
                customCallback: "speakerCallback"
            }
        });
        presentationDeferred = dataService.presentationPipe.read({
            jsonp: {
                callback: "jsonp",
                customCallback: "presentationCallback"
            }
        });

        jQuery.when( speakerDeferred, presentationDeferred )
            .done( function( speakerResponse, presentationResponse ) {
                dataService.dataSaved.save( (new Date()).getTime(), { reset: true } );

                // Update Speaker data
                dataService.presentationStore.save( presentationResponse[ 0 ].presentationList.presentation, { reset: true } );
                $scope.presentations = presentationResponse[ 0 ].presentationList.presentation;

                // Update Speaker data
                dataService.speakerStore.save( speakerResponse[ 0 ].speakerList.speaker, { reset: true } );
                $scope.speakers = speakerResponse[ 0 ].speakerList.speaker;

                $scope.$apply();
            })
            .fail( function( speakerResponse, presentationResponse ) {
                $log.log(presentationResponse[ 0 ],speakerResponse[ 0 ]);
            });
    }

    $scope.speakerPresentations = function( speakerId ) {
        return dataService.presentationStore.filter({
            speaker: {
                id: speakerId
            }
        });
    };
}]);
