const cds = require("@sap/cds");
const cors = require("cors");

cds.on("bootstrap", app => {

    app.use(cors({
        origin: "http://localhost:8080",
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