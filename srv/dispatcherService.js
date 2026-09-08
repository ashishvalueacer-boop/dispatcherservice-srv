
const cds = require('@sap/cds');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const { getDestination } = require('@sap-cloud-sdk/connectivity');


class DispatcherService extends cds.ApplicationService {

    async init() {

        let destination = await getDestination({
            destinationName: 'Destination_Driver_Assignment_Iflows'
        });

        // this.on("getAllTables", async (req) => {
        //     const db = await cds.connect.to("db");
        //     const tables = await db.run(SELECT.from("sqlite_master").where({ type: 'table' }));
        //     return tables.map(table => table.name);
        // });

        // this.on("GetDrivers", async (req) => {
        //     // const db = await cds.connect.to("db");
        //     // const tables = await db.run(SELECT.from("sqlite_master").where({ type: 'table' }));
        //     // return tables.map(table => table.name);
        //     //return await cds.tx(req).run(SELECT.from("Drivers"));
        //     return GetDrivers();
        // });


        this.on("GetDrivers", GetDrivers);
        this.on("GetVehicles", GetVehicles);
        this.on("GetFreightOrders", GetFreightOrders);
        this.on("VehicleAssignments", GetVehicleAssignmentsDetails);
        this.on("assignments", GetDriverAssignmentsDetails);

        this.on("GetFreightOrderDetails", async (req) => {
            const { foId } = req.data;
            const freightOrders = GetFreightOrders();
            const orderDetails = freightOrders.find(order => order.id === foId);
            return orderDetails ? [orderDetails] : [];
        });

        this.on("GetBulkfo", async (req) => {

            let destination = await getDestination({
                destinationName: 'Destination_Driver_Assignment_Iflows'
            });

            const {
                p_start_time = "2026-09-01T07:00:00Z",
                p_end_time = "2026-09-30T13:00:00Z",
                p_dc = "0017411710",
                p_carrier = "0001000109"
            } = req.data;

            try {

                let iflowUrl = "";
                iflowUrl = "/http/fo-bulk";

                // console.log("My Destination: V1", JSON.stringify(destination));
                // console.log("My iFlow URL: V1", iflowUrl);


                const requestConfig = {
                    method: "GET",
                    url: iflowUrl,
                    params: {
                        p_start_time: p_start_time,
                        p_end_time: p_end_time,
                        p_dc: p_dc,
                        p_carrier: p_carrier
                    }
                };

                console.log("My Request Config V1:", JSON.stringify(requestConfig, null, 2));


                const response = await executeHttpRequest(destination, requestConfig);

                // console.log("My Status v1:", response.status);
                // console.log("My Headers v1:", response.headers);
                // console.log("My Data v1:", JSON.stringify(response.data.freightOrders, null, 2));             


                const freightOrdersData = response.data.freightOrders;
                console.log("My Final Parsed Data v1:", freightOrdersData);
                console.log("Records Found:", freightOrdersData.length);

                const freightOrders = freightOrdersData.map(item => ({

                    id: item.transportationOrder || "N/A",

                    startDate: item.startTime ? item.startTime.split("T")[0] : "",

                    startTime: item.startTime ? item.startTime.split("T")[1]?.replace("Z", "") : "",

                    endDate: item.endTime ? item.endTime.split("T")[0] : "",

                    endTime: item.endTime ? item.endTime.split("T")[1]?.replace("Z", "") : "",

                    driver_id: item.hasOwnProperty("driver_id") ? item.driver_id : "UNASSIGNED",

                    vehid: item.hasOwnProperty("veh_regno") ? item.veh_regno : "NO_VEHICLE",

                    status: item.hasOwnProperty("status") ? item.status : "Unassigned",

                    carrier: item.hasOwnProperty("carrier") ? item.carrier : "UNKNOWN",

                    distance: item.hasOwnProperty("distance") ? item.distance : "10",

                    priority: item.hasOwnProperty("priority") ? item.priority : "MEDIUM",

                    mode: item.hasOwnProperty("mode") ? item.mode : "ROAD",

                    weight: item.hasOwnProperty("weight") ? item.weight : "10",

                    from: item.hasOwnProperty("from") ? item.from : "UNKNOWN",

                    to: item.hasOwnProperty("to") ? item.to : "UNKNOWN"

                })) || [];

                console.log("My freightOrders data:", freightOrders);

                let DispatchedData = [];

                for (const d of freightOrders || []) {

                    DispatchedData.push({
                        id: d.id,
                        priority: d.priority,
                        driver_id: d.driver_id,
                        startDate: d.startDate,
                        endDate: d.endDate,
                        startTime: d.startTime,
                        endTime: d.endTime,
                        Vehid: d.vehid,
                        carrier: d.carrier
                        // LastUpdate: new Date().toISOString()
                    });
                }               

                // DispatchedData = freightOrders.map(d => ({
                //     id: d.id,
                //     priority: d.priority,
                //     driver_id: d.driver_id,
                //     startDate: d.startDate,
                //     endDate: d.endDate,
                //     startTime: d.startTime,
                //     endTime: d.endTime,
                //     Vehid: d.vehid,
                //     carrier: d.carrier
                // }));

                

                return DispatchedData;
                

            } catch (error) {

                console.error("Error Message V1: ", error.message);
                console.error("Error Response V1:", error.response?.data);
                console.error("Error Status V1:", error.response?.status);
                console.error("Full Error V1:", error);

                req.error(
                    500,
                    `Error v1 calling CPI iFlow: ${error.message}`
                );
            }
        });

        this.on("GetBulkfoV", async (req) => {

            let destination = await getDestination({
                destinationName: 'Destination_Driver_Assignment_Iflows'
            });

            const {
                p_start_time = "2026-09-01T07:00:00Z",
                p_end_time = "2026-09-30T13:00:00Z",
                p_dc = "0017411710",
                p_carrier = "0001000109"
            } = req.data;

            try {

                let iflowUrl = "";
                iflowUrl = "/http/fo-bulk";

                // console.log("My Destination: V1", JSON.stringify(destination));
                // console.log("My iFlow URL: V1", iflowUrl);


                const requestConfig = {
                    method: "GET",
                    url: iflowUrl,
                    params: {
                        p_start_time: p_start_time,
                        p_end_time: p_end_time,
                        p_dc: p_dc,
                        p_carrier: p_carrier
                    }
                };

                console.log("My Request Config V1:", JSON.stringify(requestConfig, null, 2));


                const response = await executeHttpRequest(destination, requestConfig);

                // console.log("My Status v1:", response.status);
                // console.log("My Headers v1:", response.headers);
                // console.log("My Data v1:", JSON.stringify(response.data.freightOrders, null, 2));             


                const freightOrdersData = response.data.freightOrders;
                console.log("My Final Parsed Data v1:", freightOrdersData);
                console.log("Records Found:", freightOrdersData.length);

                const freightOrders = freightOrdersData.map(item => ({

                    id: item.transportationOrder || "N/A",

                    startDate: item.startTime ? item.startTime.split("T")[0] : "",

                    startTime: item.startTime ? item.startTime.split("T")[1]?.replace("Z", "") : "",

                    endDate: item.endTime ? item.endTime.split("T")[0] : "",

                    endTime: item.endTime ? item.endTime.split("T")[1]?.replace("Z", "") : "",

                    driver_id: item.hasOwnProperty("driver_id") ? item.driver_id : "UNASSIGNED",

                    vehid: item.hasOwnProperty("veh_regno") ? item.veh_regno : "NO_VEHICLE",

                    status: item.hasOwnProperty("status") ? item.status : "Unassigned",

                    carrier: item.hasOwnProperty("carrier") ? item.carrier : "UNKNOWN",

                    distance: item.hasOwnProperty("distance") ? item.distance : "10",

                    priority: item.hasOwnProperty("priority") ? item.priority : "MEDIUM",

                    mode: item.hasOwnProperty("mode") ? item.mode : "ROAD",

                    weight: item.hasOwnProperty("weight") ? item.weight : "10",

                    from: item.hasOwnProperty("from") ? item.from : "UNKNOWN",

                    to: item.hasOwnProperty("to") ? item.to : "UNKNOWN"

                })) || [];

                console.log("My freightOrders data:", freightOrders);

                let DispatchedData = [];

                for (const d of freightOrders || []) {

                    DispatchedData.push({
                        id: d.id,
                        priority: d.priority,
                        driver_id: d.driver_id,
                        startDate: d.startDate,
                        endDate: d.endDate,
                        startTime: d.startTime,
                        endTime: d.endTime,
                        Vehid: d.vehid,
                        carrier: d.carrier
                        // LastUpdate: new Date().toISOString()
                    });
                }               

                // DispatchedData = freightOrders.map(d => ({
                //     id: d.id,
                //     priority: d.priority,
                //     driver_id: d.driver_id,
                //     startDate: d.startDate,
                //     endDate: d.endDate,
                //     startTime: d.startTime,
                //     endTime: d.endTime,
                //     Vehid: d.vehid,
                //     carrier: d.carrier
                // }));
                

                return DispatchedData;
                

            } catch (error) {

                console.error("Error Message V1: ", error.message);
                console.error("Error Response V1:", error.response?.data);
                console.error("Error Status V1:", error.response?.status);
                console.error("Full Error V1:", error);

                req.error(
                    500,
                    `Error v1 calling CPI iFlow: ${error.message}`
                );
            }
        });

        this.on("GetBulkfoV1", async (req) => {

            const {
                p_start_time = "2026-09-01T07:00:00Z",
                p_end_time = "2026-09-01T13:00:00Z",
                p_dc = "0017411710",
                p_carrier = "0001000109"
            } = req.data;

            try {

                let iflowUrl = "";
                iflowUrl = "/http/fo-bulk";
                console.log("My iFlow URL: V2", iflowUrl);
                const response = await executeHttpRequest(
                    { destinationName: 'Destination_Driver_Assignment_Iflows' },
                    {
                        method: "GET",
                        url: iflowUrl,
                        params: {
                            p_start_time: p_start_time,
                            p_end_time: p_end_time,
                            p_dc: p_dc,
                            p_carrier: p_carrier
                        }
                    }
                );
                console.log("My Status:", response.status);
                console.log("My Headers:", response.headers);
                console.log("My Data:", JSON.stringify(response.data, null, 2));
                return JSON.stringify(response.data);

            } catch (error) {

                console.error("My Error Message V2:", error.message);
                console.error("My Error Response V2:", error.response?.data);
                console.error("My Error Status V2:", error.response?.status);
                console.error("Full My Error V2:", error);

                req.error(
                    500,
                    `My Error V2 calling CPI iFlow: ${error.message}`
                );
            }


        });


        this.on("GetRes", async (req) => {
            try {
                let destination = {
                    destinationName: "Destination_Driver_Assignment_Iflows"
                };
                let iflowUrl = "";
                iflowUrl = "/http/res";
                const response = await executeHttpRequest(
                    destination,
                    {
                        method: "GET",
                        url: iflowUrl
                    }
                );

                console.log("My Status:", response.status);
                console.log("My Headers:", response.headers);
                console.log("My Data:", JSON.stringify(response.data, null, 2));

                const vehiclesData = response.data;
                console.log("My Final Parsed Data v1:", vehiclesData);
                return vehiclesData;
            }
            catch (error) {

                console.error("My Error Message V2:", error.message);
                console.error("My Error Response V2:", error.response?.data);
                console.error("My Error Status V2:", error.response?.status);
                console.error("Full My Error V2:", error);

                req.error(
                    500,
                    `Error calling CPI iFlow: ${error.message}`
                );
            }
        });

        this.on("GetDrv", async (req) => {

            try {
                let destination = {
                    destinationName: "Destination_Driver_Assignment_Iflows"
                };

                let iflowUrl = "";
                iflowUrl = "/http/drv";

                const response = await executeHttpRequest(
                    destination,
                    {
                        method: "GET",
                        url: iflowUrl
                    }
                );

                console.log("My Status:", response.status);
                console.log("My Headers:", response.headers);
                console.log("My Data:", JSON.stringify(response.data, null, 2));

                const driversData = response.data;
                console.log("My Final Parsed Data v1:", driversData);



                return driversData;


                //return JSON.stringify(response.data);


            }
            catch (error) {
                console.error("My Error Message V2:", error.message);
                console.error("My Error Response V2:", error.response?.data);
                console.error("My Error Status V2:", error.response?.status);
                console.error("Full My Error V2:", error);
                req.error(
                    500,
                    `Error calling CPI iFlow: ${error.message}`
                );
            }
        });



        // this.on("assignments", async (req) => {
        //     const { driverId } = req.data;
        //     const freightOrders = GetFreightOrders();
        //     const driverAssignments = freightOrders.filter(order => order.driverId === driverId);
        //     return driverAssignments;
        // });
        // this.on("vehicleAssignments", async (req) => {
        //     const { vehicleId } = req.data;
        //     const freightOrders = GetFreightOrders();
        //     const vehicleAssignments = freightOrders.filter(order => order.vehicleId === vehicleId);
        //     return vehicleAssignments;
        // });


        // this.on("vehicleAssignments", Association("VehicleAssignments").to("FreightOrder").to("d").via("vehicleId"));
        // this.on("assignments", Association("DriverAssignments").to("FreightOrder").via("driverId"));


        // this.on("GetFreightOrderDetails", GetFreightOrderDetails);
        // this.on("GetVehicleAssignmentsDetails", GetVehicleAssignmentsDetails);
        // this.on("GetDriverAssignmentsDetails", GetDriverAssignmentsDetails);


        function GetDrivers() {

            return [

                { id: "DRV001", name: "John Smith", location: "Mumbai", status: "Available", license: "Valid", vehicle: "MH01 AB 1234", type: "Contract" },
                { id: "DRV002", name: "Peter Brown", location: "Pune", status: "Available", license: "Valid", vehicle: "MH12 CD 4567", type: "Permanent" },
                { id: "DRV003", name: "Raj Kumar", location: "Mumbai", status: "Available", license: "Valid", vehicle: "MH04 EF 7890", type: "Contract" },
                { id: "DRV004", name: "Mike Wilson", location: "Nashik", status: "Available", license: "Valid", vehicle: "MH15 GH 2345", type: "Permanent" },
                { id: "DRV005", name: "Suresh Patel", location: "Surat", status: "On Break", license: "Valid", vehicle: "GJ05 JK 6789", type: "Contract" },
                { id: "DRV006", name: "Amit Shah", location: "Pune", status: "Available", license: "Valid", vehicle: "MH12 KL 1234", type: "Permanent" },
                { id: "DRV007", name: "Vikram Joshi", location: "Mumbai", status: "Available", license: "Valid", vehicle: "MH01 MN 5678", type: "Contract" }
            ]
        }
        function GetVehicles() {
            return [
                { vehid: "VEH001", license: "Valid", vehicle: "MH01 AB 1234", type: "Contract" },
                { vehid: "VEH002", license: "Valid", vehicle: "MH12 CD 4567", type: "Permanent" },
                { vehid: "VEH003", license: "Valid", vehicle: "MH04 EF 7890", type: "Contract" },
                { vehid: "VEH004", license: "Valid", vehicle: "MH15 GH 2345", type: "Permanent" },
                { vehid: "VEH005", license: "Valid", vehicle: "GJ05 JK 6789", type: "Contract" },
                { vehid: "VEH006", license: "Valid", vehicle: "MH04 EF 7890", type: "Contract" },
                { vehid: "VEH007", license: "Valid", vehicle: "MH15 GH 2345", type: "Permanent" },
                { vehid: "VEH008", license: "Valid", vehicle: "GJ05 JK 6789", type: "Contract" },
                { vehid: "VEH009", license: "Valid", vehicle: "MH15 GH 2345", type: "Permanent" },
                { vehid: "VEH0010", license: "Valid", vehicle: "GJ05 JK 6789", type: "Contract" },
                { vehid: "VEH0011", license: "Valid", vehicle: "MH15 GH 2345", type: "Permanent" },
                { vehid: "VEH0012", license: "Valid", vehicle: "GJ05 JK 6789", type: "Contract" }

            ]
        }
        function GetFreightOrders() {
            return [
                { id: "FO100045", from: "Mumbai", to: "Pune", start: 10, end: 14, status: "Unassigned", distance: "150 KM", carrier: "Carrier A", priority: "High", mode: "Road", weight: "10,000 KG" },
                { id: "FO100046", from: "Pune", to: "Mumbai", start: 11, end: 15, status: "Unassigned", distance: "150 KM", carrier: "Carrier B", priority: "Medium", mode: "Road", weight: "5,000 KG" },
                { id: "FO100047", from: "Mumbai", to: "Nashik", start: 13, end: 17, status: "Unassigned", distance: "210 KM", carrier: "Carrier C", priority: "High", mode: "Road", weight: "9,000 KG" },
                { id: "FO100048", from: "Nashik", to: "Aurangabad", start: 14.5, end: 19.25, status: "Unassigned", distance: "210 KM", carrier: "Carrier B", priority: "Medium", mode: "Road", weight: "7,500 KG" },
                { id: "FO100049", from: "Pune", to: "Solapur", start: 15, end: 20, status: "Unassigned", distance: "250 KM", carrier: "Carrier A", priority: "Medium", mode: "Road", weight: "8,000 KG" },
                { id: "FO100050", from: "Mumbai", to: "Nagpur", start: 16.25, end: 21.45, status: "Unassigned", distance: "840 KM", carrier: "Carrier C", priority: "High", mode: "Road", weight: "12,000 KG" },
                { id: "FO100051", from: "Surat", to: "Vadodara", start: 17, end: 21, status: "Unassigned", distance: "150 KM", carrier: "Carrier B", priority: "Low", mode: "Road", weight: "6,000 KG" },
                { id: "FO100052", from: "Pune", to: "Mumbai", start: 18, end: 22, status: "Unassigned", distance: "150 KM", carrier: "Carrier A", priority: "Medium", mode: "Road", weight: "5,000 KG" },
                { id: "FO100053", from: "Nashik", to: "Pune", start: 9, end: 12, status: "Unassigned", distance: "210 KM", carrier: "Carrier B", priority: "High", mode: "Road", weight: "9,000 KG" },
                { id: "FO100054", from: "Mumbai", to: "Surat", start: 13, end: 18, status: "Unassigned", distance: "280 KM", carrier: "Carrier C", priority: "Low", mode: "Road", weight: "4,500 KG" }
            ]

        }


        function GetVehicleAssignmentsDetails() {
            return [
                { vehid: "VEH001", driverId: "DRV001", foId: "FO100046", start: 11, end: 21 },
                { vehid: "VEH002", driverId: "DRV002", foId: "FO100045", start: 10, end: 14 },
                { vehid: "VEH003", driverId: "DRV002", foId: "FO100052", start: 18, end: 22 },
                { vehid: "VEH004", driverId: "DRV003", foId: "FO100047", start: 13, end: 17 },
                { vehid: "VEH005", driverId: "DRV006", foId: "FO100049", start: 15, end: 20 },
                { vehid: "VEH006", driverId: "DRV007", foId: "FO100048", start: 14, end: 19 }
            ]
        }

        function GetDriverAssignmentsDetails() {
            return [
                { driverId: "DRV001", foId: "FO100046", start: 11, end: 15 },
                { driverId: "DRV002", foId: "FO100045", start: 10, end: 14 },
                { driverId: "DRV002", foId: "FO100052", start: 18, end: 22 },
                { driverId: "DRV003", foId: "FO100047", start: 13, end: 17 },
                { driverId: "DRV006", foId: "FO100049", start: 15, end: 20 },
                { driverId: "DRV007", foId: "FO100048", start: 14, end: 19 }
            ]

        }





    }
};

module.exports = DispatcherService;
