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
        id     : String;
        froms  : String;
        tos    : String;
        start  : Decimal(5, 2);
        end    : Decimal(5, 2);
        status : String;
    }

    type assignment {
        driverId : String;
        foId     : String;
        start    : Decimal(5, 2);
        end      : Decimal(5, 2);
    }

    type VehAssignment {
        vehid      : String;
        driverId  : String;       
        foId    : String;
        start   : Decimal(5, 2);
        end     : Decimal(5, 2);
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


}
