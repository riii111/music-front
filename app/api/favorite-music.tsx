import axios from "axios";
import { Song } from "../utils/interface/music-info";

export async function addFavoriteMusic(song: Song) {
  try {
    const addFavoriteMusicUri = `http://localhost:8000/favorites`;

    const response = await axios.post(addFavoriteMusicUri, song, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    });

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

export async function getFavoriteMusic(): Promise<Song[]> {
  try {
    const getFavoriteMusicUri = `http://localhost:8000/favorites`;

    const response = await axios.get<Song[]>(getFavoriteMusicUri);

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

export async function deleteFavoriteMusic(song_id: string) {
  try {
    const deleteFavoriteMusicUri = `http://localhost:8000/favorites/${song_id}`;

    const response = await axios.delete(deleteFavoriteMusicUri, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    });

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
