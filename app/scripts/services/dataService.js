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
            name: "presentations",
            settings: {
                baseURL: "http://devnexus.com/s/",
                endpoint: "presentations.json"
            }
        }).pipes.presentations,
        presentationStore: AeroGear.DataManager({
            name: "presentations",
            type: "SessionLocal",
            settings: {
                storageType: "localStorage"
            }
        }).stores.presentations,
        dataSaved: AeroGear.DataManager({
            name: "dataSaved",
            type: "SessionLocal",
            settings: {
                storageType: "localStorage"
            }
        }).stores.dataSaved
    }
});
