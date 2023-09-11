interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Song {
  id: number | string;
  song_title: string;
  artist_name: string;
  song_url: string;
  album_name: string;
  image: Image;
}
