import axios from "axios";

const API_URL = "https://dog.ceo/api";

export const getRandomDogImage = async (
  count: number = 10
): Promise<string[]> => {
  const requests = Array.from({ length: count }, () =>
    axios.get(`${API_URL}/breeds/image/random`)
  );
  const responses = await Promise.all(requests);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return responses.map((response:any) => response.data.message);
};
