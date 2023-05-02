import { getData } from '../utils/outboundRequests';
import { xmlToJSON } from '../utils/dataProcessing';
import {
  FetchedMake,
  FetchedType,
  FetchMakesResponse,
  FetchTypesResponse,
  Make,
  Type,
  MakeWithTypes
} from '../models/vehicle.model';
import { deleteAll, saveMany } from '../utils/database';

function formatFetchedMake(fetchedMake: FetchedMake): Make {
  return {
    makeId: fetchedMake.Make_ID,
    makeName: fetchedMake.Make_Name
  };
}

function formatFetchedType(fetchedType: FetchedType): Type {
  return {
    typeId: fetchedType.VehicleTypeId,
    typeName: fetchedType.VehicleTypeName
  };
}

async function fetchAndFormatMakes(): Promise<Make[]> {
  const path = '/getallmakes?format=XML';
  const xml = await getData(path);
  const json = await xmlToJSON<FetchMakesResponse>(xml);
  const fetchedMakes = json.Response.Results.AllVehicleMakes.slice(0, 10);

  return fetchedMakes.map((fetchedMake) => formatFetchedMake(fetchedMake));
}

async function fetchAndFormatTypes(makeId: string): Promise<Type[]> {
  const path = `/GetVehicleTypesForMakeId/${makeId}?format=xml`;
  const xml = await getData(path);
  const json = await xmlToJSON<FetchTypesResponse>(xml);
  const fetchedTypes = json.Response.Results.VehicleTypesForMakeIds;
  const fetchedTypesArray = Array.isArray(fetchedTypes)
    ? fetchedTypes
    : [fetchedTypes];

  return fetchedTypesArray.map((fetchedType) => formatFetchedType(fetchedType));
}

export async function saveAndGetMakesWithTypes(): Promise<MakeWithTypes[]> {
  const makes = await fetchAndFormatMakes();
  const makesWithTypesPromises = makes.map(async (make) => {
    const types = await fetchAndFormatTypes(make.makeId);
    return {
      makeId: make.makeId,
      makeName: make.makeName,
      vehicleTypes: types
    };
  });
  const makesWithTypes = await Promise.all(makesWithTypesPromises);

  await deleteAll('makesWithTypes');
  await saveMany('makesWithTypes', makesWithTypes);
  return makesWithTypes;
}
