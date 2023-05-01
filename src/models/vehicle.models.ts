export interface FetchedMake {
  Make_ID: string;
  Make_Name: string;
}

export interface FetchedType {
  VehicleTypeId: string;
  VehicleTypeName: string;
}

export interface FetchMakesResponse {
  Response: {
    Results: {
      AllVehicleMakes: FetchedMake[];
    };
  };
}

export interface FetchTypesResponse {
  Response: {
    Results: {
      VehicleTypesForMakeIds: FetchedType[];
    };
  };
}

export interface Make {
  makeId: string;
  makeName: string;
}

export interface Type {
  typeId: string;
  typeName: string;
}

export interface MakeWithTypes extends Make {
  vehicleTypes: Type[];
}
