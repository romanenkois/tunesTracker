import { AlbumSimpifiedDTO } from "@dto/album.dto"
import { ArtistSimplifiedDTO } from "@dto/artist.dto"

export type TrackDTO = {
  album: AlbumSimpifiedDTO,
  artists: Array<ArtistSimplifiedDTO>,
  available_markets: Array<string>,
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: {
    isrc?: string,
    ean?: string,
    upc?: string
  },
  external_urls: {
    spotify?: string
  },
  href: string,
  id: string,
  is_playable: boolean,
  linked_from?: {},
  restrictions?: {
    reason: 'market' | 'product' | 'explicit'
  },
  name: string,
  popularity: number,
  preview_url: string | undefined,
  track_number: number,
  type: string,
  uri: string,
  is_local: boolean
}
