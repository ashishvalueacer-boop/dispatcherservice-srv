const cds = require("@sap/cds");
const cors = require("cors");

const allowedOrigins = [
    "http://localhost:8080",
    "http://localhost:8081",
    "https://valueacer-dev-d92qqwq9.launchpad.cfapps.eu10.hana.ondemand.com",
    "https://7a89bf9atrial-dev-dispatcherservice-srv.cfapps.us10-001.hana.ondemand.com"
];

cds.on("bootstrap", app => {

    app.use(cors({
        //origin: "http://localhost:8080",
        //origin: "https://valueacer-dev-d92qqwq9.launchpad.cfapps.eu10.hana.ondemand.com",
        //origin: "https://7a89bf9atrial-dev-dispatcherservice-srv.cfapps.us10-001.hana.ondemand.com",
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },

        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Accept",
            "Authorization",
            "OData-Version",
            "OData-MaxVersion",
            "If-Match",
            "If-None-Match"
        ]
    }));

});

module.exports = cds.server;