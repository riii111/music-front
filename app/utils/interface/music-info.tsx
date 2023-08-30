interface Images {
  url: string;
  height: number;
  width: number;
}

export interface Music {
  id: number | string;
  song_title: string;
  artist_name: string;
  song_url: string;
  album_name: string;
  images: Images;
}

// export default Music;
