"use strict";

aerogearDevnexusApp.factory( "dataService", function() {
    var pipeline = AeroGear.Pipeline([
        {
            name: "speakers",
            settings: {
                baseURL: "http://devnexus.com/s/",
                endpoint: "speakers.json"
            }
        },
        {
            name: "presentations",
            settings: {
                baseURL: "http://devnexus.com/s/",
                endpoint: "presentations.json"
            }
        },
        {
            name: "tweets",
            settings: {
                baseURL: "http://search.twitter.com/",
                endpoint: "search.json"
            }
        }
        ]),
        dataManager = AeroGear.DataManager([
            {
            name: "speakers",
            type: "SessionLocal",
            settings: {
                storageType: "localStorage"
            }
        },
        {
            name: "presentations",
            type: "SessionLocal",
            settings: {
                storageType: "localStorage"
            }
        },
        {
            name: "dataSaved",
            type: "SessionLocal",
            settings: {
                storageType: "localStorage"
            }
        }
        ]);

    return {
        speakerPipe: pipeline.pipes.speakers,
        speakerStore: dataManager.stores.speakers,
        presentationPipe: pipeline.pipes.presentations,
        presentationStore: dataManager.stores.presentations,
        dataSaved: dataManager.stores.dataSaved,
        twitterPipe: pipeline.pipes.tweets
    };
});
