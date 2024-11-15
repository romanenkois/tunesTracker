import { ArtistSimplified, AlbumSimplified } from "@entity/index";

export type Track = {
  id: string,
  href: string,
  uri: string,
  preview_url: string | undefined,

  name: string,
  popularity: number,
  duration_ms: number,

  artists: Array<ArtistSimplified>
  album: AlbumSimplified
}
