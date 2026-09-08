service DispatcherService {


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
        start    : Decimal(5, 2);
        end      : Decimal(5, 2);
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
                       p_carrier: Int16)                      returns many FreightOrder;

    function GetBulkfoV1(p_start_time: DateTime,
                         p_end_time: DateTime,
                         p_dc: Int16,
                         p_carrier: Int16)                    returns array of FreightOrder;

    function GetRes()                                         returns array of Driver;

    function GetDrv()                                         returns array of Driver;


}
