service DispatcherService {

    type Resources {
        resourceId       : String;
        resourceType     : String;
        ownerId          : String;
        description      : String;
        workCalendarCode : String;
    }

    type Drivers {
        driverId   : String;
        first_Name : String;
        last_name  : String;
    }


    type Driver {
        id       : String;
        name     : String;
        location : String;
        status   : String;
        license  : String;
        vehicle  : String;
        type     : String;
    }

    type Vehicle {

        vehid   : String;
        license : String;
        vehicle : String;
        type    : String;
    }


    type FreightOrder {
        id       : String;
        fromS    : String;
        toS      : String;
        start    : DateTime;
        end      : DateTime;
        status   : String;
        carrier  : String;
        distance : String;
        priority : String;
        mode     : String;
        weight   : String;
    }

    type assignment {
        driverId : String;
        foId     : String;
        start    : Decimal(5, 2);
        end      : Decimal(5, 2);
    }

    type VehAssignment {
        vehid    : String;
        driverId : String;
        foId     : String;
        start    : Decimal(5, 2);
        end      : Decimal(5, 2);
    }

    type sDrivers {
        // Driver
        driverId      : String(20);
        firstName     : String(100);
        lastName      : String(100);
        roleType      : String(20);
        roleValidFrom : Timestamp;
        roleValidTo   : Timestamp;

    }

    type sVehicle {

        // Vehicle/Resource
        resourceId       : String(50);
        resourceType     : String(10);
        ownerId          : String(20);
        description      : String(255);
        timezone         : String(10);
        workCalendarCode : String(20);
        availability     : array of sAvailability;
    //   // Assignment
    // vehicleId                  : String(50);
    // vehicleRegNo               : String(50);


    }

    type sRestBreak {

        StartTime : String(14);
        EndTime   : String(14);
        RestType  : String(20);
    }

    type sAvailability {
        StartTime : String(14);
        EndTime   : String(14);
        timezone  : String(5);
    }


    entity DispatcherData {

        key transportationOrder        : String(20);

            // Freight Order
            transportationOrderUUID    : UUID;
            carrier                    : String(20);
            executionStatus            : String(10);
            executionStatusDescription : String(100);
            startTime                  : Timestamp;
            endTime                    : Timestamp;
            sourceLocation             : String(50);
            p_dc                       : String(50);
            restBreaks                 : array of sRestBreak;
            resources                  : array of sVehicle;
            drivers                    : array of sDrivers;

    // Search Filters
    // planningStartTime          : Timestamp;
    // planningEndTime            : Timestamp;
    // distributionCenter         : String(20);
    }


    function GetDrivers()                                     returns many Driver;
    function GetVehicles()                                    returns many Vehicle;
    function GetFreightOrders()                               returns many FreightOrder;
    function assignments()                                    returns many assignment;
    function VehicleAssignments()                             returns many VehAssignment;

    function GetFreightOrderDetails(orderId: String)          returns many FreightOrder;
    function GetFreightOrderDetailsByDriver(driverId: String) returns many FreightOrder;
    function GetVehicleAssignmentsDetails(vehicleId: String)  returns many FreightOrder;
    function GetDriverAssignmentsDetails(driverId: String)    returns many FreightOrder;

    function GetBulkfo(p_start_time: DateTime,
                       p_end_time: DateTime,
                       p_dc: Int16,
                       p_carrier: Int16)                      returns array of FreightOrder;

    function GetBulkfoV(p_start_time: DateTime,
                        p_end_time: DateTime,
                        p_dc: Int16,
                        p_carrier: Int16)                     returns many FreightOrder;


    function GetRes()                                         returns array of Resources;

    function GetDrv()                                         returns array of Drivers;

    function GetFOSimilution(p_start_time: DateTime,
                             p_end_time: DateTime,
                             p_foid: String)                    returns many FreightOrder;


}
