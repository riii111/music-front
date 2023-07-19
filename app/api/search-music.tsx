import axios from "axios";
import Music from "../utils/interface/music-info";

async function searchMusic(query: string): Promise<Music[]> {
  try {
    const searchQueryUri = `http://localhost:8000/songs?search_words=${query}`;
    const response = await axios.get<Music[]>(searchQueryUri);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`APIの呼び出しでエラーが発生しました。 ${error.message}`);
    }

    if (error instanceof Error) {
      throw new Error("予期しないエラーが発生しました。");
    }
    throw error;
  }
}

export default searchMusic;
