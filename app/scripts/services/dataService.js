"use strict";

aerogearDevnexusApp.factory( "dataService", function() {
    return {
        speakerPipe: AeroGear.Pipeline({
            name: "speakers",
            settings: {
                baseURL: "http://devnexus.com/s/",
                endpoint: "speakers.json"
            }
        }).pipes.speakers,
        speakerStore: AeroGear.DataManager({
            name: "speakers",
            type: "SessionLocal",
            settings: {
                storageType: "localStorage"
            }
        }).stores.speakers,
        presentationPipe: AeroGear.Pipeline({
            name: "sessions",
            settings: {
                baseURL: "http://devnexus.com/s/",
                endpoint: "presentations.json"
            }
        }).pipes.sessions,
        presentationStore: AeroGear.DataManager({
            name: "sessions",
            type: "SessionLocal",
            settings: {
                storageType: "localStorage"
            }
        }).stores.sessions
    };
});
