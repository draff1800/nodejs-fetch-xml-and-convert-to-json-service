import { ObjectId, WithId } from 'mongodb';
import { DBMakeWithTypes, MakeWithTypes } from '../../src/models/vehicle.model';

export const getAllMakesResponseStub =
  '<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Count>5</Count><Message>Response returned successfully</Message><Results><AllVehicleMakes><Make_ID>11897</Make_ID><Make_Name> MID-TOWN TRAILERS</Make_Name></AllVehicleMakes><AllVehicleMakes><Make_ID>4877</Make_ID><Make_Name>1/OFF KUSTOMS, LLC</Make_Name></AllVehicleMakes><AllVehicleMakes><Make_ID>11257</Make_ID><Make_Name>102 IRONWORKS, INC.</Make_Name></AllVehicleMakes><AllVehicleMakes><Make_ID>12255</Make_ID><Make_Name>12832429 CANADA INC.</Make_Name></AllVehicleMakes><AllVehicleMakes><Make_ID>6387</Make_ID><Make_Name>17 CREEK ENTERPRISES</Make_Name></AllVehicleMakes></Results></Response>';

export const getVehicleTypesResponseStubs = [
  '<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Count>2</Count><Message>Response returned successfully</Message><SearchCriteria>Make ID: 11897</SearchCriteria><Results><VehicleTypesForMakeIds><VehicleTypeId>2</VehicleTypeId><VehicleTypeName>Passenger Car</VehicleTypeName></VehicleTypesForMakeIds><VehicleTypesForMakeIds><VehicleTypeId>7</VehicleTypeId><VehicleTypeName>Multipurpose Passenger Vehicle (MPV)</VehicleTypeName></VehicleTypesForMakeIds></Results></Response>',
  '<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Count>2</Count><Message>Response returned successfully</Message><SearchCriteria>Make ID: 4877</SearchCriteria><Results><VehicleTypesForMakeIds><VehicleTypeId>2</VehicleTypeId><VehicleTypeName>Test Type 1</VehicleTypeName></VehicleTypesForMakeIds></Results></Response>',
  '<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Count>2</Count><Message>Response returned successfully</Message><SearchCriteria>Make ID: 11257</SearchCriteria><Results><VehicleTypesForMakeIds><VehicleTypeId>3</VehicleTypeId><VehicleTypeName>Test Type 2</VehicleTypeName></VehicleTypesForMakeIds><VehicleTypesForMakeIds><VehicleTypeId>4</VehicleTypeId><VehicleTypeName>Test Type 3</VehicleTypeName></VehicleTypesForMakeIds><VehicleTypesForMakeIds><VehicleTypeId>5</VehicleTypeId><VehicleTypeName>Test Type 4</VehicleTypeName></VehicleTypesForMakeIds></Results></Response>',
  '<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Count>2</Count><Message>Response returned successfully</Message><SearchCriteria>Make ID: 12255</SearchCriteria><Results><VehicleTypesForMakeIds><VehicleTypeId>6</VehicleTypeId><VehicleTypeName>Test Type 5</VehicleTypeName></VehicleTypesForMakeIds></Results></Response>',
  '<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Count>2</Count><Message>Response returned successfully</Message><SearchCriteria>Make ID: 6387</SearchCriteria><Results><VehicleTypesForMakeIds><VehicleTypeId>7</VehicleTypeId><VehicleTypeName>Test Type 6</VehicleTypeName></VehicleTypesForMakeIds></Results></Response>'
];

export const emptyDBQueryStub: DBMakeWithTypes[] = [];

export const populatedDBQueryStub: DBMakeWithTypes[] = [
  {
    _id: new ObjectId(),
    makeId: '11897',
    makeName: ' MID-TOWN TRAILERS',
    vehicleTypes: [
      {
        typeId: '2',
        typeName: 'Passenger Car'
      },
      {
        typeId: '7',
        typeName: 'Multipurpose Passenger Vehicle (MPV)'
      }
    ]
  },
  {
    _id: new ObjectId(),
    makeId: '4877',
    makeName: '1/OFF KUSTOMS, LLC',
    vehicleTypes: [
      {
        typeId: '2',
        typeName: 'Test Type 1'
      }
    ]
  },
  {
    _id: new ObjectId(),
    makeId: '11257',
    makeName: '102 IRONWORKS, INC.',
    vehicleTypes: [
      {
        typeId: '3',
        typeName: 'Test Type 2'
      },
      {
        typeId: '4',
        typeName: 'Test Type 3'
      },
      {
        typeId: '5',
        typeName: 'Test Type 4'
      }
    ]
  },
  {
    _id: new ObjectId(),
    makeId: '12255',
    makeName: '12832429 CANADA INC.',
    vehicleTypes: [
      {
        typeId: '6',
        typeName: 'Test Type 5'
      }
    ]
  },
  {
    _id: new ObjectId(),
    makeId: '6387',
    makeName: '17 CREEK ENTERPRISES',
    vehicleTypes: [
      {
        typeId: '7',
        typeName: 'Test Type 6'
      }
    ]
  }
];

export const getMakesWithTypesExpectedOutput = [
  {
    makeId: '11897',
    makeName: ' MID-TOWN TRAILERS',
    vehicleTypes: [
      {
        typeId: '2',
        typeName: 'Passenger Car'
      },
      {
        typeId: '7',
        typeName: 'Multipurpose Passenger Vehicle (MPV)'
      }
    ]
  },
  {
    makeId: '4877',
    makeName: '1/OFF KUSTOMS, LLC',
    vehicleTypes: [
      {
        typeId: '2',
        typeName: 'Test Type 1'
      }
    ]
  },
  {
    makeId: '11257',
    makeName: '102 IRONWORKS, INC.',
    vehicleTypes: [
      {
        typeId: '3',
        typeName: 'Test Type 2'
      },
      {
        typeId: '4',
        typeName: 'Test Type 3'
      },
      {
        typeId: '5',
        typeName: 'Test Type 4'
      }
    ]
  },
  {
    makeId: '12255',
    makeName: '12832429 CANADA INC.',
    vehicleTypes: [
      {
        typeId: '6',
        typeName: 'Test Type 5'
      }
    ]
  },
  {
    makeId: '6387',
    makeName: '17 CREEK ENTERPRISES',
    vehicleTypes: [
      {
        typeId: '7',
        typeName: 'Test Type 6'
      }
    ]
  }
];
