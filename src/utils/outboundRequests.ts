import axios from '../utils/axiosConfig';

export async function getData(path: string): Promise<string> {
  try {
    const response = await axios.get(path);
    return response.data;
  } catch (error) {
    console.error(`Error fetching XML data: ${error}`);
    throw error;
  }
}
