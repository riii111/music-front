import "../app/globals.css";
import { Layout } from "../app/components/layout";
import { getFavoriteMusicList } from "../app/api/favorite-music";

export default function Home({ favoriteMusicList }) {
  return (
    <main>
      <Layout favoriteMusicList={favoriteMusicList} />
    </main>
  );
}

export async function getServerSideProps(): Promise<any> {
  const favoriteMusicList = await getFavoriteMusicList();
  return {
    props: {
      favoriteMusicList,
    },
  };
}
