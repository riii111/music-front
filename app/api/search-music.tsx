import axios from "axios";
import { Song } from "../utils/interface/music-info";

export async function searchMusic(query: string): Promise<Song[]> {
  try {
    const searchQueryUri = `http://localhost:8000/songs?search_words=${query}`;
    const response = await axios.get<Song[]>(searchQueryUri);

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
