import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface Make {
  Make_ID: string;
  Make_Name: string;
}

interface ResponseWrapper {
  Response: {
    Results: {
      AllVehicleMakes: Make[];
    };
  };
}

// interface Type {
//   VehicleTypeId: string;
//   VehicleTypeName: string;
// }

async function fetchXML(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching XML data: ${error}`);
    throw error;
  }
}

async function convertXMLToJSON<T>(xmlData: string): Promise<T> {
  try {
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false
    });
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error(`Error parsing XML data: ${error}`);
    throw error;
  }
}

export async function fetchAndParseMakes(): Promise<Make[]> {
  const getAllMakesURL =
    'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML';
  const xmlData = await fetchXML(getAllMakesURL);
  const parsedData = await convertXMLToJSON<ResponseWrapper>(xmlData);
  return parsedData.Response.Results.AllVehicleMakes;
}

// export async function fetchAndParseVehicleTypes(
//   makeId: string
// ): Promise<Type[]> {
//   const vehicleTypesURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`;
//   const xmlData = await fetchXML(vehicleTypesURL);
//   const parsedData = await convertXMLToJSON<{
//     Results: { VehicleType: Type[] };
//   }>(xmlData);

//   return parsedData.Results.VehicleType;
// }
