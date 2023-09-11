
## 使用技術
- Next.js
- TypeScript
- React Hooks
- ChakraUI
- Framer Motion

## 環境構築〜起動まで
### 1. インストール

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. 起動準備

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

[http://localhost:3000](http://localhost:3000) で結果を確認。

## ディレクトリ構成（一部紹介）
```
- app
  - api/
    - favorite-music.tsx
    （楽曲をお気に入りリストに追加・削除するAPI。）
    - play-music.tsx
    （※未使用）
    - search-music.tsx
    （楽曲検索API。Spotify APIのラッパー。）
  - components/
    - FavoriteMusicList/
      - FavoriteTrack.tsx
      （お気に入り楽曲を表示するコンポーネント）
      - FavoriteTrackList.tsx
      （お気に入り楽曲リストを表示するページコンポーネント）
    - MusicPlayerBar/
      - MusicCard.tsx
      （楽曲情報を表示するコンポーネント）
      - MusicPlayerBar.tsx
      （再生中の楽曲の情報を確認・操作できるページコンポーネント）
      - SongProgressBar.tsx
      （再生中の楽曲の進捗を操作できるコンポーネント）
      - StopAndPlayButton.tsx
      （楽曲の再生/停止を操作できるコンポーネント）
      - VolumeSlider.tsx
      （楽曲の音量を調整できるコンポーネント）
    - SearchMusic/
      - Radio.tsx
      （ラジオ情報を表示するコンポーネント）
      - SearchBar.tsx
      （検索入力バーを表示するコンポーネント）
      - SearchMusic.tsx
      （楽曲を検索〜検索結果を確認できるページコンポーネント）
      - SearchMusicResult.tsx
      （検索結果を表示するコンポーネント）
      - WebIcon.tsx
      （アプリのアイコンを表示するコンポーネント）
    - layout.tsx
      （このアプリの画面のレイアウト）
  - utils/
    - interface/
      - music-info.tsx
      （バックエンド側から受け取る楽曲情報を定義）
      - track-info.tsx
      （楽曲情報を表示する際に使う型を定義）
    - constants.tsx 
      （複数のファイルで使用する定数を定義）
```