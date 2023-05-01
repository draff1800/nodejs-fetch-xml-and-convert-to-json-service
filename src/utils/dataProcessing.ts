import { parseStringPromise } from 'xml2js';

export async function xmlToJSON<T>(xml: string): Promise<T> {
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
