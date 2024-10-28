import { ArtistSimplified } from "@entity/artist.entity";
import { AlbumSimplified } from "@entity/album.entity";

export type Track = {
  id: string,
  href: string,
  preview_url: string | undefined,

  name: string,
  popularity: number,
  duration_ms: number,

  artists: Array<ArtistSimplified>
  album: AlbumSimplified
}
