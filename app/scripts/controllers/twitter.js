"use strict";

aerogearDevnexusApp.controller( "TwitterCtrl", [ "$scope", "dataService", "$filter", function( $scope, dataService, $filter ) {
    var doc = $( document );

    $scope.tweets = [];
    $scope.nextPage = null;
    $scope.stopRequests = false;
    $scope.loader = true;

    $scope.loadTweets = function() {
        if ( $scope.stopRequests ) {
            return;
        }

        var query = "";

        if ( $scope.nextPage ) {
            query = $scope.nextPage.substr( 1 );
        } else if ( $scope.nextPage === undefined ) {
            // return as there are no more results
            $scope.loader = false;
            return;
        } else {
            query = {
                q: "devnexus",
                include_entities: 1
            };
        }

        dataService.twitterPipe.read({
            query: query,
            jsonp: true,
            success: function( data ) {
                $scope.tweets = $scope.tweets.concat( $scope.processTweets( data.results ) );
                $scope.nextPage = data[ "next_page" ];
            },
            complete: function() {
                $scope.loader = false;
                $scope.stopRequests = false;
                $scope.$apply();
            }
        });
    };

    // initial load
    $scope.loadTweets();

    $scope.formatDate = function( time ) {
        var checkTime = new Date( time ),
            today = (new Date()).getTime();

        if ( today - checkTime.getTime() >= 604800000 ) {
            return $filter( "date" )( checkTime, "d MMM" );
        } else {
            return prettyDate( time );
        }
    };

    $scope.processTweets = function( tweets ) {
        var tweet;

        for ( tweet in tweets ) {
            tweets[ tweet ].text = linkify_entities( tweets[ tweet ] );
        }

        return tweets;
    };

    $scope.$on( "parentScroll", function( attr ) {
        if ( doc.scrollTop() + $( window ).height() >= doc.outerHeight() ) {
            $scope.loadTweets();
            $scope.stopRequests = true;
        }
    });
}]);
