import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface FetchedMake {
  Make_ID: string;
  Make_Name: string;
}

interface FetchedType {
  VehicleTypeId: string;
  VehicleTypeName: string;
}

interface FetchMakesResponse {
  Response: {
    Results: {
      AllVehicleMakes: FetchedMake[];
    };
  };
}

interface FetchTypesResponse {
  Response: {
    Results: {
      VehicleTypesForMakeIds: FetchedType[];
    };
  };
}

interface Make {
  makeId: string;
  makeName: string;
}

interface Type {
  typeId: string;
  typeName: string;
}

interface MakeWithTypes extends Make {
  vehicleTypes: Type[];
}

async function fetchXML(url: string): Promise<string> {
  try {
    const response = await axios.get(url, { withCredentials: false });
    return response.data;
  } catch (error) {
    console.error(`Error fetching XML data: ${error}`);
    throw error;
  }
}

async function convertXMLToJSON<T>(xml: string): Promise<T> {
  try {
    const json = await parseStringPromise(xml, {
      explicitArray: false
    });
    return json;
  } catch (error) {
    console.error(`Error parsing XML data: ${error}`);
    throw error;
  }
}

function mapFetchedMakeToMake(fetchedMake: FetchedMake): Make {
  return {
    makeId: fetchedMake.Make_ID,
    makeName: fetchedMake.Make_Name
  };
}

function mapFetchedTypeToType(fetchedType: FetchedType): Type {
  return {
    typeId: fetchedType.VehicleTypeId,
    typeName: fetchedType.VehicleTypeName
  };
}

export async function fetchAndFormatMakes(): Promise<Make[]> {
  const url = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML';
  const xml = await fetchXML(url);
  const json = await convertXMLToJSON<FetchMakesResponse>(xml);
  const fetchedMakes = json.Response.Results.AllVehicleMakes.slice(0, 10);

  return fetchedMakes.map((fetchedMake) => mapFetchedMakeToMake(fetchedMake));
}

export async function fetchAndFormatTypes(makeId: string): Promise<Type[]> {
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`;
  const xml = await fetchXML(url);
  const json = await convertXMLToJSON<FetchTypesResponse>(xml);
  const fetchedTypes = json.Response.Results.VehicleTypesForMakeIds;
  const fetchedTypesArray = Array.isArray(fetchedTypes)
    ? fetchedTypes
    : [fetchedTypes];

  return fetchedTypesArray.map((fetchedType) =>
    mapFetchedTypeToType(fetchedType)
  );
}

export async function getMakesWithTypes(): Promise<MakeWithTypes[]> {
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
  return makesWithTypes;
}
