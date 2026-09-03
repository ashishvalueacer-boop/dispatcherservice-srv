
import cds from "@sap/cds";

// const { SELECT } = require("@sap/cds/lib/ql/cds-ql");

class DispatcherService extends cds.ApplicationService {
    async init() {
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
}

export default DispatcherService
