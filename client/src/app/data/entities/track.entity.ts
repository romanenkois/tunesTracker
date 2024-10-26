import { Artist, ArtistSimplified } from "@entity/artist.entity";
import { AlbumSimplified } from "@entity/album.entity";
import { AlbumSimpifiedDTO } from "@dto/album.dto";

export type Track = {
  id: string,
  href: string,
  preview_url: string | undefined,

  name: string,
  popularity: number,
  duration_ms: number,

  artists: Array<ArtistSimplified>
  album: Array<AlbumSimpifiedDTO>
  // album: Array<AlbumSimplified>
}
