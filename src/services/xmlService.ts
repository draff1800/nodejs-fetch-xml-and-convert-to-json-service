import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface Make {
  Make_ID: string;
  Make_Name: string;
}

interface Type {
  VehicleTypeId: string;
  VehicleTypeName: string;
}

interface FetchMakesResponseJSON {
  Response: {
    Results: {
      AllVehicleMakes: Make[];
    };
  };
}

interface FetchTypesResponseJSON {
  Response: {
    Results: {
      VehicleTypesForMakeIds: Type[];
    };
  };
}

async function fetchXML(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
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

export async function fetchMakesAsJSON(): Promise<Make[]> {
  const url = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML';
  const xml = await fetchXML(url);
  const json = await convertXMLToJSON<FetchMakesResponseJSON>(xml);
  return json.Response.Results.AllVehicleMakes;
}

export async function fetchTypesAsJSON(makeId: string): Promise<Type[]> {
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`;
  const xml = await fetchXML(url);
  const json = await convertXMLToJSON<FetchTypesResponseJSON>(xml);
  return json.Response.Results.VehicleTypesForMakeIds;
}
