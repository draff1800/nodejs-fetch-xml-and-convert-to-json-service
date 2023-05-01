import axios from 'axios';

export async function getData(url: string): Promise<string> {
  try {
    const response = await axios.get(url, { withCredentials: false });
    return response.data;
  } catch (error) {
    console.error(`Error fetching XML data: ${error}`);
    throw error;
  }
}
