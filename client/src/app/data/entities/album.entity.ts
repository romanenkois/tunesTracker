import { ArtistSimplified } from "@entity/artist.entity"
import { Track } from "@entity/track.entity"

export type Album = {
  id: string,
  href: string,
  uri: string,

  name: string,
  images: Array<{
    url: string,
    height: number,
    width: number
  }>,

  release_date: string,
  album_type: 'album' | 'single' | 'compilation',
  genres: Array<string>,
  popularity: number,
  total_tracks: number,

  artists: Array<ArtistSimplified>

  // tracks: Array<{
  //   items: Array<{

  //   }>
  // }>
}

export type AlbumSimplified = {
  id: string,
  href: string,
  uri: string,

  name: string,
  images: Array<{
    url: string,
    height: number,
    width: number
  }>,

  release_date: string,
  album_type: 'album' | 'single' | 'compilation',
  total_tracks: number,

  artists: Array<ArtistSimplified>
}
